import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-narucioci',
  templateUrl: './narucioci.component.html',
  styleUrls: ['./narucioci.component.css']
})
export class NaruciociComponent implements OnInit {

  constructor(private korServis: KorisnikService, private router: Router,
    private acrout: ActivatedRoute) { }

  idPred: number;

  ngOnInit(): void {
    this.acrout.params.subscribe(params => {
      this.idPred = params['id'];
    });
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
  brojDanaZaPlacanje: number;
  rabat: number;

  message: string;
  registracijaOK: boolean;

  lozinkaRegex = /(?=^[a-zA-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-\.])[A-Za-z\d@$!%*?&#_\-\.]{8,12}$/;
  pibRegex = /^[1-9]\d{8}$/;
  mbRegex = /^\d{8}$/;


  registracijaNarucioca() {
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
    if (!this.PIB.match(this.pibRegex)) {
      this.registracijaOK = false;
      this.message = "Neispravan format PIB-a. Pokušajte ponovo.";
      return;
    }
    if (!this.maticniBroj.match(this.mbRegex)) {
      this.registracijaOK = false;
      this.message = "Neispravan format matičnog broja. Pokušajte ponovo.";
      return;
    }
    if (!(this.lozinka === this.potvrdaLozinke)) {
      this.registracijaOK = false;
      this.message = 'Lozinka i potvrđena lozinka se ne podudaraju. Pokušajte ponovo.';
      return;
    }

    this.korServis.registracijaNarucioca(this.ime, this.prezime, this.korIme, this.lozinka, this.telefon, this.email, this.naziv, 
      this.drzava, this.grad, this.postanskiBroj, this.ulica, this.broj, 
      this.PIB, this.maticniBroj, this.slika, this.idPred, this.brojDanaZaPlacanje, this.rabat).subscribe(respObj => {
        if (respObj['message'] == 'ok') {
          this.registracijaOK = true;
          this.message = "";
          localStorage.clear();
        }
        else if (respObj['message'] == 'vec ima email') {
          this.registracijaOK = false;
          this.message = 'Greška pri registraciji - unijeta e-mail adresa već postoji. Pokušajte ponovo.';
        }
        else if (respObj['message'] == 'vec ima korIme') {
          this.registracijaOK = false;
          this.message = 'Greška pri registraciji - unijeto korisničko ime već postoji. Pokušajte ponovo.';
        }
        else {
          this.registracijaOK = false;
          this.message = 'Greška pri registraciji. Pokušajte ponovo.';
        }
      });

  }

  narPIB: string;
  brojDanaZaPlacanjePIB: number;
  rabatPIB: number;

  PIBregistracijaOK: boolean;
  PIBporuka: string = "";

  registracijaNaruciocaPib() {
    this.PIBporuka = "";
    if (!this.narPIB.match(this.pibRegex)) {
      this.PIBregistracijaOK = false;
      this.PIBporuka = "Neispravan format PIB-a. Pokušajte ponovo."
      return;
    }
    this.korServis.registracijaNaruciocaPib(this.narPIB, this.idPred, this.brojDanaZaPlacanjePIB, this.rabatPIB).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.PIBregistracijaOK = true;
        this.PIBporuka = "";
        localStorage.clear();
      }
      else if (respObj['message'] == 'nema PIB') {
        this.PIBregistracijaOK = false;
        this.PIBporuka = "Unijeli ste nepostojeći PIB. Pokušajte ponovo."
      }
      else if (respObj['message'] == 'ima narucilac') {
        this.PIBregistracijaOK = false;
        this.PIBporuka = "Greška: već sarađujete s tim naručiocem."
      }
      else {
        this.PIBregistracijaOK = false;
        this.PIBporuka = "Greška!"
      }
    })
  }
}
