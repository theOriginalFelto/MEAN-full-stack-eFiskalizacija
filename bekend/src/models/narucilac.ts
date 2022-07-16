import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Nar = new Schema({
    idPred: {
        type: Number
    },
    idNarucilac: {
        type: Number
    },
    brojDanaZaPlacanje: {
        type: Number
    },
    rabat: {
        type: Number
    }
})

export default mongoose.model('NarModel', Nar, 'narucioci')