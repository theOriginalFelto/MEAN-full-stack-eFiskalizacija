import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grafico } from '../models/grafico';
import { Kupac } from '../models/kupac';
import { Racun } from '../models/racun';
import { ArtikalService } from '../services/artikal.service';
import { KorisnikService } from '../services/korisnik.service';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-pregled-racuna',
  templateUrl: './pregled-racuna.component.html',
  styleUrls: ['./pregled-racuna.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class PregledRacunaComponent implements OnInit {

  constructor(private korServ: KorisnikService, private acrout: ActivatedRoute,
    private artServ: ArtikalService, private racServ: RacunService) { }

  id: number;
  brojLK: string;
  sviRacuni: Racun[] = [];
  daniUMjesecu: Grafico[] = [];
  mjeseci: Grafico[] = [];
  brojDanaUMjesecu: number;
  ukupanIznos: number;

  ngOnInit(): void {
    this.ukupanIznos = 0;
    this.prikazRacunaFlag = false;
    let a = new Date();
    let trenMjesec = a.getMonth() + 1;
    let yy = a.getFullYear();
    switch (trenMjesec) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        this.brojDanaUMjesecu = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        this.brojDanaUMjesecu = 30;
        break;
      case 2:
        if (yy % 4 == 0 && yy%100 != 0 || yy % 400 == 0) this.brojDanaUMjesecu = 29;
        else this.brojDanaUMjesecu = 28;
        break;
      default:
        this.brojDanaUMjesecu = 30;
        break;
    }
    for (let index = 0; index < this.brojDanaUMjesecu; index++) {
      let a = index + 1;
      this.daniUMjesecu[index] = new Grafico(a.toString());
    }
    const imenaMjeseci = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar",
    "Oktobar", "Novembar", "Decembar"];
    for (let index = 0; index < 12; index++) {
      this.mjeseci[index] = new Grafico(imenaMjeseci[index]);
    }


    this.acrout.params.subscribe(params => {
      this.id = params['id'];
      this.korServ.getKupac(this.id).subscribe((kup: Kupac) => {
        this.brojLK = kup.brojLicneKarte;
        this.racServ.dohvatiRacunePoBrojuLicneKarte(this.brojLK).subscribe((rac: Racun[]) => {
          this.sviRacuni = rac;
          this.sviRacuni.forEach(element => {
            this.ukupanIznos += element.ukupanIznos;
            let dan = element.dan;
            let mjesec = element.mesec;
            this.daniUMjesecu[dan-1].Value += element.ukupanIznos;
            this.mjeseci[mjesec-1].Value += element.ukupanIznos;
          });
          this.daniUMjesecu.forEach(element => {
            element.Size = Math.round(element.Value*160/this.ukupanIznos) + '%';
          });
          this.mjeseci.forEach(element => {
            element.Size = Math.round(element.Value*160/this.ukupanIznos) + '%';
          });
        })
      })
    });
  }

  trenRacun: Racun;
  prikazRacunaFlag: boolean;
  sati: number;
  minuti: number;
  sekundi: number;
  izaberiRacun(rac: Racun) {
    this.trenRacun = rac;
    let a = new Date(this.trenRacun.datum);
    this.sati = a.getUTCHours();
    this.minuti = a.getUTCMinutes();
    this.sekundi = a.getUTCSeconds();
    this.prikazRacunaFlag = true;
  }
}
