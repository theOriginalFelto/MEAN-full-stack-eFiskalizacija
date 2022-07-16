import { Kasa } from "./kasa";
import { KategorijaArtikla } from "./kategorija-artikla";
import { Magacin } from "./magacin";
import { Odjeljenje } from "./odjeljenje";

export class Preduzece{
    id: number;
    email: string;
    naziv: string;
    drzava: string;
    grad: string;
    postanskiBroj: string;
    ulica: string;
    broj: string;
    PIB: string;
    maticniBroj: string;
    kategorija: string;
    sifreDelatnosti: string[];
    ziroRacuni: string[];
    daLiJePDV: boolean;
    brojMagacina: number;
    brojKasa: number;
    slika: string;
    magacini: Magacin[];
    kase: Kasa[];
    kategorijeArtikala: KategorijaArtikla[];
    odjeljenja: Odjeljenje[];
}