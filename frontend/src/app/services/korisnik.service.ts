import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  prijava(usernameFromForm, passwordFromForm){
    const data = {
      korIme: usernameFromForm,
      lozinka: passwordFromForm
    }

    return this.http.post(`${this.uri}/korisnici/prijava`, data)
  }

  prijavaAdmin(korIme, lozinka){
    const data = {
      korIme: korIme,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnici/prijavaAdmin`, data)
  }

  registracija(ime, prezime, korIme, lozinka, telefon, email, 
    naziv, drzava, grad, postanskiBroj, ulica, broj, PIB, maticniBroj, slika){

    const data = {
      ime: ime,
      prezime: prezime,
      korIme: korIme,
      lozinka: lozinka,
      telefon: telefon,
      tip: "preduzece",
      email: email,
      naziv: naziv,
      drzava: drzava,
      grad: grad,
      postanskiBroj: postanskiBroj,
      ulica: ulica,
      broj: broj,
      PIB: PIB,
      maticniBroj: maticniBroj,
      kategorija: "",
      sifreDelatnosti: [],
      ziroRacuni: [],
      daLiJePDV: false,
      brojMagacina: 1,
      brojKasa: 1,
      aktivan: false,
      slika: slika,
      magacini: [],
      kase: [],
      odjeljenja: [],
    }

    return this.http.post(`${this.uri}/korisnici/registracija`, data)
  }

  registracijaKupcaAdmin(imeKupca, prezimeKupca, korImeKupca, lozinkaKupca,
    telefonKupca, brojLicneKarteKupca){

    const data = {
      ime: imeKupca,
      prezime: prezimeKupca,
      korIme: korImeKupca,
      lozinka: lozinkaKupca,
      telefon: telefonKupca,
      tip: "kupac",
      aktivan: true,
      brojLicneKarteKupca: brojLicneKarteKupca
    }

    return this.http.post(`${this.uri}/korisnici/registracijaKupcaAdmin`, data)
  }

  registracijaPreduzecaAdmin(ime, prezime, korIme, lozinka, telefon, email, 
    naziv, drzava, grad, postanskiBroj, ulica, broj, PIB, maticniBroj, slika){

    const data = {
      ime: ime,
      prezime: prezime,
      korIme: korIme,
      lozinka: lozinka,
      telefon: telefon,
      tip: "preduzece",
      email: email,
      naziv: naziv,
      drzava: drzava,
      grad: grad,
      postanskiBroj: postanskiBroj,
      ulica: ulica,
      broj: broj,
      PIB: PIB,
      maticniBroj: maticniBroj,
      kategorija: "",
      sifreDelatnosti: [],
      ziroRacuni: [],
      daLiJePDV: false,
      brojMagacina: 1,
      brojKasa: 1,
      aktivan: true,
      slika: slika,
      magacini: [],
      kase: [],
      odjeljenja: [],
    }

    return this.http.post(`${this.uri}/korisnici/registracijaPreduzecaAdmin`, data)
  }

  registracijaNarucioca(ime, prezime, korIme, lozinka, telefon, email, 
    naziv, drzava, grad, postanskiBroj, ulica, broj, PIB, maticniBroj, slika, idPred, brojDanaZaPlacanje, rabat){

    const data = {
      ime: ime,
      prezime: prezime,
      korIme: korIme,
      lozinka: lozinka,
      telefon: telefon,
      tip: "preduzece",
      email: email,
      naziv: naziv,
      drzava: drzava,
      grad: grad,
      postanskiBroj: postanskiBroj,
      ulica: ulica,
      broj: broj,
      PIB: PIB,
      maticniBroj: maticniBroj,
      kategorija: "",
      sifreDelatnosti: [],
      ziroRacuni: [],
      daLiJePDV: false,
      brojMagacina: 1,
      brojKasa: 1,
      aktivan: false,
      slika: slika,
      magacini: [],
      kase: [],
      odjeljenja: [],
      idPred: idPred,
      brojDanaZaPlacanje: brojDanaZaPlacanje,
      rabat: rabat
    }

    return this.http.post(`${this.uri}/korisnici/registracijaNarucioca`, data)
  }

  registracijaNaruciocaPib(narPIB, idPred, brojDanaZaPlacanjePIB, rabatPIB){
    const data = {
      narPIB: narPIB,
      idPred: idPred,
      brojDanaZaPlacanjePIB: brojDanaZaPlacanjePIB,
      rabatPIB: rabatPIB
    }

    return this.http.post(`${this.uri}/korisnici/registracijaNaruciocaPib`, data)
  }

  getPreduzece(id) {
    return this.http.get(`${this.uri}/korisnici/getPreduzece?param=${id}`)
  }
  getPreduzecePoNazivu(naziv) {
    return this.http.get(`${this.uri}/korisnici/getPreduzecePoNazivu?param=${naziv}`)
  }
  getPreduzecePoPibu(pib) {
    return this.http.get(`${this.uri}/korisnici/getPreduzecePoPibu?param=${pib}`)
  }

  dohvatiSvaPreduzeca() {
    return this.http.get(`${this.uri}/korisnici/dohvatiSvaPreduzeca`)
  }

  getKupac(id) {
    return this.http.get(`${this.uri}/korisnici/getKupac?param=${id}`)
  }

  dohvatiNeaktivnaPreduzeca() {
    return this.http.get(`${this.uri}/korisnici/dohvatiNeaktivnaPreduzeca`)
  }

  dohvatiNarucioce(id) {
    return this.http.get(`${this.uri}/korisnici/dohvatiNarucioce?param=${id}`)
  }

  getKorisnik(id) {
    return this.http.get(`${this.uri}/korisnici/getKorisnik?param=${id}`)
  }

  sacuvajOdjeljenje(id, odjeljenje) {
    const data = {
      id: id,
      odjeljenje: odjeljenje
    }

    return this.http.post(`${this.uri}/korisnici/sacuvajOdjeljenje`, data);
  }

  dodajOdjeljenje(id, odjeljenje) {
    const data = {
      id: id,
      odjeljenje: odjeljenje
    }

    return this.http.post(`${this.uri}/korisnici/dodajOdjeljenje`, data);
  }

  promjenaLozinke(id, novaLozinka) {
    const data = {
      id: id,
      novaLozinka: novaLozinka
    }

    return this.http.post(`${this.uri}/korisnici/promjenaLozinke`, data);
  }

  aktivirajKorisnika(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/korisnici/aktivirajKorisnika`, data);
  }

  obrisiKorisnika(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/korisnici/obrisiKorisnika`, data);
  }

  obrisiPreduzece(id) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/korisnici/obrisiPreduzece`, data);
  }

  promjenaLozinkeAdmin(korIme, novaLozinka) {
    const data = {
      korIme: korIme,
      novaLozinka: novaLozinka
    }

    return this.http.post(`${this.uri}/korisnici/promjenaLozinkeAdmin`, data);
  }

  dodajPodatke(id, formKategorija, formIsPdv, sifreDjelatnosti, ziroRacuni, formBrKasa, formBrMag) {
    const data = {
      id: id,
      formKategorija: formKategorija,
      formIsPdv: formIsPdv,
      sifreDjelatnosti: sifreDjelatnosti,
      ziroRacuni: ziroRacuni,
      formBrKasa: formBrKasa,
      formBrMag: formBrMag
    }

    return this.http.post(`${this.uri}/korisnici/dodajPodatke`, data);
  }

  //promjene podataka
  promjenaKorIme(id, novoKorIme) {
    const data = {
      id: id,
      novoKorIme: novoKorIme
    }

    return this.http.post(`${this.uri}/korisnici/promjenaKorIme`, data);
  }
  promjenaIme(id, novoIme) {
    const data = {
      id: id,
      novoIme: novoIme
    }

    return this.http.post(`${this.uri}/korisnici/promjenaIme`, data);
  }
  promjenaPrezime(id, novoPrezime) {
    const data = {
      id: id,
      novoPrezime: novoPrezime
    }

    return this.http.post(`${this.uri}/korisnici/promjenaPrezime`, data);
  }
  promjenaTelefon(id, noviTelefon) {
    const data = {
      id: id,
      noviTelefon: noviTelefon
    }

    return this.http.post(`${this.uri}/korisnici/promjenaTelefon`, data);
  }
  promjenaEmail(id, noviEmail) {
    const data = {
      id: id,
      noviEmail: noviEmail
    }

    return this.http.post(`${this.uri}/korisnici/promjenaEmail`, data);
  }
  promjenaNaziv(id, noviNaziv) {
    const data = {
      id: id,
      noviNaziv: noviNaziv
    }

    return this.http.post(`${this.uri}/korisnici/promjenaNaziv`, data);
  }
  promjenaDrzava(id, novaDrzava) {
    const data = {
      id: id,
      novaDrzava: novaDrzava
    }

    return this.http.post(`${this.uri}/korisnici/promjenaDrzava`, data);
  }
  promjenaGrad(id, noviGrad) {
    const data = {
      id: id,
      noviGrad: noviGrad
    }

    return this.http.post(`${this.uri}/korisnici/promjenaGrad`, data);
  }
  promjenaPbr(id, noviPbr) {
    const data = {
      id: id,
      noviPbr: noviPbr
    }

    return this.http.post(`${this.uri}/korisnici/promjenaPbr`, data);
  }
  promjenaUlica(id, novaUlica) {
    const data = {
      id: id,
      novaUlica: novaUlica
    }

    return this.http.post(`${this.uri}/korisnici/promjenaUlica`, data);
  }
  promjenaBroj(id, noviBroj) {
    const data = {
      id: id,
      noviBroj: noviBroj
    }

    return this.http.post(`${this.uri}/korisnici/promjenaBroj`, data);
  }
  promjenaPIB(id, noviPIB) {
    const data = {
      id: id,
      noviPIB: noviPIB
    }

    return this.http.post(`${this.uri}/korisnici/promjenaPIB`, data);
  }
  promjenaMB(id, noviMB) {
    const data = {
      id: id,
      noviMB: noviMB
    }

    return this.http.post(`${this.uri}/korisnici/promjenaMB`, data);
  }
  promjenaKategorija(id, novaKategorija) {
    const data = {
      id: id,
      novaKategorija: novaKategorija
    }

    return this.http.post(`${this.uri}/korisnici/promjenaKategorija`, data);
  }
  promjenaSifriDj(id, noveSifreDjelatnosti) {
    const data = {
      id: id,
      noveSifreDjelatnosti: noveSifreDjelatnosti
    }

    return this.http.post(`${this.uri}/korisnici/promjenaSifriDj`, data);
  }
  promjenaBrojMagacina(id, noviBrojMagacina) {
    const data = {
      id: id,
      noviBrojMagacina: noviBrojMagacina
    }

    return this.http.post(`${this.uri}/korisnici/promjenaBrojMagacina`, data);
  }
  promjenaBrojKasa(id, noviBrojKasa) {
    const data = {
      id: id,
      noviBrojKasa: noviBrojKasa
    }

    return this.http.post(`${this.uri}/korisnici/promjenaBrojKasa`, data);
  }

  //žiro računi
  brisiZiroRacun(id, racun) {
    const data = {
      id: id,
      racun: racun
    }

    return this.http.post(`${this.uri}/korisnici/brisiZiroRacun`, data);
  }
  dodajZiroRacun(id, racun) {
    const data = {
      id: id,
      racun: racun
    }

    return this.http.post(`${this.uri}/korisnici/dodajZiroRacun`, data);
  }

  //kase i magacini
  brisiMagacin(id, magacin) {
    const data = {
      id: id,
      magacin: magacin
    }

    return this.http.post(`${this.uri}/korisnici/brisiMagacin`, data);
  }
  dodajMagacin(id, magacin) {
    const data = {
      id: id,
      magacin: magacin
    }

    return this.http.post(`${this.uri}/korisnici/dodajMagacin`, data);
  }
  brisiKasu(id, kasa) {
    const data = {
      id: id,
      kasa: kasa
    }

    return this.http.post(`${this.uri}/korisnici/brisiKasu`, data);
  }
  dodajKasu(id, kasa) {
    const data = {
      id: id,
      kasa: kasa
    }

    return this.http.post(`${this.uri}/korisnici/dodajKasu`, data);
  }
  ubaciKategorijuArtikla(id, kat) {
    const data = {
      id: id,
      kat: kat
    }

    return this.http.post(`${this.uri}/korisnici/ubaciKategorijuArtikla`, data);
  }
  ubaciPotkategorijuArtikla(id, kat) {
    const data = {
      id: id,
      kat: kat
    }

    return this.http.post(`${this.uri}/korisnici/ubaciPotkategorijuArtikla`, data);
  }

  dodajKategorijuArtikluFinalno(id, kategorija) {
    const data = {
      id: id,
      kategorija: kategorija
    }
    return this.http.post(`${this.uri}/korisnici/dodajKategorijuArtikluFinalno`, data);
  }
}
