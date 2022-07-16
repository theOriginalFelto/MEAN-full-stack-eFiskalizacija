import { Stavka } from "./stavka";

export class Racun{
    constructor(id: number, naziv: string) {
        this.idPred = id;
        this.nazivPred = naziv;
        this.ukupanIznos = 0;
        this.iznosPDV = 0;
        this.stavke = [];
    }
    idPred: number;
    nazivPred: string;
    datum: Date;
    dan: number;
    mesec: number;
    godina: number;
    ukupanIznos: number;
    iznosPDV: number;
    stavke: Stavka[] = [];

    brojLicneKarteKupca: number;
    pibNarucioca: string;
    nacinPlacanja: string;
    gradIzdavanja: string;
    ulicaIzdavanja: string;
    brojIzdavanja: string;
}