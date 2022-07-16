export class KategorijaArtikla{
    constructor(naz: string, art: number[] = [], pot: KategorijaArtikla[] = []) {
        this.naziv = naz;
        this.potkategorije = pot;
        this.sifreArtikala = art;
    }
    naziv: string;
    sifreArtikala: number[];
    potkategorije: KategorijaArtikla[];
}