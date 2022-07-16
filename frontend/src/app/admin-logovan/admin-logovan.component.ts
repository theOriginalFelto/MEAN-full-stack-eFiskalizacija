import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-admin-logovan',
  templateUrl: './admin-logovan.component.html',
  styleUrls: ['./admin-logovan.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class AdminLogovanComponent implements OnInit {

  constructor(private korServ: KorisnikService,
    private router: Router) { }

  korIme: string;
  lozinka: string;
  
  ngOnInit(): void {
    this.korIme = sessionStorage.getItem("korIme");
    this.lozinka = sessionStorage.getItem("lozinka");
  }

  staraLozinka: string;
  novaLozinka: string;
  potvrdaLozinke: string;
  lozinkaPoruka: string = "";
  uspjehPromjenaLozinke: boolean;

  lozinkaRegex = /(?=^[a-zA-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_\-\.])[A-Za-z\d@$!%*?&#_\-\.]{8,12}$/;

  promjenaLozinkeAdmin() {
    this.lozinkaPoruka = "";
    this.uspjehPromjenaLozinke = false;
    if (this.staraLozinka != this.lozinka) {
      this.lozinkaPoruka = "Neispravna stara lozinka! Pokušajte ponovo."
      return;
    }
    if (!this.novaLozinka.match(this.lozinkaRegex)) {
      this.lozinkaPoruka = "Neispravna lozinka. Lozinka mora imati minimalno 8 a maksimalno 12 karaktera, mora početi sa slovom, mora imati"
      + " bar jedno veliko i malo slovo, bar jedan broj i bar jedan specijalni karakter (@$!%*?&#_-). Pokušajte ponovo."
     return;
    }
    if (this.novaLozinka != this.potvrdaLozinke) {
      this.lozinkaPoruka = "Nova lozinka i potvrđena lozinka se ne podudaraju! Pokušajte ponovo."
      return;
    }

    this.korServ.promjenaLozinkeAdmin(this.korIme, this.novaLozinka).subscribe(respObj => {
      if (respObj['message']=='ok') {
        this.uspjehPromjenaLozinke = true;
        this.lozinkaPoruka = "";
        setTimeout(() => {
          sessionStorage.clear();
          this.router.navigate(['/admin']);
        }, 4000);
      }
      else {
        this.uspjehPromjenaLozinke = false;
        this.lozinkaPoruka = 'Greška pri registraciji. Pokušajte ponovo.';
      }
    });
  }


  logout() {
    sessionStorage.clear();
    this.router.navigate(['/admin']);
  }

}
