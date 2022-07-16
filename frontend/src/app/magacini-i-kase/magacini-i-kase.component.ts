import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kasa } from '../models/kasa';
import { Magacin } from '../models/magacin';
import { Preduzece } from '../models/preduzece';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-magacini-i-kase',
  templateUrl: './magacini-i-kase.component.html',
  styleUrls: ['./magacini-i-kase.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class MagaciniIKaseComponent implements OnInit {

  constructor(private acrout: ActivatedRoute, private korServ: KorisnikService,
    private router: Router) { }

    id: number = 0;
    magacini: Magacin[] = [];
    kase: Kasa[] = [];

    ngOnInit(): void {
      this.acrout.params.subscribe(params => {
        if (this.id == 0) this.id = params['id'];
        this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
          this.magacini = pred.magacini;
          this.kase = pred.kase;
        });
      });
    }

    brisiMagacin(magacin) {
      this.korServ.brisiMagacin(this.id, magacin).subscribe(respObj => {
        if (respObj['message']=='ok') {
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
          }, 1500);
        }
      });
    }

    idMag: number;
    nazivMag: string;
    noviMagacin: Magacin;

    dodajMagacin() {
      this.noviMagacin = new Magacin(this.idMag, this.nazivMag);
      this.korServ.dodajMagacin(this.id, this.noviMagacin).subscribe(respObj => {
        if (respObj['message']=='ok') {
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
          }, 1500);
        }
      });
    }

    brisiKasu(kasa) {
      this.korServ.brisiKasu(this.id, kasa).subscribe(respObj => {
        if (respObj['message']=='ok') {
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
          }, 1500);
        }
      });
    }

    lokKasa: string;
    tipKasa: string;
    novaKasa: Kasa;

    dodajKasu() {
      this.novaKasa = new Kasa(this.lokKasa, this.tipKasa);
      this.korServ.dodajKasu(this.id, this.novaKasa).subscribe(respObj => {
        if (respObj['message']=='ok') {
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
          }, 1500);
        }
      });
    }

}
