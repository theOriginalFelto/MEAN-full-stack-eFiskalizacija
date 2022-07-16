import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Kor = new Schema({
    id: {
        type: Number
    }
})

export default mongoose.model('IdKorModel', Kor, 'idKor')