import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Racun } from '../models/racun';

@Injectable({
  providedIn: 'root'
})
export class RacunService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dodajRacun(racun: Racun) {
      const data = {
        racun: racun
      }
      return this.http.post(`${this.uri}/racuni/dodajRacun`, data)
  }

  dohvatiRacune(id) {
    return this.http.get(`${this.uri}/racuni/dohvatiRacune?param=${id}`)
  }
  dohvatiPetPosljednjihRacuna() {
    return this.http.get(`${this.uri}/racuni/dohvatiPetPosljednjihRacuna`)
  }
  dohvatiRacunePoBrojuLicneKarte(br) {
    return this.http.get(`${this.uri}/racuni/dohvatiRacunePoBrojuLicneKarte?param=${br}`)
  }
  dohvatiRacunePoDatumu(id, dan, mesec, godina) {
    return this.http.get(`${this.uri}/racuni/dohvatiRacunePoDatumu?id=${id}&dan=${dan}&mesec=${mesec}&godina=${godina}`)
  }
  dohvatiRacuneIzmedjuDatuma(datumOd, datumDo, id) {
    return this.http.get(`${this.uri}/racuni/dohvatiRacuneIzmedjuDatuma?d1=${datumOd}&d2=${datumDo}&id=${id}`)
  }
}
