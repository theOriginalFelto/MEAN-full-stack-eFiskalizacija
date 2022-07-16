import { Component, OnInit } from '@angular/core';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';
import { KorisnikService } from '../services/korisnik.service';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-kontrola-izvestaja',
  templateUrl: './kontrola-izvestaja.component.html',
  styleUrls: ['./kontrola-izvestaja.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class KontrolaIzvestajaComponent implements OnInit {

  constructor(private korServ: KorisnikService, private racServ: RacunService) { }

  naziv: string;
  pib: string;
  datumOd: string;
  datumDo: string;

  konacanUkupanIznos: number;
  konacanIznosPDV: number;

  ngOnInit(): void {
    this.naziv = this.pib = this.datumDo = this.datumOd = "";
    this.konacanIznosPDV = this.konacanUkupanIznos = 0;
    this.izvjestajFlag = false;
  }

  danOd: number = 0;
  mesecOd: number = 0;
  godinaOd: number = 0;
  danDo: number = 0;
  mesecDo: number = 0;
  godinaDo: number = 0;
  racuniSaPretrage: Racun[] = [];
  izvjestajFlag: boolean = false;

  trenPreduzece: Preduzece;

  pretragaPoruka: string = "";
  pretragaIzvjestaja() {
    this.izvjestajFlag = false;
    this.pretragaPoruka = "";
    this.trenPreduzece = null;

    let a = new Date(this.datumOd);
    let b = new Date(this.datumDo);

    if (this.naziv) {
      this.korServ.getPreduzecePoNazivu(this.naziv).subscribe((pred: Preduzece) => {
        if (pred) {
          this.trenPreduzece = pred;
          this.dohvatiDatume(a, b);
        }
        else this.pretragaPoruka = "Ne postoji preduzeće sa zadatim imenom. Pokušajte ponovo."
      })
    }
    else if (this.pib) {
      this.korServ.getPreduzecePoPibu(this.pib).subscribe((pred: Preduzece) => {
        if (pred) {
          this.trenPreduzece = pred;
          this.dohvatiDatume(a, b);
        }
        else this.pretragaPoruka = "Ne postoji preduzeće sa zadatim PIB-om. Pokušajte ponovo."
      })
    }
    else this.dohvatiDatume(a, b);
  }

  dohvatiDatume(a: Date, b: Date) {
    this.danOd = a.getDate();
    this.mesecOd = a.getMonth() + 1;
    this.godinaOd = a.getFullYear();
    this.danDo = b.getDate();
    this.mesecDo = b.getMonth() + 1;
    this.godinaDo = b.getFullYear();
    this.konacanIznosPDV = 0;
    this.konacanUkupanIznos = 0;
    let idPred = 0;
    if(!this.trenPreduzece) idPred = -1;
    else idPred = this.trenPreduzece.id;
    this.racServ.dohvatiRacuneIzmedjuDatuma(a, b, idPred).subscribe((racuni: Racun[]) => {
      racuni.forEach(element => {
        this.konacanUkupanIznos += element.ukupanIznos;
        this.konacanIznosPDV += element.iznosPDV;
      });
    })
    // sa agregatnom sumom
    /*this.racServ.dohvatiRacuneIzmedjuDatuma(a, b, idPred).subscribe((response: any) => {
      this.konacanIznosPDV = response.sumaPDV;
      this.konacanUkupanIznos = response.sumaIznos;
    })*/
    this.izvjestajFlag = true;
  }

}
