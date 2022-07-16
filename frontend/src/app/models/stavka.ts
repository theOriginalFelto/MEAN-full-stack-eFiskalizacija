import { Artikal } from "./artikal";
import { CeneStanjeRobe } from "./cene-stanje-robe";

export class Stavka{
    constructor(art: Artikal, artMag: CeneStanjeRobe, kol: number) {
        this.artikal = art;
        this.artikalUMagacinu = artMag;
        this.kolicina = kol;
    }
    artikal: Artikal;
    artikalUMagacinu: CeneStanjeRobe;
    kolicina: number;
}