import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Preduzece } from '../models/preduzece';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-ziro-racuni',
  templateUrl: './ziro-racuni.component.html',
  styleUrls: ['./ziro-racuni.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class ZiroRacuniComponent implements OnInit {

  constructor(private acrout: ActivatedRoute, private korServ: KorisnikService,
    private router: Router) { }

    id: number = 0;
    ziroRacuni: string[];

    ngOnInit(): void {
      this.acrout.params.subscribe(params => {
        if (this.id == 0) this.id = params['id'];
        this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
          this.ziroRacuni = pred.ziroRacuni;
        });
      });
    }

    brisiZiroRacun(racun) {
      this.korServ.brisiZiroRacun(this.id, racun).subscribe(respObj => {
        if (respObj['message']=='ok') {
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
          }, 1500);
        }
      });
    }

    noviRacun: string;
    racunPoruka: string = "";
    racunRegex = /^\d{3}-\d{12}-\d{2}$/;

    dodajZiroRacun() {
      this.racunPoruka = ""
      let flag = false;
      if (!this.noviRacun.match(this.racunRegex)) {
        this.racunPoruka = "Neispravan format žiro računa. Probajte ponovo."
        return;
      }
      this.ziroRacuni.forEach(rac => {
        if (this.noviRacun === rac) {
          this.racunPoruka = "Račun već postoji. Dodajte novi."
          flag = true;
        }
      });
      if (flag) return;
      this.korServ.dodajZiroRacun(this.id, this.noviRacun).subscribe(respObj => {
        if (respObj['message']=='ok') {
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
          }, 1500);
        }
      });
    }

}
