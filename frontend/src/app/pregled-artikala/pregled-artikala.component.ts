import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artikal } from '../models/artikal';
import { CeneStanjeRobe } from '../models/cene-stanje-robe';
import { Preduzece } from '../models/preduzece';
import { ArtikalService } from '../services/artikal.service';
import { KorisnikService } from '../services/korisnik.service';
import { RacunService } from '../services/racun.service';

@Component({
  selector: 'app-pregled-artikala',
  templateUrl: './pregled-artikala.component.html',
  styleUrls: ['./pregled-artikala.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class PregledArtikalaComponent implements OnInit {

  constructor(private korServ: KorisnikService, private acrout: ActivatedRoute,
    private artServ: ArtikalService, private racServ: RacunService) { }


  svaPreduzeca: Preduzece[] = [];
  id: number;
  
  ngOnInit(): void {
    this.prikazArtikalaFlag = false;
    this.acrout.params.subscribe(params => {
      this.id = params['id'];
    });
    this.korServ.dohvatiSvaPreduzeca().subscribe((pred: Preduzece[]) => {
      this.svaPreduzeca = pred;
    })
  }

  trenPreduzece: Preduzece;
  prikazArtikalaFlag: boolean;
  sviArtikliPreduzeca: Artikal[] = [];
  izaberiPreduzece(pred: Preduzece) {
    this.trenPreduzece = pred;
    this.artServ.dohvatiSveArtikle(pred.id).subscribe((artikli: Artikal[]) => {
      this.sviArtikliPreduzeca = artikli;
      this.prikazArtikalaFlag = true;
    });
  }

  pretragaNaziv: string;
  pretraga() {
    this.artServ.dohvatiSveArtiklePoNazivu(this.trenPreduzece.id, this.pretragaNaziv).subscribe((artikli: Artikal[]) => {
      this.sviArtikliPreduzeca = artikli;
    })
  }

  trenArtikal: Artikal;
  prikazIzMagacinaFlag: boolean = false;
  magacinArtikli: CeneStanjeRobe[] = [];
  izaberiArtikal(art: Artikal) {
    this.trenArtikal = art;
    this.artServ.dohvatiArtikleIzMagacina(art.sifra).subscribe((magArtikli: CeneStanjeRobe[]) => {
      this.magacinArtikli = magArtikli;
      this.prikazIzMagacinaFlag = true;
    })
  }

  minimalnaCijena(art: CeneStanjeRobe): boolean {
    let ret = true;
    this.magacinArtikli.forEach(element => {
      if(art.prodajnaCena > element.prodajnaCena) ret = false;
    });
    return ret;
  }
}
