import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Kupac = new Schema({
    id: {
        type: Number
    },
    brojLicneKarte: {
        type: String
    }
})

export default mongoose.model('KupacModel', Kupac, 'kupci')