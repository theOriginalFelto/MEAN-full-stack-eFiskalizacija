import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var oCanvas: any;
import "../../assets/js/ocanvas-2.10.0.min.js"
import { Odjeljenje } from '../models/odjeljenje';
import { Preduzece } from '../models/preduzece';
import { Sto } from '../models/stolovi/sto';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-raspored-stolova',
  templateUrl: './raspored-stolova.component.html',
  styleUrls: ['./raspored-stolova.component.css', '../bootstrap/css/bootstrap-grid.min.css',
  '../bootstrap/css/bootstrap-reboot.min.css', '../bootstrap/css/bootstrap.min.css']
})
export class RasporedStolovaComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>; 

  constructor(private korServ: KorisnikService, private acrout: ActivatedRoute) { }

  private ctx: CanvasRenderingContext2D;
  //sviStolovi: Sto[] = [];
  odjeljenja: Odjeljenje[] = [];
  indexOdjeljenja: number;
  trenOdjeljenje: Odjeljenje;
  id: number;
  lokalniStolovi: any[][] = [];
  trenLokalniStolovi: any[] = [];
  kanvas: any;
  opcije: any;

  ngOnInit(): void {
    this.xNoviSto = undefined;
    this.yNoviSto = undefined;
    this.sirinaNoviSto = undefined;
    this.visinaNoviSto = undefined;
    this.poluprecnikNoviSto = undefined;
    if (!this.indexOdjeljenja) this.indexOdjeljenja = 0;
    this.lokalniStolovi.forEach(element => {
      element.splice(0);
    });
    this.lokalniStolovi.splice(0);
    this.trenLokalniStolovi.splice(0);
    this.acrout.params.subscribe(params => {
      this.id = params['id'];
      this.korServ.getPreduzece(this.id).subscribe((pred: Preduzece) => {
        this.odjeljenja = pred.odjeljenja;
        this.trenOdjeljenje = this.odjeljenja[this.indexOdjeljenja];
        this.kanvas = oCanvas.create({
          canvas: "#canvas",
          background: "#d1e0f8"
        });
        var dragOptions = { changeZindex: true,
          move: function() {

          }
        };
        this.opcije = dragOptions;

        this.odjeljenja.forEach((odj, br) => {
          for (let index = 0; index < odj.stolovi.length; index++) {
            const element = odj.stolovi[index];
            const broj = index + 1;
            const tekst = "Sto broj " + broj;
            if (element.tip === "pravougaoni") {
              var sto = this.kanvas.display.rectangle({
                  x: element.x,
                  y: element.y,
                  origin: { x: "center", y: "center" },
                  width: element.sirina,
                  height: element.visina,
                  fill: "#2b78f3",
                  stroke: "10px #2b78f3"
              });
              var natpis = this.kanvas.display.text({
                  x: 0,
                  y: 0,
                  origin: { x: "center", y: "center" },
                  align: "center",
                  font: "11px sans-serif",
                  text: tekst,
                  fill: "#fff"
              });
              sto.addChild(natpis);
              if (this.indexOdjeljenja == br) this.kanvas.addChild(sto);
              sto.dragAndDrop(dragOptions);
              if (this.indexOdjeljenja == br) this.trenLokalniStolovi.push(sto);
            } else {
              var sto = this.kanvas.display.arc({
                  x: element.x,
                  y: element.y,
                  radius: element.poluprecnik,
                  start: 0,
                  end: 360,
                  fill: "#2b78f3"
              });
              var natpis = this.kanvas.display.text({
                  x: 0,
                  y: 0,
                  origin: { x: "center", y: "center" },
                  align: "center",
                  font: "11px sans-serif",
                  text: tekst,
                  fill: "#fff"
              });
              sto.addChild(natpis);
              if (this.indexOdjeljenja == br) this.kanvas.addChild(sto);
              sto.dragAndDrop(dragOptions);
              if (this.indexOdjeljenja == br) this.trenLokalniStolovi.push(sto);
            }
          }
          this.lokalniStolovi.push(this.trenLokalniStolovi);
        });
      })
    });
  }

  izaberiOdjeljenje(ind: number) {
    this.kanvas.clear();
    this.odjeljenja[this.indexOdjeljenja] = this.trenOdjeljenje;
    this.indexOdjeljenja = ind;
    this.trenOdjeljenje = this.odjeljenja[ind];
    this.ngOnInit();
  }

  sacuvajPoruka: string = "";
  kolizijaFlag: boolean = false;
  sacuvaj() {
    if (this.kolizijaFlag) {
      this.sacuvajPoruka = "Nemoguće sačuvati raspored jer postoji preklapanje stolova!";
      return;
    }
    this.sacuvajPoruka = "";
    for (let index = 0; index < this.trenOdjeljenje.stolovi.length; index++) {
      this.trenOdjeljenje.stolovi[index].x = this.trenLokalniStolovi[index].x;
      this.trenOdjeljenje.stolovi[index].y = this.trenLokalniStolovi[index].y;
    }
    this.odjeljenja[this.indexOdjeljenja] = this.trenOdjeljenje;
    this.korServ.sacuvajOdjeljenje(this.id, this.trenOdjeljenje).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.sacuvajPoruka = "Uspješno sačuvan raspored stolova!";
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
          this.sacuvajPoruka = "";
        }, 3000);
      }
      else  {
        this.sacuvajPoruka = 'Greška pri čuvanju rasporeda stolova. Pokušajte ponovo.';
      }
    })
  }

  tipStola: string;
  xNoviSto: number;
  yNoviSto: number;
  sirinaNoviSto: number;
  visinaNoviSto: number;
  poluprecnikNoviSto: number;

  dodajSto() {
    const broj = this.trenOdjeljenje.stolovi.length + 1;
    const tekst = "Sto broj " + broj;
    if (this.tipStola === "pravougaoni") {
      var sto = this.kanvas.display.rectangle({
          x: this.xNoviSto,
          y: this.yNoviSto,
          origin: { x: "center", y: "center" },
          width: this.sirinaNoviSto,
          height: this.visinaNoviSto,
          fill: "#2b78f3",
          stroke: "10px #2b78f3"
      });
      var natpis = this.kanvas.display.text({
          x: 0,
          y: 0,
          origin: { x: "center", y: "center" },
          align: "center",
          font: "11px sans-serif",
          text: tekst,
          fill: "#fff"
      });
      sto.addChild(natpis);
      this.kanvas.addChild(sto);
      sto.dragAndDrop(this.opcije);

      let noviSto = new Sto(sto.x, sto.y);
      noviSto.tip = this.tipStola;
      noviSto.sirina = sto.width;
      noviSto.visina = sto.height;
      noviSto.poluprecnik = 0;

      this.odjeljenja[this.indexOdjeljenja].stolovi.push(noviSto);
      this.trenOdjeljenje = this.odjeljenja[this.indexOdjeljenja];
      this.lokalniStolovi[this.indexOdjeljenja].push(sto);
      this.trenLokalniStolovi = this.lokalniStolovi[this.indexOdjeljenja];
    } else {
      var sto = this.kanvas.display.arc({
          x: this.xNoviSto,
          y: this.xNoviSto,
          radius: this.poluprecnikNoviSto,
          start: 0,
          end: 360,
          fill: "#2b78f3"
      });
      var natpis = this.kanvas.display.text({
          x: 0,
          y: 0,
          origin: { x: "center", y: "center" },
          align: "center",
          font: "11px sans-serif",
          text: tekst,
          fill: "#fff"
      });
      sto.addChild(natpis);
      this.kanvas.addChild(sto);
      sto.dragAndDrop(this.opcije);

      let noviSto = new Sto(sto.x, sto.y);
      noviSto.tip = this.tipStola;
      noviSto.sirina = 0;
      noviSto.visina = 0;
      noviSto.poluprecnik = sto.radius;

      this.odjeljenja[this.indexOdjeljenja].stolovi.push(noviSto);
      this.trenOdjeljenje = this.odjeljenja[this.indexOdjeljenja];
      this.lokalniStolovi[this.indexOdjeljenja].push(sto);
      this.trenLokalniStolovi = this.lokalniStolovi[this.indexOdjeljenja];
    }
  }

  nazivOdjeljenja: string;
  dodavanjeOdjeljenjaPoruka: string = "";
  dodajOdjeljenje() {
    this.dodavanjeOdjeljenjaPoruka = "";
    let od = new Odjeljenje(this.nazivOdjeljenja);
    this.korServ.dodajOdjeljenje(this.id, od).subscribe(respObj => {
      if (respObj['message'] == 'ok') {
        this.dodavanjeOdjeljenjaPoruka = "Uspješno dodata odjeljenje!";
        setTimeout(() => {
          sessionStorage.clear();
          this.ngOnInit();
          this.dodavanjeOdjeljenjaPoruka = "";
          this.nazivOdjeljenja = "";
        }, 3000);
      }
      else  {
        this.dodavanjeOdjeljenjaPoruka = 'Greška pri dodavanju odjeljenja. Pokušajte ponovo.';
      }
    })
  }
}
