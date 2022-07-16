import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import korRouter from './routers/korisnik.routers';
import artRouter from './routers/artikli.routes';
import racRouter from './routers/racuni.routes';
//import artRouter from './routers/artikli.routes';

const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/fiskalizacija2022')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/korisnici', korRouter)
router.use('/artikli', artRouter)
router.use('/racuni', racRouter)
//router.use('/artikli', artRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));