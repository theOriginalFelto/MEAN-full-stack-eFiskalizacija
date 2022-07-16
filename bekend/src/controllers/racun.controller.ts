import express from 'express'
import RacModel from '../models/racun'

export class RacController{

    dodajRacun = async (req: express.Request, res: express.Response) => {
        let rac = req.body.racun;

        let racun = new RacModel({
            idPred: rac.idPred,
            nazivPred: rac.nazivPred,
            datum: rac.datum,
            dan: rac.dan,
            mesec: rac.mesec,
            godina: rac.godina,
            ukupanIznos: rac.ukupanIznos,
            iznosPDV: rac.iznosPDV,
            stavke: rac.stavke,
            brojLicneKarteKupca: rac.brojLicneKarteKupca,
            pibNarucioca: rac.pibNarucioca,
            nacinPlacanja: rac.nacinPlacanja,
            gradIzdavanja: rac.gradIzdavanja,
            ulicaIzdavanja: rac.ulicaIzdavanja,
            brojIzdavanja: rac.brojIzdavanja
        })
        racun.save((err, resp) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    dohvatiRacune = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;

        RacModel.find({idPred: idK}, (err, rac) => {
            if(err) console.log(err);
            else res.json(rac);
        })
    }
    dohvatiPetPosljednjihRacuna = async (req: express.Request, res: express.Response) => {
        try{
            let racuni = await RacModel.find({}).sort({datum: -1}).limit(5);
            res.json(racuni);
        } catch(err) {
            console.log(err);
        }
    }
    dohvatiRacunePoBrojuLicneKarte = (req: express.Request, res: express.Response) => {
        let br = req.query.param;

        RacModel.find({brojLicneKarteKupca: br}, (err, rac) => {
            if(err) console.log(err);
            else res.json(rac);
        })
    }
    dohvatiRacuneIzmedjuDatuma = (req: express.Request, res: express.Response) => {
        let datumOd = req.query.d1;
        let datumDo = req.query.d2;
        let id = req.query.id;

        if (Number.parseInt(id.toString()) > 0) {
            if(datumOd!=datumDo) {
                RacModel.find({idPred: id, datum: {$gte: datumOd, $lte: datumDo}}, (err, rac) => {
                    if(err) console.log(err);
                    else res.json(rac);
                });
            } else {
                let a = new Date(datumOd.toString());
                let dan = a.getDate();
                let mesec = a.getMonth() + 1;
                let godina = a.getFullYear();
                RacModel.find({idPred: id, dan: dan, mesec: mesec, godina: godina}, (err, rac) => {
                    if(err) console.log(err);
                    else res.json(rac);
                });
            }
        }
        else {
            if(datumOd!=datumDo) {
                RacModel.find({datum: {$gte: datumOd, $lte: datumDo}}, (err, rac) => {
                    if(err) console.log(err);
                    else res.json(rac);
                });
            } else {
                let a = new Date(datumOd.toString());
                let dan = a.getDate();
                let mesec = a.getMonth() + 1;
                let godina = a.getFullYear();
                RacModel.find({dan: dan, mesec: mesec, godina: godina}, (err, rac) => {
                    if(err) console.log(err);
                    else res.json(rac);
                });
            }
        }
        // sa agregatnom sumom, nije radilo
        /*if (Number.parseInt(id.toString()) > 0) {
            if(datumOd!=datumDo) {
                RacModel.aggregate([{$match: {idPred: id, datum: {$gte: datumOd, $lte: datumDo}}},
                    {$group: { _id: "$idPred", sumaIznos: {$sum: "$ukupanIznos"}, sumaPDV: {$sum: "$iznosPDV"}}}], (err, rac) => {
                    if(err) console.log(err);
                    else res.json(rac);
                });
            } else {
                let a = new Date(datumOd.toString());
                let dan = a.getDate();
                let mesec = a.getMonth() + 1;
                let godina = a.getFullYear();
                RacModel.aggregate([{$match: {idPred: id, dan: dan, mesec: mesec, godina: godina}},
                    {$group: { _id: "$idPred", sumaIznos: {$sum: "$ukupanIznos"}, sumaPDV: {$sum: "$iznosPDV"}}}], (err, rac) => {
                    if(err) console.log(err);
                    else res.json(rac);
                });
            }
        }
        else {
            if(datumOd!=datumDo) {
                RacModel.aggregate([{$match: {datum: {$gte: datumOd, $lte: datumDo}}},
                    {$group: { _id: "$idPred", sumaIznos: {$sum: "$ukupanIznos"}, sumaPDV: {$sum: "$iznosPDV"}}}], (err, rac) => {
                    if(err) console.log(err);
                    else res.json(rac);
                });
            } else {
                let a = new Date(datumOd.toString());
                let dan = a.getDate();
                let mesec = a.getMonth() + 1;
                let godina = a.getFullYear();
                RacModel.aggregate([{$match: {dan: dan, mesec: mesec, godina: godina}},
                    {$group: { _id: "$idPred", sumaIznos: {$sum: "$ukupanIznos"}, sumaPDV: {$sum: "$iznosPDV"}}}], (err, rac) => {
                    if(err) console.log(err);
                    else res.json(rac);
                });
            }
        }*/
    }
    dohvatiRacunePoDatumu = (req: express.Request, res: express.Response) => {
        let idK = req.query.id;
        let dan = req.query.dan;
        let mesec = req.query.mesec;
        let godina = req.query.godina;

        RacModel.find({idPred: idK, dan: dan, mesec: mesec, godina: godina}, (err, rac) => {
            if(err) console.log(err);
            else res.json(rac);
        })
    }
}