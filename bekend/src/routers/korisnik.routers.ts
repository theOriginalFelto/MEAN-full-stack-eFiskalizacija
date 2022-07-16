import express from 'express'
import { UserController } from '../controllers/korisnik.controller';

const korRouter = express.Router();

korRouter.route('/prijava').post(
    (req, res)=>new UserController().prijava(req, res)
)

korRouter.route('/prijavaAdmin').post(
    (req, res)=>new UserController().prijavaAdmin(req, res)
)

korRouter.route('/registracija').post(
    (req, res)=>new UserController().registracija(req, res)
)

korRouter.route('/registracijaKupcaAdmin').post(
    (req, res)=>new UserController().registracijaKupcaAdmin(req, res)
)

korRouter.route('/registracijaPreduzecaAdmin').post(
    (req, res)=>new UserController().registracijaPreduzecaAdmin(req, res)
)

korRouter.route('/registracijaNarucioca').post(
    (req, res)=>new UserController().registracijaNarucioca(req, res)
)

korRouter.route('/registracijaNaruciocaPib').post(
    (req, res)=>new UserController().registracijaNaruciocaPib(req, res)
)

korRouter.route('/getPreduzece').get(
    (req, res)=>new UserController().getPreduzece(req, res)
)

korRouter.route('/getPreduzecePoNazivu').get(
    (req, res)=>new UserController().getPreduzecePoNazivu(req, res)
)

korRouter.route('/getPreduzecePoPibu').get(
    (req, res)=>new UserController().getPreduzecePoPibu(req, res)
)

korRouter.route('/dohvatiSvaPreduzeca').get(
    (req, res)=>new UserController().dohvatiSvaPreduzeca(req, res)
)

korRouter.route('/getKupac').get(
    (req, res)=>new UserController().getKupac(req, res)
)

korRouter.route('/dohvatiNeaktivnaPreduzeca').get(
    (req, res)=>new UserController().dohvatiNeaktivnaPreduzeca(req, res)
)

korRouter.route('/dohvatiNarucioce').get(
    (req, res)=>new UserController().dohvatiNarucioce(req, res)
)

korRouter.route('/getKorisnik').get(
    (req, res)=>new UserController().getKorisnik(req, res)
)

korRouter.route('/sacuvajOdjeljenje').post(
    (req, res)=>new UserController().sacuvajOdjeljenje(req, res)
)

korRouter.route('/dodajOdjeljenje').post(
    (req, res)=>new UserController().dodajOdjeljenje(req, res)
)

korRouter.route('/promjenaLozinke').post(
    (req, res)=>new UserController().promjenaLozinke(req, res)
)

korRouter.route('/aktivirajKorisnika').post(
    (req, res)=>new UserController().aktivirajKorisnika(req, res)
)

korRouter.route('/obrisiKorisnika').post(
    (req, res)=>new UserController().obrisiKorisnika(req, res)
)

korRouter.route('/obrisiPreduzece').post(
    (req, res)=>new UserController().obrisiPreduzece(req, res)
)

korRouter.route('/promjenaLozinkeAdmin').post(
    (req, res)=>new UserController().promjenaLozinkeAdmin(req, res)
)

korRouter.route('/dodajPodatke').post(
    (req, res)=>new UserController().dodajPodatke(req, res)
)

//promjene podataka
korRouter.route('/promjenaKorIme').post(
    (req, res)=>new UserController().promjenaKorIme(req, res)
)
korRouter.route('/promjenaIme').post(
    (req, res)=>new UserController().promjenaIme(req, res)
)
korRouter.route('/promjenaPrezime').post(
    (req, res)=>new UserController().promjenaPrezime(req, res)
)
korRouter.route('/promjenaTelefon').post(
    (req, res)=>new UserController().promjenaTelefon(req, res)
)
korRouter.route('/promjenaEmail').post(
    (req, res)=>new UserController().promjenaEmail(req, res)
)
korRouter.route('/promjenaNaziv').post(
    (req, res)=>new UserController().promjenaNaziv(req, res)
)
korRouter.route('/promjenaDrzava').post(
    (req, res)=>new UserController().promjenaDrzava(req, res)
)
korRouter.route('/promjenaGrad').post(
    (req, res)=>new UserController().promjenaGrad(req, res)
)
korRouter.route('/promjenaPbr').post(
    (req, res)=>new UserController().promjenaPbr(req, res)
)
korRouter.route('/promjenaUlica').post(
    (req, res)=>new UserController().promjenaUlica(req, res)
)
korRouter.route('/promjenaBroj').post(
    (req, res)=>new UserController().promjenaBroj(req, res)
)
korRouter.route('/promjenaPIB').post(
    (req, res)=>new UserController().promjenaPIB(req, res)
)
korRouter.route('/promjenaMB').post(
    (req, res)=>new UserController().promjenaMB(req, res)
)
korRouter.route('/promjenaKategorija').post(
    (req, res)=>new UserController().promjenaKategorija(req, res)
)
korRouter.route('/promjenaSifriDj').post(
    (req, res)=>new UserController().promjenaSifriDj(req, res)
)
korRouter.route('/promjenaBrojMagacina').post(
    (req, res)=>new UserController().promjenaBrojMagacina(req, res)
)
korRouter.route('/promjenaBrojKasa').post(
    (req, res)=>new UserController().promjenaBrojKasa(req, res)
)
//žiro računi
korRouter.route('/brisiZiroRacun').post(
    (req, res)=>new UserController().brisiZiroRacun(req, res)
)
korRouter.route('/dodajZiroRacun').post(
    (req, res)=>new UserController().dodajZiroRacun(req, res)
)
//kase i magacini
korRouter.route('/brisiMagacin').post(
    (req, res)=>new UserController().brisiMagacin(req, res)
)
korRouter.route('/dodajMagacin').post(
    (req, res)=>new UserController().dodajMagacin(req, res)
)
korRouter.route('/brisiKasu').post(
    (req, res)=>new UserController().brisiKasu(req, res)
)
korRouter.route('/dodajKasu').post(
    (req, res)=>new UserController().dodajKasu(req, res)
)

korRouter.route('/ubaciKategorijuArtikla').post(
    (req, res)=>new UserController().ubaciKategorijuArtikla(req, res)
)
korRouter.route('/ubaciPotkategorijuArtikla').post(
    (req, res)=>new UserController().ubaciPotkategorijuArtikla(req, res)
)
korRouter.route('/dodajKategorijuArtikluFinalno').post(
    (req, res)=>new UserController().dodajKategorijuArtikluFinalno(req, res)
)

export default korRouter;