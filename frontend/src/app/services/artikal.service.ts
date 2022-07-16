import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtikalService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  dohvatiSveArtikle(id) {
    return this.http.get(`${this.uri}/artikli/dohvatiSveArtikle?param=${id}`)
  }
  dohvatiSveArtikleBezKategorije(id) {
    return this.http.get(`${this.uri}/artikli/dohvatiSveArtikleBezKategorije?param=${id}`)
  }
  dohvatiSveArtiklePoNazivuBezKategorije(id, naziv) {
    return this.http.get(`${this.uri}/artikli/dohvatiSveArtiklePoNazivuBezKategorije?param=${id}&paramNaziv=${naziv}`)
  }
  dohvatiSveArtiklePoNazivu(id, naziv) {
    return this.http.get(`${this.uri}/artikli/dohvatiSveArtiklePoNazivu?param=${id}&paramNaziv=${naziv}`)
  }

  dodajArtikal(id, novaSifra, noviNaziv, novaJedMjere, novaPoreskaStopa, noviTip, novaZemljaPorijekla, noviStraniNaziv,
    noviBarkod, noviProizvodjac, novaCarinskaTarifa, novaEkoTaksa, noveAkcize, noveMinimalneZalihe, 
    noveMaksimalneZalihe, novaDeklaracija, noviOpis, slika) {
      const data = {
        id: id,
        novaSifra: novaSifra,
        noviNaziv: noviNaziv,
        novaJedMjere: novaJedMjere,
        novaPoreskaStopa: novaPoreskaStopa,
        noviTip: noviTip,
        novaZemljaPorijekla: novaZemljaPorijekla,
        noviStraniNaziv: noviStraniNaziv,
        noviBarkod: noviBarkod,
        noviProizvodjac: noviProizvodjac,
        novaCarinskaTarifa: novaCarinskaTarifa,
        novaEkoTaksa: novaEkoTaksa,
        noveAkcize: noveAkcize,
        noveMinimalneZalihe: noveMinimalneZalihe,
        noveMaksimalneZalihe: noveMaksimalneZalihe,
        novaDeklaracija: novaDeklaracija,
        noviOpis: noviOpis,
        slika: slika
      }
      return this.http.post(`${this.uri}/artikli/dodajArtikal`, data)
    }
    izmijeniArtikal(id, izmjenaSifra, izmjenaNaziv, izmjenaJedMjere, izmjenaPoreskaStopa, izmjenaTip, izmjenaZemljaPorijekla,
      izmjenaStraniNaziv, izmjenaBarkod, izmjenaProizvodjac, izmjenaCarinskaTarifa, izmjenaEkoTaksa, 
      izmjenaAkcize, izmjenaMinimalneZalihe, izmjenaMaksimalneZalihe, izmjenaDeklaracija, izmjenaOpis, izmjenaSlika) {
      const data = {
        id: id,
        izmjenaSifra: izmjenaSifra,
        izmjenaNaziv: izmjenaNaziv,
        izmjenaJedMjere: izmjenaJedMjere,
        izmjenaPoreskaStopa: izmjenaPoreskaStopa,
        izmjenaTip: izmjenaTip,
        izmjenaZemljaPorijekla: izmjenaZemljaPorijekla,
        izmjenaStraniNaziv: izmjenaStraniNaziv,
        izmjenaBarkod: izmjenaBarkod,
        izmjenaProizvodjac: izmjenaProizvodjac,
        izmjenaCarinskaTarifa: izmjenaCarinskaTarifa,
        izmjenaEkoTaksa: izmjenaEkoTaksa,
        izmjenaAkcize: izmjenaAkcize,
        izmjenaMinimalneZalihe: izmjenaMinimalneZalihe,
        izmjenaMaksimalneZalihe: izmjenaMaksimalneZalihe,
        izmjenaDeklaracija: izmjenaDeklaracija,
        izmjenaOpis: izmjenaOpis,
        izmjenaSlika: izmjenaSlika
      }
      return this.http.post(`${this.uri}/artikli/izmijeniArtikal`, data)
    }
  brisiArtikal(idPred, sifra) {
    const data = {
      idPred: idPred,
      sifra: sifra
    }
    return this.http.post(`${this.uri}/artikli/brisiArtikal`, data)
  }

  dohvatiArtikleIzMagacina(sifra) {
    return this.http.get(`${this.uri}/artikli/dohvatiArtikleIzMagacina?param=${sifra}`)
  }

  azurirajDodavanjeKategorije(idPred, sifra) {
    const data = {
      idPred: idPred,
      sifra: sifra
    }
    return this.http.post(`${this.uri}/artikli/azurirajDodavanjeKategorije`, data)
  }

  azurirajStanjeArtiklaUMagacinu(art, kol) {
    const data = {
      art: art,
      kol: kol
    }
    return this.http.post(`${this.uri}/artikli/azurirajStanjeArtiklaUMagacinu`, data)
  }
}
