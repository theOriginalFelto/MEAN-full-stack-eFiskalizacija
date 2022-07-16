import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artikal } from '../models/artikal';
import { CeneStanjeRobe } from '../models/cene-stanje-robe';
import { Narucilac } from '../models/narucilac';
import { Odjeljenje } from '../models/odjeljenje';
import { Preduzece } from '../models/preduzece';
import { Racun } from '../models/racun';
import { Stavka } from '../models/stavka';
import { Sto } from '../models/stolovi/sto';
import { ArtikalService } from '../services/artikal.service';
import { KorisnikService } from '../services/korisnik.service';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-izdavanje-racuna',
  templateUrl: './izdavanje-racuna.component.html',
  styleUrls: ['./izdavanje-racuna.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class IzdavanjeRacunaComponent implements OnInit {

  constructor(private korServ: KorisnikService, private acrout: ActivatedRoute,
    private artServ: ArtikalService, private racServ: RacunService) { }


  kategorijaPreduzeca: string = '';
  grad: string;
  ulica: string;
  broj: string;
  sviArtikli: Artikal[] = [];
  narucioci: Preduzece[] = [];
  trenRacun: Racun;
  //stavke: any[] = [];
  daLiJePDV: boolean;
  id: number = 0;

  ngOnInit(): void {
    this.narucioci.splice(0);
    this.izborIzMagacinaFlag = false;
    this.unosKolicineFlag = false;
    this.zatvaranjeRacunaFlag = false;
    this.dodataStavkaPoruka = '';
    this.placanje = '';
    this.pibNarucioca = '';
    this.zatvoriRacunPoruka = "";
    if (!this.indexStola) this.indexStola = 0;
    if (!this.indexOdjeljenja) this.indexOdjeljenja = 0;
    this.acrout.params.subscribe(params => {
      this.id = params['id'];

      this.korServ.dohvatiNarucioce(this.id).subscribe((nar: Narucilac[]) => {
        nar.forEach(element => {
          this.korServ.getPreduzece(element.idNarucilac).subscribe((pred: Preduzece) => {
            this.narucioci.push(pred);
          })
        });
      })

      this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
        this.kategorijaPreduzeca = pred.kategorija;
        this.grad = pred.grad;
        this.odjeljenja = pred.odjeljenja;
        this.trenOdjeljenje = this.odjeljenja[this.indexOdjeljenja];
        this.stolovi = this.odjeljenja[this.indexOdjeljenja].stolovi;
        this.ulica = pred.ulica;
        this.broj = pred.broj;
        if (this.sviRacuni.length == 0 && this.kategorijaPreduzeca === 'ugostitelj') {
          for (let ind1 = 0; ind1 < this.odjeljenja.length; ind1++) {
            let element = this.odjeljenja[ind1].stolovi;
            this.sviRacuni.push(new Array<Racun>());
            for (let ind2 = 0; ind2 < element.length; ind2++) {
              this.sviRacuni[ind1].push(new Racun(pred.id, pred.naziv));
            }
          }
          this.trenRacun = this.sviRacuni[this.indexOdjeljenja][this.indexStola];
        }
        if (this.kategorijaPreduzeca === 'ugostitelj') {
          for (let ind1 = 0; ind1 < this.odjeljenja.length; ind1++) {
            let element = this.odjeljenja[ind1].stolovi;
            for (let ind2 = 0; ind2 < element.length; ind2++) {
              if (!this.sviRacuni[ind1][ind2]) this.sviRacuni[ind1][ind2] = new Racun(pred.id, pred.naziv);
            }
          }
          this.trenRacun = this.sviRacuni[this.indexOdjeljenja][this.indexStola];
          this.racuni = this.sviRacuni[this.indexOdjeljenja];
        } else {
          if(!this.trenRacun) this.trenRacun = new Racun(pred.id, pred.naziv);
        }
        //this.stavke = this.trenRacun.stavke;
        this.daLiJePDV = pred.daLiJePDV;
      });

      this.artServ.dohvatiSveArtikleBezKategorije(this.id).subscribe((artikli: Artikal[]) => {
        this.sviArtikli = artikli;
      })
    });
  }

  pretragaNaziv: string;
  pretraga() {
    this.artServ.dohvatiSveArtiklePoNazivu(this.id, this.pretragaNaziv).subscribe((artikli: Artikal[]) => {
      this.sviArtikli = artikli;
    })
  }

  trenArtikal: Artikal;
  izborIzMagacinaFlag: boolean = false;
  magacinArtikli: CeneStanjeRobe[] = [];
  izaberi(art: Artikal) {
    this.trenArtikal = art;
    this.artServ.dohvatiArtikleIzMagacina(art.sifra).subscribe((magArtikli: CeneStanjeRobe[]) => {
      this.magacinArtikli = magArtikli;
      this.izborIzMagacinaFlag = true;
    })
  }

  trenMagacin: CeneStanjeRobe;
  unosKolicineFlag: boolean = false;
  izaberiMagacin(art: CeneStanjeRobe) {
    this.trenMagacin = art;
    this.unosKolicineFlag = true;
  }

  kolicina: number;
  dodataStavkaPoruka: string = '';
  dodajStavku() {
    let stavka = new Stavka(this.trenArtikal, this.trenMagacin, this.kolicina);
    this.trenRacun.stavke.push(stavka);
    //this.stavke = this.trenRacun.stavke;
    this.trenRacun.ukupanIznos += stavka.artikalUMagacinu.prodajnaCena*stavka.kolicina;
    if (this.daLiJePDV) this.trenRacun.iznosPDV += stavka.artikalUMagacinu.prodajnaCena*stavka.kolicina*stavka.artikal.stopaPoreza/100;
    this.dodataStavkaPoruka = "Stavka uspješno dodata.";
    setTimeout(() => {
      this.dodataStavkaPoruka = "";
      this.izborIzMagacinaFlag = false;
      this.unosKolicineFlag = false;
      this.kolicina = undefined;
    }, 3000);
  }

  zatvaranjeRacunaFlag: boolean = false;
  placanje: string;
  zatvaranjeRacuna() {
    this.zatvaranjeRacunaFlag = true;
  }

  iznos: number;
  brojLK: number;
  brojSlip: number;
  imeKupca: string; 
  prezimeKupca: string;

  pibNarucioca: string;
  izaberiNarucioca(pib: string) {
    this.pibNarucioca = pib;
  }

  zatvoriRacunPoruka: string = '';
  zatvoriRacun() {
    if (!this.brojLK) this.brojLK = -1;
    this.trenRacun.brojLicneKarteKupca = this.brojLK;
    this.trenRacun.pibNarucioca = this.pibNarucioca;
    let a = new Date();
    this.trenRacun.datum = a;
    this.trenRacun.dan = a.getDate();
    this.trenRacun.mesec = a.getMonth() + 1;
    this.trenRacun.godina = a.getFullYear();
    this.trenRacun.nacinPlacanja = this.placanje;
    this.trenRacun.gradIzdavanja = this.grad;
    this.trenRacun.ulicaIzdavanja = this.ulica;
    this.trenRacun.brojIzdavanja = this.broj;

    this.racServ.dodajRacun(this.trenRacun).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.zatvoriRacunPoruka = "Uspješno zatvoren račun!";
        setTimeout(() => {
          this.trenRacun.stavke.forEach(element => {
            this.artServ.azurirajStanjeArtiklaUMagacinu(element.artikalUMagacinu, element.kolicina).subscribe(respObj => {
              if (respObj['message'] == 'ok') {}
              else {}
            })
          });
          setTimeout(() => {
            if (this.kategorijaPreduzeca === 'ugostitelj') {
              this.sviRacuni[this.indexOdjeljenja][this.indexStola] = null;
            } else {
              this.trenRacun = null;
            }
            //this.stavke = null;
            sessionStorage.clear();
            this.ngOnInit();
            this.zatvoriRacunPoruka = "";
            this.iznos = undefined;
            this.brojLK = undefined;
            this.brojSlip = undefined;
            this.imeKupca = undefined;
            this.prezimeKupca = undefined;
          }, 3000);
        }, 2000);
      }
      else {
        this.zatvoriRacunPoruka = 'Greška pri zatvaranju računa. Pokušajte ponovo.';
      }
    })
  }

  odjeljenja: Odjeljenje[] = [];
  trenOdjeljenje: Odjeljenje;
  stolovi: Sto[] = [];
  sviRacuni: Racun[][] = [];
  racuni: Racun[] = [];
  indexStola: number;

  izaberiSto(i: number) {
    this.sviRacuni[this.indexOdjeljenja][this.indexStola] = this.trenRacun;
    this.indexStola = i;
    this.trenRacun = this.sviRacuni[this.indexOdjeljenja][i];
    //this.stavke = this.trenRacun.stavke;
  }

  indexOdjeljenja: number;
  izaberiOdjeljenje(i: number) {
    this.izaberiSto(0);
    this.odjeljenja[this.indexOdjeljenja] = this.trenOdjeljenje;
    this.indexOdjeljenja = i;
    this.trenOdjeljenje = this.odjeljenja[i];
    this.stolovi = this.odjeljenja[i].stolovi;
    this.racuni = this.sviRacuni[this.indexOdjeljenja];
    //this.stavke = this.sviRacuni[this.indexOdjeljenja][this.indexStola].stavke;
    this.ngOnInit();
  }
}
