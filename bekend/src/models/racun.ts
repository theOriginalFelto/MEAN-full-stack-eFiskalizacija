import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Rac = new Schema({
    idPred: {
        type: Number
    },
    nazivPred: {
        type: String
    },
    datum: {
        type: Date
    },
    dan: {
        type: Number
    },
    mesec: {
        type: Number
    },
    godina: {
        type: Number
    },
    ukupanIznos: {
        type: Number
    },
    iznosPDV: {
        type: Number
    },
    stavke: {
        type: Array
    },
    brojLicneKarteKupca: {
        type: Number
    },
    pibNarucioca: {
        type: String
    },
    nacinPlacanja: {
        type: String
    },
    gradIzdavanja: {
        type: String
    },
    ulicaIzdavanja: {
        type: String
    },
    brojIzdavanja: {
        type: String
    }
})

export default mongoose.model('RacModel', Rac, 'racuni')