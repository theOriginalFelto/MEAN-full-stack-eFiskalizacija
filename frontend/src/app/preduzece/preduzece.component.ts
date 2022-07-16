import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Preduzece } from '../models/preduzece';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css'
]
})
export class PreduzeceComponent implements OnInit, OnDestroy {
  navigationSubscription;

  constructor(private acrout: ActivatedRoute, private korServ: KorisnikService,
    private router: Router) {
      // subscribe to the router events. Store the subscription so we can
      // unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.ngOnInit();
        }
     });
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  id: number = 0;
  imeKompanije: string;
  ime: string;
  kategorija: string;
  lozinka: string;

  ngOnInit(): void {
    if (this.id == 0) this.id = Number.parseInt(this.acrout.snapshot.paramMap.get('idParam'));
    this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
      this.imeKompanije = pred.naziv;
      this.kategorija = pred.kategorija;
      document.querySelector("#profilnaSlika").setAttribute("src", pred.slika);
    });

    this.korServ.getKorisnik(this.id).subscribe((kor: Korisnik) => {
      this.ime = kor.ime;
      this.lozinka = kor.lozinka;
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  staraLozinka: string;
  novaLozinka: string;
  potvrdaLozinke: string;
  lozinkaPoruka: string = "";
  uspjehPromjenaLozinke: boolean;

  lozinkaRegex = /(?=^[a-zA-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_-])[A-Za-z\d@$!%*?&#_-]{8,12}$/;

  promjenaLozinke() {
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

  formKategorija: string;
  formSifreDj: string;
  sifreDjelatnosti: string[];
  formIsPdv: boolean;
  formZiroRac: string;
  ziroRacuni: string[];
  formBrKasa: number;
  formBrMag: number;
  podaciPoruka: string = "";

  racuniRegex = /^\d{3}-\d{12}-\d{2}$/;
  // 123-123456789987-12,987-987654321123-98

  dodajPodatke() {
    this.podaciPoruka = "";
    this.sifreDjelatnosti = this.formSifreDj.split(",");
    this.ziroRacuni = this.formZiroRac.split(",");
    this.ziroRacuni.forEach(element => {
      if (!element.match(this.racuniRegex)) {
        this.podaciPoruka = "Neispravno unijet žiro račun. Pokušajte ponovo!";
        return;
      }
    });
    this.korServ.dodajPodatke(this.id, this.formKategorija, this.formIsPdv, this.sifreDjelatnosti, this.ziroRacuni,
      this.formBrKasa, this.formBrMag).subscribe(respObj => {
        if (respObj['message']=='ok') {
          setTimeout(() => {
            sessionStorage.clear();
            this.router.navigate(['preduzece', {idParam: this.id}]);
          }, 1000);
        }
        else {
          console.log("greska");
        }
      });
  }

}
