import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Sto = new Schema({
    tip: {
        type: String
    },
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    sirina: {
        type: Number
    },
    visina: {
        type: Number
    },
    poluprecnik: {
        type: Number
    }
})

export default mongoose.model('StoModel', Sto, 'stolovi')