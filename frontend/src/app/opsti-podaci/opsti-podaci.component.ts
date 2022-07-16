import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Preduzece } from '../models/preduzece';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-opsti-podaci',
  templateUrl: './opsti-podaci.component.html',
  styleUrls: ['./opsti-podaci.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class OpstiPodaciComponent implements OnInit, OnDestroy {
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
  korisnik: Korisnik;
  preduzece: Preduzece;

  ngOnInit(): void {
    this.acrout.params.subscribe(params => {
      if (this.id == 0) this.id = params['id'];
      this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
        this.preduzece = pred;
      });
  
      this.korServ.getKorisnik(this.id).subscribe((kor: Korisnik) => {
        this.korisnik = kor;
      });
    });
  }

  //promjene podataka
  novoKorIme: string;
  korImePoruka: string = "";
  promjenaKorIme() {
    this.korImePoruka = "";
    if (this.novoKorIme === this.korisnik.korisnickoIme) {
      return;
    }
    this.korServ.promjenaKorIme(this.id, this.novoKorIme).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
      else {
        this.korImePoruka = "Korisnično ime već zauzeto. Probajte s nekim drugim."
      }
    });
  }

  novoIme: string;
  promjenaIme() {
    if (this.novoIme === this.korisnik.ime) {
      return;
    }
    this.korServ.promjenaIme(this.id, this.novoIme).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  novoPrezime: string;
  promjenaPrezime() {
    if (this.novoPrezime === this.korisnik.prezime) {
      return;
    }
    this.korServ.promjenaPrezime(this.id, this.novoPrezime).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviTelefon: string;
  promjenaTelefon() {
    if (this.noviTelefon === this.korisnik.telefon) {
      return;
    }
    this.korServ.promjenaTelefon(this.id, this.noviTelefon).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviEmail: string;
  emailPoruka: string = "";
  promjenaEmail() {
    this.emailPoruka = "";
    if (this.noviEmail === this.preduzece.email) {
      return;
    }
    this.korServ.promjenaEmail(this.id, this.noviEmail).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
      else {
        this.emailPoruka = "E-mail je već zauzet. Probajte s nekim drugim."
      }
    });
  }

  noviNaziv: string;
  promjenaNaziv() {
    if (this.noviNaziv === this.preduzece.naziv) {
      return;
    }
    this.korServ.promjenaNaziv(this.id, this.noviNaziv).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  novaDrzava: string;
  promjenaDrzava() {
    if (this.novaDrzava === this.preduzece.drzava) {
      return;
    }
    this.korServ.promjenaDrzava(this.id, this.novaDrzava).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviGrad: string;
  promjenaGrad() {
    if (this.noviGrad === this.preduzece.grad) {
      return;
    }
    this.korServ.promjenaGrad(this.id, this.noviGrad).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviPbr: string;
  promjenaPbr() {
    if (this.noviPbr === this.preduzece.postanskiBroj) {
      return;
    }
    this.korServ.promjenaPbr(this.id, this.noviPbr).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  novaUlica: string;
  promjenaUlica() {
    if (this.novaUlica === this.preduzece.ulica) {
      return;
    }
    this.korServ.promjenaUlica(this.id, this.novaUlica).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviBroj: string;
  promjenaBroj() {
    if (this.noviBroj === this.preduzece.broj) {
      return;
    }
    this.korServ.promjenaBroj(this.id, this.noviBroj).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviPIB: string;
  pibPoruka: string = "";
  pibRegex = /^[1-9]\d{8}$/;
  promjenaPIB() {
    this.pibPoruka = "";
    if (this.noviPIB === this.preduzece.PIB) {
      return;
    }
    if (!this.noviPIB.match(this.pibRegex)) {
      this.pibPoruka = "Neispravan format PIB-a. Pokušajte ponovo."
      return;
    }
    this.korServ.promjenaPIB(this.id, this.noviPIB).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviMB: string;
  mbPoruka: string = "";
  mbRegex = /^\d{8}$/;
  promjenaMB() {
    this.mbPoruka = "";
    if (this.noviMB === this.preduzece.maticniBroj) {
      return;
    }
    if (!this.noviMB.match(this.mbRegex)) {
      this.pibPoruka = "Neispravan format matičnog broja. Pokušajte ponovo."
      return;
    }
    this.korServ.promjenaMB(this.id, this.noviMB).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  novaKategorija: string;
  promjenaKategorija() {
    if (this.novaKategorija === this.preduzece.kategorija) {
      return;
    }
    this.korServ.promjenaKategorija(this.id, this.novaKategorija).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noveSifreDj: string;
  noveSifreDjelatnosti: string[];
  promjenaSifriDj() {
    this.noveSifreDjelatnosti = this.noveSifreDj.split(",");
    if (this.noveSifreDjelatnosti === this.preduzece.sifreDelatnosti) {
      return;
    }
    this.korServ.promjenaSifriDj(this.id, this.noveSifreDjelatnosti).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviBrojMagacina: number;
  promjenaBrojMagacina() {
    if (this.noviBrojMagacina === this.preduzece.brojMagacina) {
      return;
    }
    this.korServ.promjenaBrojMagacina(this.id, this.noviBrojMagacina).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }

  noviBrojKasa: number;
  promjenaBrojKasa() {
    if (this.noviBrojKasa === this.preduzece.brojKasa) {
      return;
    }
    this.korServ.promjenaBrojKasa(this.id, this.noviBrojKasa).subscribe(respObj => {
      if (respObj['message']=='ok') {
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
        }, 1500);
      }
    });
  }
}
