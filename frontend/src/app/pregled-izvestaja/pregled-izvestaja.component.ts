import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';
import { ArtikalService } from '../services/artikal.service';
import { KorisnikService } from '../services/korisnik.service';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-pregled-izvestaja',
  templateUrl: './pregled-izvestaja.component.html',
  styleUrls: ['./pregled-izvestaja.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class PregledIzvestajaComponent implements OnInit {

  constructor(private korServ: KorisnikService, private acrout: ActivatedRoute,
    private artServ: ArtikalService, private racServ: RacunService) { }


  daLiJePDV: boolean;
  racuni: Racun[] = [];
  imaRacuna: boolean;
  id: number;

  ngOnInit(): void {
    this.acrout.params.subscribe(params => {
      this.id = params['id'];

      this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
        this.daLiJePDV = pred.daLiJePDV;
      });
      this.racServ.dohvatiRacune(this.id).subscribe((racuni: Racun[]) => {
        if (racuni.length == 0) this.imaRacuna = false;
        else {
          this.imaRacuna = true;
          this.racuni = racuni;
          this.trenRacun = racuni[0];
        }
      })

      setTimeout(() => {
        let a = 5;
      }, 4000);
    });
  }

  datum: string;
  pazarFlag: boolean = false;
  racuniZaPazar: Racun[] = [];
  ukupanPazar: number;
  ukupanPDV: number;

  izracunajPazar() {
    let mojDatum = new Date(this.datum);
    let dan = mojDatum.getDate();
    let mesec = mojDatum.getMonth() + 1;
    let godina = mojDatum.getFullYear();
    this.racServ.dohvatiRacunePoDatumu(this.id, dan, mesec, godina).subscribe((racuni: Racun[]) => {
      this.racuniZaPazar = racuni;
      this.ukupanPDV = 0;
      this.ukupanPazar = 0;
      if (this.racuniZaPazar.length > 0) {
        this.racuniZaPazar.forEach(element => {
          this.ukupanPazar += element.ukupanIznos;
          this.ukupanPDV += element.iznosPDV;
        });
      }
      this.pazarFlag = true;
    })
  }

  trenRacun: Racun;
  izaberiRacun(rac: Racun) {
    this.trenRacun = rac;
  }
}
