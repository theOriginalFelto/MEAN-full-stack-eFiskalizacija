# PIA-projekat-jun-jul-2022
MEAN full stack web aplikacija koja predstavlja sistem za eFiskalizaciju u Republici Srbiji. Detaljan opis projekta se nalazi u postavljenom .pdf fajlu.
Frontend urađen u potpunosti u Angular tehnologiji, dok je bekend iskucan u NodeJS-u. Koristi se MongoDB baza podataka.

## Uputstvo za instaliranje i pokretanje aplikacije ##

Za početak, potrebno je uraditi sljedeće (ukoliko već imate instaliran MEAN stack onda prekočite stavke 1-3):

1. Instalirati NodeJS
2. Preći u komandnoj liniji u direktorijum aplikacije i pokrenuti: 
  - `npm install @angular/cli`
  - `npm install -g express`
  - `npm install -g cors`
  - `npm install -g mongoose`
  - `npm install -g typescript`
3. Instalirati MongoDB i MongoDBCompass
4. U MongoDBCompass-u konektovati se, napraviti bazu po imenu **fiskalizacija2022**, kreirati unutar te baze kolekcije po imenu .json fajlova iz foldera baza i uvesti te .json fajlove u odgovarajuće kolekcije.

Postoje dva načina za pokretanje aplikacije (drugi način je preporučen):

### Prvi način (instaliranje sopstvenog projekta) ###

1. FRONTEND
  - Kreiranje projekta
	  - U komandnoj liniji preći u direktorijum frontend dijela aplikacije i pokrenuti `ng new imeProjekta`
	
  - Opcije:
    - routing YES
    - style CSS

   - Pokretanje projekta
      - `ng serve --open`

2. BACKEND

 - pokretanje: preći u direktorijum bekend dijela aplikacije i pokrenuti:
	  - 'tsc' (typescript compiler)
	  - 'npm run serve'
    
3. Zamijeniti src foldere sa repozitorijuma sa odgovarajućim src folderima kreirane aplikacije, pa onda pokrenuti oba dijela.


### Drugi način (korišćenje već postojećeg projekta) ###
  
1. Preuzeti projekat sa: https://drive.google.com/file/d/1oFEEffgeCgG8q8JNc-4UIUpmPbkD55_V/view?usp=sharing

2. Otpakovati arhivu.

3. Zamijeniti src foldere sa repozitorijuma sa odgovarajućim src folderima raspakovane aplikacije.

4. FRONTEND
   - Pokretanje projekta
      - U komandnoj liniji preći u direktorijum frontend dijela aplikacije i pokrenuti `ng serve --open`

5. BACKEND
 - pokretanje: preći u direktorijum bekend dijela aplikacije i pokrenuti:
	  - 'tsc' (typescript compiler)
	  - 'npm run serve'
    
    
    
Ukoliko imate nekih problema sa pokretanjem aplikacije, budite slobodni da mi pišete!

Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Priva
