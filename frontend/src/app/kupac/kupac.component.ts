import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Kupac } from '../models/kupac';
import { KorisnikService } from '../services/korisnik.service';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class KupacComponent implements OnInit {

  constructor(private acrout: ActivatedRoute, private korServ: KorisnikService, private router: Router,
    private racServ: RacunService) { }


  id: number = 0;
  brojLicneKarte: string;
  ime: string;
  lozinka: string;
  
  ngOnInit(): void {
    if (this.id == 0) this.id = Number.parseInt(this.acrout.snapshot.paramMap.get('idParam'));
    this.korServ.getKupac(this.id).subscribe((kupac: Kupac) => {
      this.brojLicneKarte = kupac.brojLicneKarte;
    });

    this.korServ.getKorisnik(this.id).subscribe((kor: Korisnik) => {
      this.ime = kor.ime;
      this.lozinka = kor.lozinka;
    });
  }

  staraLozinka: string;
  novaLozinka: string;
  potvrdaLozinke: string;
  lozinkaPoruka: string = "";
  uspjehPromjenaLozinke: boolean;

  lozinkaRegex = /(?=^[a-zA-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_-])[A-Za-z\d@$!%*?&#_-]{8,12}$/;

  promjenaLozinkeKupac() {
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

    this.korServ.promjenaLozinke(this.id, this.novaLozinka).subscribe(respObj => {
      if (respObj['message']=='ok') {
        this.uspjehPromjenaLozinke = true;
        this.lozinkaPoruka = "";
        setTimeout(() => {
          sessionStorage.clear();
          this.router.navigate(['']);
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
    this.router.navigate(['']);
  }

}
