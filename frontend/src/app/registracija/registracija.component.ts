import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
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

  lozinkaRegex = /(?=^[a-zA-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-\.])[A-Za-z\d@$!%*?&#_\-\.]{8,12}$/;
  pibRegex = /^[1-9]\d{8}$/;
  mbRegex = /^\d{8}$/;


  registracija() {
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

    this.korServis.registracija(this.ime, this.prezime, this.korIme, this.lozinka, this.telefon, this.email, this.naziv, this.drzava,
       this.grad, this.postanskiBroj, this.ulica, this.broj, this.PIB, this.maticniBroj, this.slika).subscribe(respObj=>{
        if (respObj['message']=='ok') {
          this.registracijaOK = true;
          this.message = "";
          localStorage.clear();
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

    nazad() {
      localStorage.clear();
      this.router.navigate(['']);
    }
}
