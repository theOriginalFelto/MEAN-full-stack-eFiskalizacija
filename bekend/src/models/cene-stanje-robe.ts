import mongoose from "mongoose";

const Schema = mongoose.Schema;

let CeneStanje = new Schema({
    sifraArtikla: {
        type: Number
    },
    nazivMagacina: {
        type: String
    },
    nabavnaCena: {
        type: Number
    },
    prodajnaCena: {
        type: Number
    },
    tekuceStanje: {
        type: Number
    },
    minimalnaZeljenaKolicina: {
        type: Number
    },
    maksimalnaZeljenaKolicina: {
        type: Number
    }
})

export default mongoose.model('CeneStanjeModel', CeneStanje, 'ceneStanjeRobe')