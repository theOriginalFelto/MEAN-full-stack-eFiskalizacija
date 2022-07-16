import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artikal } from '../models/artikal';
import { KategorijaArtikla } from '../models/kategorija-artikla';
import { Preduzece } from '../models/preduzece';
import { ArtikalService } from '../services/artikal.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-raspored-artikala',
  templateUrl: './raspored-artikala.component.html',
  styleUrls: ['./raspored-artikala.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class RasporedArtikalaComponent implements OnInit {

  constructor(private korServ: KorisnikService, private acrout: ActivatedRoute,
    private artServ: ArtikalService) { }

  sviArtikli: Artikal[] = [];
  kategorijeArtikala: KategorijaArtikla[] = [];
  preduzece: Preduzece;
  id: number = 0;

  ngOnInit(): void {
    this.dodajArtikalFlag = false;
    this.acrout.params.subscribe(params => {
      this.id = params['id'];
      this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
        this.preduzece = pred;
        this.kategorijeArtikala = pred.kategorijeArtikala;
      });
      this.artServ.dohvatiSveArtikleBezKategorije(this.id).subscribe((artikli: Artikal[]) => {
        this.sviArtikli = artikli;
      })
    });
  }

  nazivKategorije: string;
  dodajKatPoruka: string = "";
  dodajKategoriju() { //dodaje novu kategoriju artikala
    let novaKat = new KategorijaArtikla(this.nazivKategorije);
    this.dodajKatPoruka = "";

    this.korServ.ubaciKategorijuArtikla(this.id, novaKat).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.dodajKatPoruka = "Uspješno dodata kategorija!";
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
          this.dodajKatPoruka = "";
        }, 3000);
      }
      else if (respObj['message'] == 'ima kat') {
        this.dodajKatPoruka = 'Greška pri dodavanju kategorije - već postoji kategorija. Pokušajte ponovo.';
      }
      else {
        this.dodajKatPoruka = 'Greška pri dodavanju kategorije. Pokušajte ponovo.';
      }
    })
  }
  nazivPotkategorije: string[] = [];
  dodajPotkatPoruka: string = "";

  dodajPotkategoriju(kat: KategorijaArtikla, index: number) {//dodaje novu potkategoriju artikala
    let novaPotkat = new KategorijaArtikla(this.nazivPotkategorije[index]);
    this.dodajPotkatPoruka = "";
    kat.potkategorije.push(novaPotkat);

    this.korServ.ubaciPotkategorijuArtikla(this.id, kat).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.dodajPotkatPoruka = "Uspješno dodata kategorija!";
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
          this.nazivPotkategorije[index] = '';
          this.dodajPotkatPoruka = "";
        }, 3000);
      }
      else {
        this.dodajPotkatPoruka = 'Greška pri dodavanju kategorije. Pokušajte ponovo.';
      }
    })
  }

  dodajArtikalFlag: boolean = false;
  dodavanjeKategorije: boolean; //da li se dodaje u kategoriju ili potkategoriju
  trenKategorija: KategorijaArtikla; //prom- u koju se kupi trenutna (pot)kategorija

  dodajKategorijuArtiklu(kat: KategorijaArtikla) {
    this.trenKategorija = kat;
    this.dodajArtikalFlag = true;
    this.dodavanjeKategorije = true;
  }
  nazivPotkategorijeZaArtikal: string; //naziv potkategorije
  dodajPotkategorijuArtiklu(kat: KategorijaArtikla, nazivPokategorije: string) {
    this.trenKategorija = kat;
    this.dodajArtikalFlag = true;
    this.dodavanjeKategorije = false;
    this.nazivPotkategorijeZaArtikal = nazivPokategorije;
  }

  finalnaPoruka: string = "";
  dodajKategorijuArtikluFinalno(art: Artikal) {
    this.finalnaPoruka = "";
    if (this.dodavanjeKategorije) {
      this.trenKategorija.sifreArtikala.push(art.sifra);
    }
    else {
      this.trenKategorija.potkategorije.find(elem => elem.naziv === this.nazivPotkategorijeZaArtikal).sifreArtikala.push(art.sifra);
    }
    this.korServ.dodajKategorijuArtikluFinalno(this.id, this.trenKategorija).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.finalnaPoruka = "Uspješno dodata kategorija!";
        setTimeout(() => {
          this.artServ.azurirajDodavanjeKategorije(this.id, art.sifra).subscribe(responseObj => {
            if (responseObj['message'] == 'ok') {
              setTimeout(() => {
                sessionStorage.clear();
                this.ngOnInit();
                this.finalnaPoruka = "";
                this.dodajArtikalFlag = false;
              }, 3000);
            }
          })
        }, 3000);
      }
      else {
        this.finalnaPoruka = 'Greška pri dodavanju kategorije. Pokušajte ponovo.';
      }
    })
  }

  pretragaNaziv: string;

  pretraga() {
    this.artServ.dohvatiSveArtiklePoNazivuBezKategorije(this.id, this.pretragaNaziv).subscribe((artikli: Artikal[]) => {
      this.sviArtikli = artikli;
    })
  }
  
}
