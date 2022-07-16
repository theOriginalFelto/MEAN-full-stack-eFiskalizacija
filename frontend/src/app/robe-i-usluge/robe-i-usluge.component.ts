import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artikal } from '../models/artikal';
import { CeneStanjeRobe } from '../models/cene-stanje-robe';
import { Preduzece } from '../models/preduzece';
import { ArtikalService } from '../services/artikal.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-robe-i-usluge',
  templateUrl: './robe-i-usluge.component.html',
  styleUrls: ['./robe-i-usluge.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class RobeIUslugeComponent implements OnInit {

  constructor(private korServ: KorisnikService, private acrout: ActivatedRoute,
    private artServ: ArtikalService) { }

  sviArtikli: Artikal[] = [];
  artikliZaPrikaz: Artikal[] = [];
  matricaSvihArtikala: Artikal[][] = [];
  stranicaKojaSePrikazuje: number;
  static readonly brojArtikalaZaPrikaz: number = 10;
  brojStranicaZaPrikaz: number;

  preduzece: Preduzece;
  id: number = 0;
  kat: string = "";

  dodatniPodaciUnosFlag: boolean;
  cijeneIStanjeRobeUnosFlag: boolean;
  dodatniPodaciIzmjenaFlag: boolean;
  cijeneIStanjeRobeIzmjenaFlag: boolean;

  ngOnInit(): void {
    this.dodatniPodaciUnosFlag = false;
    this.cijeneIStanjeRobeUnosFlag = false;
    this.dodatniPodaciIzmjenaFlag = false;
    this.cijeneIStanjeRobeIzmjenaFlag = false;

    this.acrout.params.subscribe(params => {
      this.id = params['id'];
      this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
        this.preduzece = pred;
        this.kat = pred.kategorija;
      });
      this.artServ.dohvatiSveArtikle(this.id).subscribe((artikli: Artikal[]) => {
        this.sviArtikli = artikli;
        this.artikliZaPrikaz.splice(0); //kao clear
        this.brojStranicaZaPrikaz = Math.ceil(this.sviArtikli.length / RobeIUslugeComponent.brojArtikalaZaPrikaz);

        let pocetak = 0;
        let kraj = RobeIUslugeComponent.brojArtikalaZaPrikaz;
        for (let index = 0; index < this.brojStranicaZaPrikaz; index++) { //popunjavanje matrice
          this.matricaSvihArtikala[index] = this.sviArtikli.slice(pocetak, kraj);

          pocetak += RobeIUslugeComponent.brojArtikalaZaPrikaz;
          kraj += RobeIUslugeComponent.brojArtikalaZaPrikaz;

          if (kraj > this.sviArtikli.length) kraj = this.sviArtikli.length;
        }

        this.artikliZaPrikaz = this.matricaSvihArtikala[0];
        this.stranicaKojaSePrikazuje = 1;
      })
    });
  }

  novaStranica(index) {
    this.artikliZaPrikaz = this.matricaSvihArtikala[index];
    this.stranicaKojaSePrikazuje = index + 1;
  }

  izmjenaFlag: boolean = false;

  izmjenaSifra: number;
  izmjenaNaziv: string;
  izmjenaJedMjere: string;
  izmjenaPoreskaStopa: number;
  izmjenaTip: string;
  izmjenaZemljaPorijekla: string;
  izmjenaStraniNaziv: string;
  izmjenaBarkod: number;
  izmjenaProizvodjac: string;
  izmjenaCarinskaTarifa: number;
  izmjenaEkoTaksa: boolean;
  izmjenaAkcize: boolean;
  izmjenaMinimalneZalihe: number;
  izmjenaMaksimalneZalihe: number;
  izmjenaDeklaracija: string;
  izmjenaOpis: string;
  izmjenaSlika: string;

  izmijeniArtikal(art: Artikal) {
    this.izmjenaFlag = true;
    this.dodatniPodaciUnosFlag = false;
    this.cijeneIStanjeRobeUnosFlag = false;
    this.dodatniPodaciIzmjenaFlag = false;
    this.cijeneIStanjeRobeIzmjenaFlag = false;

    this.izmjenaSifra = art.sifra;
    this.izmjenaNaziv = art.naziv;
    this.izmjenaJedMjere = art.jedinicaMere;
    this.izmjenaPoreskaStopa = art.stopaPoreza;
    this.izmjenaTip = art.tip;
    this.izmjenaZemljaPorijekla = art.zemljaPorekla;
    this.izmjenaStraniNaziv = art.straniNaziv;
    this.izmjenaBarkod = art.barkod;
    this.izmjenaProizvodjac = art.proizvodjac;
    this.izmjenaCarinskaTarifa = art.carinskaTarifa;
    this.izmjenaEkoTaksa = art.ekoTaksa;
    this.izmjenaAkcize = art.akcize;
    this.izmjenaMinimalneZalihe = art.minimalneZeljeneZalihe;
    this.izmjenaMaksimalneZalihe = art.maksimalneZeljeneZalihe;
    this.izmjenaDeklaracija = art.deklaracija;
    this.izmjenaOpis = art.opis;
    this.izmjenaSlika = art.slika;
  }

  izmjenaArtikalPoruka: string = "";

  izmijeniArtikalDugme() {
    this.izmjenaArtikalPoruka = "";
    if(!this.slika) this.slika = "C:/Users/km190385d/Downloads/PIA/Projekat/frontend/src/assets/artikli/default-product-image.jpg"
    this.artServ.izmijeniArtikal(this.id, this.izmjenaSifra, this.izmjenaNaziv, this.izmjenaJedMjere, this.izmjenaPoreskaStopa, this.izmjenaTip,
      this.izmjenaZemljaPorijekla, this.izmjenaStraniNaziv, this.izmjenaBarkod, this.izmjenaProizvodjac, this.izmjenaCarinskaTarifa,
      this.izmjenaEkoTaksa, this.izmjenaAkcize, this.izmjenaMinimalneZalihe, this.izmjenaMaksimalneZalihe,
      this.izmjenaDeklaracija, this.izmjenaOpis, this.izmjenaSlika).subscribe(respObj => {
        if (respObj['message'] == 'ok') {
          this.izmjenaArtikalPoruka = "Uspješna izmjena artikla! Uskoro će se prikazati u tabeli.";
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
            this.izmjenaArtikalPoruka = "";
            this.izmjenaFlag = false;
          }, 3000);
        }
        else {
          this.izmjenaArtikalPoruka = 'Greška pri izmjeni artikla. Pokušajte ponovo.';
        }
      })
  }

  brisiArtikal(art: Artikal) {
    if (confirm("Da li ste sigurni da želite da obrišete artikal?")) {
      this.artServ.brisiArtikal(art.idPred, art.sifra).subscribe(respObj => {
        if (respObj['message'] == 'ok') {
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
          }, 1500);
        }
      })
    }
  }

  novaSifra: number;
  noviNaziv: string;
  novaJedMjere: string;
  novaPoreskaStopa: number;
  noviTip: string;
  novaZemljaPorijekla: string;
  noviStraniNaziv: string;
  noviBarkod: number;
  noviProizvodjac: string;
  novaCarinskaTarifa: number;
  novaEkoTaksa: boolean;
  noveAkcize: boolean;
  noveMinimalneZalihe: number;
  noveMaksimalneZalihe: number;
  novaDeklaracija: string;
  noviOpis: string;
  slika: string;

  artikalPoruka: string = "";

  dodajArtikal() {
    this.artikalPoruka = "";
    if(!this.slika) this.slika = "C:/Users/km190385d/Downloads/PIA/Projekat/frontend/src/assets/artikli/default-product-image.jpg"
    this.artServ.dodajArtikal(this.id, this.novaSifra, this.noviNaziv, this.novaJedMjere, this.novaPoreskaStopa, this.noviTip,
      this.novaZemljaPorijekla, this.noviStraniNaziv, this.noviBarkod, this.noviProizvodjac, this.novaCarinskaTarifa,
      this.novaEkoTaksa, this.noveAkcize, this.noveMinimalneZalihe, this.noveMaksimalneZalihe,
      this.novaDeklaracija, this.noviOpis, this.slika).subscribe(respObj => {
        if (respObj['message'] == 'ok') {
          this.artikalPoruka = "Uspješno dodavanje artikla! Uskoro će se prikazati u tabeli.";
          setTimeout(() => {
            sessionStorage.clear();
            this.ngOnInit();
            this.artikalPoruka = "";
          }, 3000);
        }
        else if (respObj['message'] == 'vec ima sifra') {
          this.artikalPoruka = 'Greška pri unosu artikla - šifra artikla već postoji. Pokušajte ponovo.';
          this.dodatniPodaciUnosFlag = false;
          this.cijeneIStanjeRobeUnosFlag = false;
        }
        else {
          this.artikalPoruka = 'Greška pri unosu artikla. Pokušajte ponovo.';
        }
      })
  }

  magacinArtikliUnos: CeneStanjeRobe[] = []; //gdje se sve nalazi artikal koji se unosi
  magacinArtikliIzmjena: CeneStanjeRobe[] = []; //gdje se sve nalazi artikal koji se mijenja

  dodatniPodaciUnos() {
    this.dodatniPodaciUnosFlag = true;
    this.artikalPoruka = '';
    this.artServ.dohvatiArtikleIzMagacina(this.novaSifra).subscribe((magArtikli: CeneStanjeRobe[]) => {
      this.magacinArtikliUnos = magArtikli;
    })
  }

  cijeneIStanjeRobeUnos() {
    this.cijeneIStanjeRobeUnosFlag = true;
  }

  dodatniPodaciIzmjena() {
    this.dodatniPodaciIzmjenaFlag = true;
    this.artServ.dohvatiArtikleIzMagacina(this.izmjenaSifra).subscribe((magArtikli: CeneStanjeRobe[]) => {
      this.magacinArtikliIzmjena = magArtikli;
    })
  }

  cijeneIStanjeRobeIzmjena() {
    this.cijeneIStanjeRobeIzmjenaFlag = true;
  }

}
