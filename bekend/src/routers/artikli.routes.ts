import express from 'express'
import { ArtController } from '../controllers/artikal.controller';

const artRouter = express.Router();

artRouter.route('/dohvatiSveArtikle').get(
    (req, res)=>new ArtController().dohvatiSveArtikle(req, res)
)
artRouter.route('/dohvatiSveArtikleBezKategorije').get(
    (req, res)=>new ArtController().dohvatiSveArtikleBezKategorije(req, res)
)
artRouter.route('/dohvatiSveArtiklePoNazivuBezKategorije').get(
    (req, res)=>new ArtController().dohvatiSveArtiklePoNazivuBezKategorije(req, res)
)
artRouter.route('/dohvatiSveArtiklePoNazivu').get(
    (req, res)=>new ArtController().dohvatiSveArtiklePoNazivu(req, res)
)
artRouter.route('/dohvatiArtikleIzMagacina').get(
    (req, res)=>new ArtController().dohvatiArtikleIzMagacina(req, res)
)
artRouter.route('/dodajArtikal').post(
    (req, res)=>new ArtController().dodajArtikal(req, res)
)
artRouter.route('/brisiArtikal').post(
    (req, res)=>new ArtController().brisiArtikal(req, res)
)
artRouter.route('/izmijeniArtikal').post(
    (req, res)=>new ArtController().izmijeniArtikal(req, res)
)
artRouter.route('/azurirajDodavanjeKategorije').post(
    (req, res)=>new ArtController().azurirajDodavanjeKategorije(req, res)
)
artRouter.route('/azurirajStanjeArtiklaUMagacinu').post(
    (req, res)=>new ArtController().azurirajStanjeArtiklaUMagacinu(req, res)
)

export default artRouter;