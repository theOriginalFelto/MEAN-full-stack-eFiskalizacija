import express from 'express'
import ArtModel from '../models/artikal'
import CeneStanjeModel from '../models/cene-stanje-robe'

export class ArtController{

    dohvatiSveArtikle = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;

        ArtModel.find({idPred: idK}, (err, art) => {
            if(err) console.log(err);
            else res.json(art);
        })
    }
    dohvatiSveArtikleBezKategorije = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;

        ArtModel.find({idPred: idK, dodeljenaKategorija: false}, (err, art) => {
            if(err) console.log(err);
            else res.json(art);
        })
    }
    dohvatiSveArtiklePoNazivuBezKategorije = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;
        let naziv = req.query.paramNaziv;

        ArtModel.find({idPred: idK, naziv: {$regex: naziv}, dodeljenaKategorija: false}, (err, art) => {
            if(err) console.log(err);
            else res.json(art);
        })
    }
    dohvatiSveArtiklePoNazivu = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;
        let naziv = req.query.paramNaziv;

        ArtModel.find({idPred: idK, naziv: {$regex: naziv}}, (err, art) => {
            if(err) console.log(err);
            else res.json(art);
        })
    }
    dohvatiArtikleIzMagacina = (req: express.Request, res: express.Response) => {
        let sifraArtikla = req.query.param;

        CeneStanjeModel.find({sifraArtikla: sifraArtikla}, (err, art) => {
            if(err) console.log(err);
            else res.json(art);
        })
    }
    dodajArtikal = async (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let sifra = req.body.novaSifra;

        const imaArtikal = await ArtModel.exists({"idPred": idK, "sifra": sifra});
        if (imaArtikal) {
            res.json({"message": "vec ima sifra"});
            return;
        }

        let artikal = new ArtModel({
            idPred: idK,
            sifra: sifra,
            naziv: req.body.noviNaziv,
            jedinicaMere: req.body.novaJedMjere,
            stopaPoreza: req.body.novaPoreskaStopa,
            proizvodjac: req.body.noviProizvodjac,
            tip: req.body.noviTip,
            zemljaPorekla: req.body.novaZemljaPorijekla,
            straniNaziv: req.body.noviStraniNaziv,
            barkod: req.body.noviBarkod,
            carinskaTarifa: req.body.novaCarinskaTarifa,
            ekoTaksa: req.body.novaEkoTaksa,
            akcize: req.body.noveAkcize,
            minimalneZeljeneZalihe: req.body.noveMinimalneZalihe,
            maksimalneZeljeneZalihe: req.body.noveMaksimalneZalihe,
            opis: req.body.noviOpis,
            deklaracija: req.body.novaDeklaracija,
            slika: req.body.slika,
            dodeljenaKategorija: false
        })
        artikal.save((err, resp) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    brisiArtikal = async (req: express.Request, res: express.Response) => {
        let idK = req.body.idPred;
        let sifra = req.body.sifra;

        ArtModel.findOneAndDelete({"idPred": idK, "sifra": sifra}, (err, resp) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    izmijeniArtikal = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let sifra = req.body.izmjenaSifra;

        let naziv = req.body.izmjenaNaziv;
        let jedinicaMere = req.body.izmjenaJedMjere;
        let stopaPoreza = req.body.izmjenaPoreskaStopa;
        let proizvodjac = req.body.izmjenaProizvodjac;
        let tip = req.body.izmjenaTip;
        let zemljaPorekla = req.body.izmjenaZemljaPorijekla;
        let straniNaziv = req.body.izmjenaStraniNaziv;
        let barkod = req.body.izmjenaBarkod;
        let carinskaTarifa = req.body.izmjenaCarinskaTarifa;
        let ekoTaksa = req.body.izmjenaEkoTaksa;
        let akcize = req.body.izmjenaAkcize;
        let minimalneZeljeneZalihe = req.body.izmjenaMinimalneZalihe;
        let maksimalneZeljeneZalihe = req.body.izmjenaMaksimalneZalihe;
        let opis = req.body.izmjenaOpis;
        let deklaracija = req.body.izmjenaDeklaracija;
        let slika = req.body.izmjenaSlika;

        ArtModel.findOneAndUpdate({"idPred": idK, "sifra": sifra}, {sifra: sifra, naziv: naziv, jedinicaMere: jedinicaMere,
        stopaPoreza: stopaPoreza, proizvodjac: proizvodjac, tip: tip, zemljaPorekla: zemljaPorekla, straniNaziv: straniNaziv,
        barkod: barkod, carinskaTarifa: carinskaTarifa, ekoTaksa: ekoTaksa, akcize: akcize, minimalneZeljeneZalihe: minimalneZeljeneZalihe,
        maksimalneZeljeneZalihe: maksimalneZeljeneZalihe, opis: opis, deklaracija: deklaracija, slika: slika}, (err, resp) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    azurirajDodavanjeKategorije = (req: express.Request, res: express.Response) => {
        let idK = req.body.idPred;
        let sifra = req.body.sifra;

        ArtModel.updateOne({"idPred": idK, "sifra": sifra}, {dodeljenaKategorija: true}, (err, resp) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    azurirajStanjeArtiklaUMagacinu = (req: express.Request, res: express.Response) => {
        let artUMag = req.body.art;
        let kolicina = req.body.kol;

        CeneStanjeModel.updateOne({"sifraArtikla": artUMag.sifraArtikla, "nazivMagacina": artUMag.nazivMagacina}, 
        {$inc: {tekuceStanje: -kolicina}}, (err, resp) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
}