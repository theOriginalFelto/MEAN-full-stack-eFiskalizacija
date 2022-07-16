import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    id: {
        type: Number
    },
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    telefon: {
        type: String
    },
    tip: {
        type: String
    },
    aktivan: {
        type: Boolean
    }
})

export default mongoose.model('KorModel', Korisnik, 'korisnici')