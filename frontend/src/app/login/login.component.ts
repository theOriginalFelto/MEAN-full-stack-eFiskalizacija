import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Racun } from '../models/racun';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private korServ: KorisnikService, private router: Router, private racServ: RacunService) { }

  ngOnInit(): void {
    this.poruka = "";
    this.dohvatiRacune();
  }

  korIme: string;
  lozinka: string;
  poruka: string;

  prijava() {
    this.korServ.prijava(this.korIme, this.lozinka).subscribe((kor: Korisnik)=>{
      if (kor == null) {
        this.poruka="Pogrešno korisničko ime ili lozinka. Pokušajte ponovo.";
        return;
      }
      if (!kor.aktivan) {
        this.poruka = "Nalog je trenutno neaktivan. Molimo kontaktirajte administratora za aktivaciju.";
        return;
      }

      this.poruka = "";
      if (kor.tip=="kupac") {
        this.router.navigate(['kupac', {idParam: kor.id}]);
      } else if (kor.tip=="preduzece") {
        this.router.navigate(['preduzece', {idParam: kor.id}]);
      }
    })
  }

  petRacuna: Racun[] = [];
  dohvatiRacune() {
    this.racServ.dohvatiPetPosljednjihRacuna().subscribe((rac: Racun[]) => {
      this.petRacuna = rac;
    })
  }
}
