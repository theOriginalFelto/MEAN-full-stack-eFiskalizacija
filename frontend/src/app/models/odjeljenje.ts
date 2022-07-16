import { Sto } from "./stolovi/sto";

export class Odjeljenje{
    constructor(naz: string) {
        this.naziv = naz;
        this.stolovi = [];
    }
    naziv: string;
    stolovi: Sto[];
}