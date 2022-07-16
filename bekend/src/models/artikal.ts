import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Artikal = new Schema({
    idPred: {
        type: Number
    },
    sifra: {
        type: Number
    },
    naziv: {
        type: String
    },
    jedinicaMere: {
        type: String
    },
    stopaPoreza: {
        type: Number
    },
    proizvodjac: {
        type: String
    },
    tip: {
        type: String
    },
    zemljaPorekla: {
        type: String
    },
    straniNaziv: {
        type: String
    },
    barkod: {
        type: Number
    },
    carinskaTarifa: {
        type: Number
    },
    ekoTaksa: {
        type: Boolean
    },
    akcize: {
        type: Boolean
    },
    minimalneZeljeneZalihe: {
        type: Number
    },
    maksimalneZeljeneZalihe: {
        type: Number
    },
    opis: {
        type: String
    },
    deklaracija: {
        type: String
    },
    slika: {
        type: String
    },
    dodeljenaKategorija: {
        type: Boolean
    }
})

export default mongoose.model('ArtModel', Artikal, 'artikli')