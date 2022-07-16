import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Preduzece } from '../models/preduzece';
import { ArtikalService } from '../services/artikal.service';
import { KorisnikService } from '../services/korisnik.service';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class KorisniciComponent implements OnInit {

  constructor(private korServ: KorisnikService) { }

  neaktivnaPreduzeca: Preduzece[] = [];
  neaktivniKorisnici: Korisnik[] = [];

  ngOnInit(): void {
    this.neaktivnaPreduzeca.splice(0);
    this.korServ.dohvatiNeaktivnaPreduzeca().subscribe((kor: Korisnik[]) => {
      this.neaktivniKorisnici = kor;
      this.neaktivniKorisnici.forEach(element => {
        this.korServ.getPreduzece(element.id).subscribe((pred: Preduzece) => {
          this.neaktivnaPreduzeca.push(pred);
        })
      });
      setTimeout(() => {
        this.neaktivnaPreduzeca.sort((pred1, pred2) => {
          return pred1.id - pred2.id;
        })
        this.neaktivniKorisnici.sort((kor1, kor2) => {
          return kor1.id - kor2.id;
        })
      }, 2000);
    })
  }

  odobriPoruka: string = '';
  odobri(kor: Korisnik) {
    this.korServ.aktivirajKorisnika(kor.id).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.odobriPoruka = 'Zahtjev uspješno odobren.';
        setTimeout(() => {
          this.odobriPoruka = "";
          sessionStorage.clear();
          this.ngOnInit();
        }, 3000);
      }
      else {
        this.odobriPoruka = 'Greška pri odobravanju zahtjeva. Pokušajte ponovo.';
      }
    })
  }

  obrisi(kor: Korisnik, pred: Preduzece) {
    if (confirm("Da li ste sigurni da želite da obrište zahtjev preduzeća " + pred.naziv + "?")) {
      this.korServ.obrisiKorisnika(kor.id).subscribe(respObj => {
        if (respObj['message'] == 'ok') {
          this.korServ.obrisiPreduzece(pred.id).subscribe(responseObj => {
            if (responseObj['message'] == 'ok') this.ngOnInit();
            else {}
          })
        }
        else {}
      })
    }
  }

  ime: string;
  prezime: string;
  korIme: string;
  lozinka: string;
  potvrdaLozinke: string;
  telefon: string;
  email: string;
  naziv: string;
  drzava: string;
  grad: string;
  postanskiBroj: string;
  ulica: string;
  broj: string;
  PIB: string;
  maticniBroj: string;
  slika: string;

  message: string;
  registracijaOK: boolean;

  lozinkaRegex = /(?=^[a-zA-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_-])[A-Za-z\d@$!%*?&#_-]{8,12}$/;
  pibRegex = /^[1-9]\d{8}$/;
  mbRegex = /^\d{8}$/;


  registracijaPreduzecaAdmin() {
    this.message = "";
    this.slika = localStorage.getItem("slika");

    if (!this.slika) {
      this.registracijaOK = false;
      this.message = "Slika nije poslata. Unesite sliku i pokušajte ponovo";
      return;
    }
    if (!this.lozinka.match(this.lozinkaRegex)) {
      this.registracijaOK = false;
      this.message = "Neispravna lozinka. Lozinka mora imati minimalno 8 a maksimalno 12 karaktera, mora početi sa slovom, mora imati"
       + " bar jedno veliko i malo slovo, bar jedan broj i bar jedan specijalni karakter (@$!%*?&#_-). Pokušajte ponovo."
      return;
    }
    if(!this.PIB.match(this.pibRegex)) {
      this.registracijaOK = false;
      this.message = "Neispravan format PIB-a. Pokušajte ponovo.";
      return;
    }
    if(!this.maticniBroj.match(this.mbRegex)) {
      this.registracijaOK = false;
      this.message = "Neispravan format matičnog broja. Pokušajte ponovo.";
      return;
    }
    if (!(this.lozinka===this.potvrdaLozinke)) {
      this.registracijaOK = false;
      this.message = 'Lozinka i potvrđena lozinka se ne podudaraju. Pokušajte ponovo.';
      return;
    }

    this.korServ.registracijaPreduzecaAdmin(this.ime, this.prezime, this.korIme, this.lozinka, this.telefon, this.email, this.naziv, this.drzava,
       this.grad, this.postanskiBroj, this.ulica, this.broj, this.PIB, this.maticniBroj, this.slika).subscribe(respObj=>{
        if (respObj['message']=='ok') {
          this.registracijaOK = true;
          this.message = "";
          setTimeout(() => {
            this.registracijaOK = false;
            localStorage.clear();
            this.ngOnInit();
          }, 3000);
        }
        else if (respObj['message']=='vec ima email'){
          this.registracijaOK = false;
          this.message = 'Greška pri registraciji - unijeta e-mail adresa već postoji. Pokušajte ponovo.';
        } 
        else if (respObj['message']=='vec ima korIme'){
          this.registracijaOK = false;
          this.message = 'Greška pri registraciji - unijeto korisničko ime već postoji. Pokušajte ponovo.';
        } 
        else {
          this.registracijaOK = false;
          this.message = 'Greška pri registraciji. Pokušajte ponovo.';
        }
      });
      
    }

  imeKupca: string;
  prezimeKupca: string;
  korImeKupca: string;
  lozinkaKupca: string;
  potvrdaLozinkeKupca: string;
  telefonKupca: string;
  brojLicneKarteKupca: string;

  brojLKRegex = /^\d{9}$/;

  registracijaKupcaOK: boolean = false;
  kupacPoruka: string = "";

  registracijaKupcaAdmin() {
    this.kupacPoruka = "";

    if (!this.lozinkaKupca.match(this.lozinkaRegex)) {
      this.registracijaKupcaOK = false;
      this.kupacPoruka = "Neispravna lozinka. Lozinka mora imati minimalno 8 a maksimalno 12 karaktera, mora početi sa slovom, mora imati"
       + " bar jedno veliko i malo slovo, bar jedan broj i bar jedan specijalni karakter (@$!%*?&#_-). Pokušajte ponovo."
      return;
    }
    if (!(this.lozinka===this.potvrdaLozinke)) {
      this.registracijaKupcaOK = false;
      this.kupacPoruka = 'Lozinka i potvrđena lozinka se ne podudaraju. Pokušajte ponovo.';
      return;
    }
    if (!this.brojLicneKarteKupca.match(this.brojLKRegex)) {
      this.registracijaKupcaOK = false;
      this.kupacPoruka = "Neispravan format broja lične karte. Pokušajte ponovo."
      return;
    }

    this.korServ.registracijaKupcaAdmin(this.imeKupca, this.prezimeKupca, this.korImeKupca, this.lozinkaKupca,
      this.telefonKupca, this.brojLicneKarteKupca).subscribe(respObj=>{
        if (respObj['message']=='ok') {
          this.registracijaKupcaOK = true;
          this.kupacPoruka = "";
          setTimeout(() => {
            this.registracijaKupcaOK = false;
            localStorage.clear();
            this.ngOnInit();
          }, 3000);
        }
        else if (respObj['message']=='vec ima korIme'){
          this.registracijaKupcaOK = false;
          this.kupacPoruka = 'Greška pri registraciji - unijeto korisničko ime već postoji. Pokušajte ponovo.';
        } 
        else if (respObj['message']=='vec ima brojLK'){
          this.registracijaKupcaOK = false;
          this.kupacPoruka = 'Greška pri registraciji - unijeti broj lične karte već postoji. Pokušajte ponovo.';
        } 
        else {
          this.registracijaKupcaOK = false;
          this.kupacPoruka = 'Greška pri registraciji. Pokušajte ponovo.';
        }
      });
  }
}
