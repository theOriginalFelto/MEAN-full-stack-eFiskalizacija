import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../models/admin';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private korServ: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.poruka = "";
  }

  korIme: string;
  lozinka: string;
  poruka: string;

  prijavaAdmin() {
    this.korServ.prijavaAdmin(this.korIme, this.lozinka).subscribe((admin: Admin) => {
      if (admin) {
        this.poruka = '';
        sessionStorage.setItem("korIme", this.korIme);
        sessionStorage.setItem("lozinka", this.lozinka);
        this.router.navigate(['admin-logovan']);
      }
      else {
        this.poruka = 'Greška pri prijavljivanju - pogrešni kredencijali. Pokušajte ponovo.';
      }
    })
  }

}
