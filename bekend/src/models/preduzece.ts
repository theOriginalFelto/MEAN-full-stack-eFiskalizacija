import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Preduzece = new Schema({
    id: {
        type: Number
    },
    email: {
        type: String
    },
    naziv: {
        type: String
    },
    drzava: {
        type: String
    },
    grad: {
        type: String
    },
    postanskiBroj: {
        type: String
    },
    ulica: {
        type: String
    },
    broj: {
        type: String
    },
    PIB: {
        type: String
    },
    maticniBroj: {
        type: String
    },
    kategorija: {
        type: String
    },
    sifreDelatnosti: {
        type: Array
    },
    ziroRacuni: {
        type: Array
    },
    daLiJePDV: {
        type: Boolean
    },
    brojMagacina: {
        type: Number
    },
    brojKasa: {
        type: Number
    },
    slika: {
        type: String
    },
    magacini: {
        type: Array
    },
    kase: {
        type: Array
    },
    kategorijeArtikala: {
        type: Array
    },
    odjeljenja: {
        type: Array
    },
})

export default mongoose.model('PredModel', Preduzece, 'preduzeca')