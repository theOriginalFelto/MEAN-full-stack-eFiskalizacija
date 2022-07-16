import express from 'express'
import KorModel from '../models/korisnik'
import PredModel from '../models/preduzece'
import IdKorModel from '../models/idKor'
import NarModel from '../models/narucilac'
import AdminModel from '../models/admin'
import KupacModel from '../models/kupac'

export class UserController{
    i: number;
    errorFlag: boolean = false;

    prijava = (req: express.Request, res: express.Response)=>{
        let korIme = req.body.korIme;
        let lozinka = req.body.lozinka;

        KorModel.findOne({'korisnickoIme': korIme, 'lozinka': lozinka}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    prijavaAdmin = (req: express.Request, res: express.Response)=>{
        let korIme = req.body.korIme;
        let lozinka = req.body.lozinka;

        AdminModel.findOne({'korisnickoIme': korIme, 'lozinka': lozinka}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    registracija = async (req: express.Request, res: express.Response)=>{
        this.errorFlag = false;

        const imaEmail = await PredModel.exists({email: req.body.email});
        if (imaEmail) {
            res.json({"message": "vec ima email"});
            return;
        }
        const imaKorIme = await KorModel.exists({korisnickoIme: req.body.korIme});
        if (imaKorIme) {
            res.json({"message": "vec ima korIme"});
            return;
        }

        //dohvatanje ispravnog id-a
        IdKorModel.findOneAndUpdate({ime: "kor"}, {$inc: {id: 1}}, {returnOriginal: true}, (err, response) => {
            if(err) console.log(err);
            else {
                if(response) {
                    this.i = response.id;

                    let korisnik = new KorModel({
                        id: this.i,
                        korisnickoIme: req.body.korIme,
                        lozinka: req.body.lozinka,
                        ime: req.body.ime,
                        prezime: req.body.prezime,
                        telefon: req.body.telefon,
                        tip: req.body.tip,
                        aktivan: req.body.aktivan
                    })
                    
                    let preduzece = new PredModel({
                        id: this.i,
                        email: req.body.email,
                        naziv: req.body.naziv,
                        drzava: req.body.drzava,
                        grad: req.body.grad,
                        postanskiBroj: req.body.postanskiBroj,
                        ulica: req.body.ulica,
                        broj: req.body.broj,
                        PIB: req.body.PIB,
                        maticniBroj: req.body.maticniBroj,
                        kategorija: req.body.kategorija,
                        sifreDelatnosti: req.body.sifreDelatnosti,
                        ziroRacuni: req.body.ziroRacuni,
                        daLiJePDV: req.body.daLiJePDV,
                        brojMagacina: req.body.brojMagacina,
                        brojKasa: req.body.brojKasa,
                        slika: req.body.slika,
                        magacini: req.body.magacini,
                        kase: req.body.kase,
                        odjeljenja: req.body.odjeljenja,
                        kategorijeArtikala: []
                    })
            
                    korisnik.save((err, resp)=>{
                        if(err) {
                            this.errorFlag = true;
                        }
                        else {
                            preduzece.save((err, resp)=>{
                                if(err || this.errorFlag) {
                                    console.log("Error");
                                    res.status(400).json({"message": "error"})
                                }
                                else res.json({"message": "ok"})
                            })
                        }
                    })
                }
            }
        })
    }

    registracijaKupcaAdmin = async (req: express.Request, res: express.Response)=>{
        this.errorFlag = false;

        const imaKorIme = await KorModel.exists({korisnickoIme: req.body.korIme});
        if (imaKorIme) {
            res.json({"message": "vec ima korIme"});
            return;
        }
        const imaBrojLK = await KorModel.exists({brojLicneKarte: req.body.brojLicneKarteKupca});
        if (imaBrojLK) {
            res.json({"message": "vec ima brojLK"});
            return;
        }

        //dohvatanje ispravnog id-a
        IdKorModel.findOneAndUpdate({ime: "kor"}, {$inc: {id: 1}}, {returnOriginal: true}, (err, response) => {
            if(err) console.log(err);
            else {
                if(response) {
                    this.i = response.id;

                    let korisnik = new KorModel({
                        id: this.i,
                        korisnickoIme: req.body.korIme,
                        lozinka: req.body.lozinka,
                        ime: req.body.ime,
                        prezime: req.body.prezime,
                        telefon: req.body.telefon,
                        tip: req.body.tip,
                        aktivan: req.body.aktivan
                    })
                    
                    let kupac = new KupacModel({
                        id: this.i,
                        brojLicneKarte: req.body.brojLicneKarteKupca
                    })
            
                    korisnik.save((err, resp)=>{
                        if(err) {
                            this.errorFlag = true;
                        }
                        else {
                            kupac.save((err, resp)=>{
                                if(err || this.errorFlag) {
                                    console.log("Error");
                                    res.status(400).json({"message": "error"})
                                }
                                else res.json({"message": "ok"})
                            })
                        }
                    })
                }
            }
        })
    }

    registracijaPreduzecaAdmin = async (req: express.Request, res: express.Response)=>{
        this.errorFlag = false;

        const imaEmail = await PredModel.exists({email: req.body.email});
        if (imaEmail) {
            res.json({"message": "vec ima email"});
            return;
        }
        const imaKorIme = await KorModel.exists({korisnickoIme: req.body.korIme});
        if (imaKorIme) {
            res.json({"message": "vec ima korIme"});
            return;
        }

        //dohvatanje ispravnog id-a
        IdKorModel.findOneAndUpdate({ime: "kor"}, {$inc: {id: 1}}, {returnOriginal: true}, (err, response) => {
            if(err) console.log(err);
            else {
                if(response) {
                    this.i = response.id;

                    let korisnik = new KorModel({
                        id: this.i,
                        korisnickoIme: req.body.korIme,
                        lozinka: req.body.lozinka,
                        ime: req.body.ime,
                        prezime: req.body.prezime,
                        telefon: req.body.telefon,
                        tip: req.body.tip,
                        aktivan: req.body.aktivan
                    })
                    
                    let preduzece = new PredModel({
                        id: this.i,
                        email: req.body.email,
                        naziv: req.body.naziv,
                        drzava: req.body.drzava,
                        grad: req.body.grad,
                        postanskiBroj: req.body.postanskiBroj,
                        ulica: req.body.ulica,
                        broj: req.body.broj,
                        PIB: req.body.PIB,
                        maticniBroj: req.body.maticniBroj,
                        kategorija: req.body.kategorija,
                        sifreDelatnosti: req.body.sifreDelatnosti,
                        ziroRacuni: req.body.ziroRacuni,
                        daLiJePDV: req.body.daLiJePDV,
                        brojMagacina: req.body.brojMagacina,
                        brojKasa: req.body.brojKasa,
                        slika: req.body.slika,
                        magacini: req.body.magacini,
                        kase: req.body.kase,
                        odjeljenja: req.body.odjeljenja,
                        kategorijeArtikala: []
                    })
            
                    korisnik.save((err, resp)=>{
                        if(err) {
                            this.errorFlag = true;
                        }
                        else {
                            preduzece.save((err, resp)=>{
                                if(err || this.errorFlag) {
                                    console.log("Error");
                                    res.status(400).json({"message": "error"})
                                }
                                else res.json({"message": "ok"})
                            })
                        }
                    })
                }
            }
        })
    }

    registracijaNarucioca = async (req: express.Request, res: express.Response)=>{
        this.errorFlag = false;

        const imaEmail = await PredModel.exists({email: req.body.email});
        if (imaEmail) {
            res.json({"message": "vec ima email"});
            return;
        }
        const imaKorIme = await KorModel.exists({korisnickoIme: req.body.korIme});
        if (imaKorIme) {
            res.json({"message": "vec ima korIme"});
            return;
        }

        //dohvatanje ispravnog id-a
        IdKorModel.findOneAndUpdate({ime: "kor"}, {$inc: {id: 1}}, {returnOriginal: true}, (err, response) => {
            if(err) console.log(err);
            else {
                if(response) {
                    this.i = response.id;

                    let korisnik = new KorModel({
                        id: this.i,
                        korisnickoIme: req.body.korIme,
                        lozinka: req.body.lozinka,
                        ime: req.body.ime,
                        prezime: req.body.prezime,
                        telefon: req.body.telefon,
                        tip: req.body.tip,
                        aktivan: req.body.aktivan
                    })
                    
                    let preduzece = new PredModel({
                        id: this.i,
                        email: req.body.email,
                        naziv: req.body.naziv,
                        drzava: req.body.drzava,
                        grad: req.body.grad,
                        postanskiBroj: req.body.postanskiBroj,
                        ulica: req.body.ulica,
                        broj: req.body.broj,
                        PIB: req.body.PIB,
                        maticniBroj: req.body.maticniBroj,
                        kategorija: req.body.kategorija,
                        sifreDelatnosti: req.body.sifreDelatnosti,
                        ziroRacuni: req.body.ziroRacuni,
                        daLiJePDV: req.body.daLiJePDV,
                        brojMagacina: req.body.brojMagacina,
                        brojKasa: req.body.brojKasa,
                        slika: req.body.slika,
                        magacini: req.body.magacini,
                        kase: req.body.kase,
                        odjeljenja: req.body.odjeljenja,
                        kategorijeArtikala: []
                    })

                    let narucilac = new NarModel({
                        idPred: req.body.idPred,
                        idNarucilac: this.i,
                        brojDanaZaPlacanje: req.body.brojDanaZaPlacanje,
                        rabat: req.body.rabat
                    })
            
                    korisnik.save((err, resp)=>{
                        if(err) {
                            this.errorFlag = true;
                        }
                        else {
                            preduzece.save((err, resp)=>{
                                if(err || this.errorFlag) {
                                    this.errorFlag = true;
                                }
                                else {
                                    narucilac.save((err, resp) => {
                                        if(err || this.errorFlag) {
                                            console.log("Error");
                                            res.status(400).json({"message": "error"})
                                        }
                                        else res.json({"message": "ok"})
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    }
    registracijaNaruciocaPib = async (req: express.Request, res: express.Response)=>{
        let narPIB = req.body.narPIB;
        let idPred = req.body.idPred;

        const imaPIB = await PredModel.exists({PIB: narPIB});
        if (!imaPIB) {
            res.json({"message": "nema PIB"});
            return;
        }

        PredModel.findOne({"PIB": narPIB}, async (err, response) => {
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            } else {
                if(response) {
                    let idNarucilac = response.id;

                    const imaNar = await NarModel.exists({idPred: idPred, idNarucilac: idNarucilac});
                    if (imaNar) {
                        res.json({"message": "ima narucilac"});
                        return;
                    }

                    let narucilac = new NarModel({
                        idPred: idPred,
                        idNarucilac: idNarucilac,
                        brojDanaZaPlacanje: req.body.brojDanaZaPlacanjePIB,
                        rabat: req.body.rabatPIB
                    })
                    narucilac.save((err, resp) => {
                        if(err) {
                            console.log("Error");
                            res.status(400).json({"message": "error"})
                        }
                        else res.json({"message": "ok"})
                    })
                }
            }
        })
    }

    getPreduzece = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;

        PredModel.findOne({id: idK}, (err, pred) => {
            if(err) console.log(err);
            else res.json(pred);
        })
    }

    getPreduzecePoNazivu = (req: express.Request, res: express.Response) => {
        let naziv = req.query.param;

        PredModel.findOne({naziv: naziv}, (err, pred) => {
            if(err) console.log(err);
            else res.json(pred);
        })
    }

    getPreduzecePoPibu = (req: express.Request, res: express.Response) => {
        let pib = req.query.param;

        PredModel.findOne({PIB: pib}, (err, pred) => {
            if(err) console.log(err);
            else res.json(pred);
        })
    }

    dohvatiSvaPreduzeca = (req: express.Request, res: express.Response) => {
        PredModel.find({}, (err, pred) => {
            if(err) console.log(err);
            else res.json(pred);
        })
    }

    getKupac = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;

        KupacModel.findOne({id: idK}, (err, pred) => {
            if(err) console.log(err);
            else res.json(pred);
        })
    }

    dohvatiNeaktivnaPreduzeca = (req: express.Request, res: express.Response) => {
        let neaktivan = false;

        KorModel.find({"aktivan": neaktivan, "tip": "preduzece"}, (err, pred) => {
            if(err) console.log(err);
            else res.json(pred);
        })
    }

    dohvatiNarucioce = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;

        NarModel.find({id: idK}, (err, nar) => {
            if(err) console.log(err);
            else res.json(nar);
        })
    }

    getKorisnik = (req: express.Request, res: express.Response) => {
        let idK = req.query.param;

        KorModel.findOne({id: idK}, (err, kor) => {
            if(err) console.log(err);
            else res.json(kor);
        })
    }

    sacuvajOdjeljenje = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let odjeljenje = req.body.odjeljenje;

        PredModel.updateOne({"id": idK, odjeljenja: {$elemMatch: {naziv: odjeljenje.naziv}}}, 
        {$set: {"odjeljenja.$.stolovi": odjeljenje.stolovi}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    dodajOdjeljenje = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let odjeljenje = req.body.odjeljenje;

        PredModel.updateOne({"id": idK}, {$push: {"odjeljenja": odjeljenje}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    promjenaLozinke = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let nova = req.body.novaLozinka;

        KorModel.updateOne({"id": idK}, {$set: {"lozinka": nova}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    aktivirajKorisnika = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let aktivan = true;

        KorModel.updateOne({"id": idK}, {$set: {"aktivan": aktivan}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    obrisiKorisnika = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;

        KorModel.deleteOne({"id": idK}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    obrisiPreduzece = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;

        PredModel.deleteOne({"id": idK}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    promjenaLozinkeAdmin = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;
        let nova = req.body.novaLozinka;

        AdminModel.updateOne({"korisnickoIme": korIme}, {$set: {"lozinka": nova}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    dodajPodatke = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let kat = req.body.formKategorija;
        let pdv = req.body.formIsPdv;
        let sifre = req.body.sifreDjelatnosti;
        let racuni = req.body.ziroRacuni;
        let brKasa = req.body.formBrKasa;
        let brMag = req.body.formBrMag;

        PredModel.findOneAndUpdate({"id": idK}, {$set: {"kategorija": kat, "daLiJePDV": pdv, "sifreDelatnosti": sifre,
        "ziroRacuni": racuni, "brojMagacina": brMag, "brojKasa": brKasa}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    //promjene podataka
    promjenaKorIme = async (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.novoKorIme;

        const imaKorIme = await KorModel.exists({korisnickoIme: novo});
        if (imaKorIme) {
            res.json({"message": "vec ima korIme"});
            return;
        }

        KorModel.updateOne({"id": idK}, {$set: {"korisnickoIme": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaIme = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.novoIme;

        KorModel.updateOne({"id": idK}, {$set: {"ime": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaPrezime = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.novoPrezime;

        KorModel.updateOne({"id": idK}, {$set: {"prezime": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaTelefon = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviTelefon;

        KorModel.updateOne({"id": idK}, {$set: {"telefon": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaEmail = async (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviEmail;

        const imaEmail = await PredModel.exists({email: novo});
        if (imaEmail) {
            res.json({"message": "vec ima email"});
            return;
        }

        PredModel.updateOne({"id": idK}, {$set: {"email": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaNaziv = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviNaziv;

        PredModel.updateOne({"id": idK}, {$set: {"naziv": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaDrzava = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.novaDrzava;

        PredModel.updateOne({"id": idK}, {$set: {"drzava": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaGrad = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviGrad;

        PredModel.updateOne({"id": idK}, {$set: {"grad": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaPbr = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviPbr;

        PredModel.updateOne({"id": idK}, {$set: {"postanskiBroj": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaUlica = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.novaUlica;

        PredModel.updateOne({"id": idK}, {$set: {"ulica": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaBroj = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviBroj;

        PredModel.updateOne({"id": idK}, {$set: {"broj": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaPIB = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviPIB;

        PredModel.updateOne({"id": idK}, {$set: {"PIB": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaMB = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviMB;

        PredModel.updateOne({"id": idK}, {$set: {"maticniBroj": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaKategorija = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.novaKategorija;

        PredModel.updateOne({"id": idK}, {$set: {"kategorija": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaSifriDj = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noveSifreDjelatnosti;

        PredModel.updateOne({"id": idK}, {$set: {"sifreDelatnosti": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaBrojMagacina = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviBrojMagacina;

        PredModel.updateOne({"id": idK}, {$set: {"brojMagacina": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }
    promjenaBrojKasa = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let novo = req.body.noviBrojKasa;

        PredModel.updateOne({"id": idK}, {$set: {"brojKasa": novo}}, (err, kor) => {
            if(err) {
                console.log("Error");
                res.status(400).json({"message": "error"})
            }
            else res.json({"message": "ok"})
        })
    }

    //žiro računi
    brisiZiroRacun = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let racun = req.body.racun;

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK}, {$pull: {'ziroRacuni': racun}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }
    dodajZiroRacun = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let racun = req.body.racun;

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK}, {$push: {'ziroRacuni': racun}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }

    //magacini i kase
    brisiMagacin = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let magacin = req.body.magacin;

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK}, {$pull: {'magacini': magacin}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }
    dodajMagacin = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let magacin = req.body.magacin;

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK}, {$push: {'magacini': magacin}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }
    brisiKasu = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let kasa = req.body.kasa;

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK}, {$pull: {'kase': kasa}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }
    dodajKasu = (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let kasa = req.body.kasa;

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK}, {$push: {'kase': kasa}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }

    ubaciKategorijuArtikla = async (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let kat = req.body.kat;

        const imaKat = await PredModel.exists({id: idK, kategorijeArtikala: {$elemMatch: {naziv: kat.naziv}}});
        if (imaKat) {
            res.json({"message": "ima kat"});
            return;
        }

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK}, {$push: {'kategorijeArtikala': kat}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }
    ubaciPotkategorijuArtikla = async (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let kat = req.body.kat;

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK, kategorijeArtikala: {$elemMatch: {naziv: kat.naziv}}}, 
                    {$set: {"kategorijeArtikala.$.potkategorije": kat.potkategorije}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }
    dodajKategorijuArtikluFinalno = async (req: express.Request, res: express.Response) => {
        let idK = req.body.id;
        let kat = req.body.kategorija;

        PredModel.findOne({"id": idK}, (err, pred)=>{
            if(err) console.log(err)
            else {
                if(pred){
                    PredModel.updateOne({"id": idK, kategorijeArtikala: {$elemMatch: {naziv: kat.naziv}}}, 
                    {$set: {"kategorijeArtikala.$.naziv": kat.naziv, "kategorijeArtikala.$.sifreArtikala": kat.sifreArtikala,
                    "kategorijeArtikala.$.potkategorije": kat.potkategorije}}, (err, resp)=>{
                        if(err) console.log(err)
                        else {
                            res.json({'message': 'ok'})
                        }
                    })
                }
                else{
                    res.json({'message':'error'})
                }
            }
        })
    }
}