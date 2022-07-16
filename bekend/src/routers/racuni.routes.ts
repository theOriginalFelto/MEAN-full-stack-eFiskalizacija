import express from 'express'
import { RacController } from '../controllers/racun.controller';

const racRouter = express.Router();

racRouter.route('/dodajRacun').post(
    (req, res)=>new RacController().dodajRacun(req, res)
)
racRouter.route('/dohvatiRacune').get(
    (req, res)=>new RacController().dohvatiRacune(req, res)
)
racRouter.route('/dohvatiPetPosljednjihRacuna').get(
    (req, res)=>new RacController().dohvatiPetPosljednjihRacuna(req, res)
)
racRouter.route('/dohvatiRacunePoBrojuLicneKarte').get(
    (req, res)=>new RacController().dohvatiRacunePoBrojuLicneKarte(req, res)
)
racRouter.route('/dohvatiRacuneIzmedjuDatuma').get(
    (req, res)=>new RacController().dohvatiRacuneIzmedjuDatuma(req, res)
)
racRouter.route('/dohvatiRacunePoDatumu').get(
    (req, res)=>new RacController().dohvatiRacunePoDatumu(req, res)
)

export default racRouter;