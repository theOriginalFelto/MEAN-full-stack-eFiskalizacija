import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { KupacComponent } from './kupac/kupac.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AdminComponent } from './admin/admin.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PodaciOPreduzecuComponent } from './podaci-o-preduzecu/podaci-o-preduzecu.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { RobeIUslugeComponent } from './robe-i-usluge/robe-i-usluge.component';
import { RasporedArtikalaComponent } from './raspored-artikala/raspored-artikala.component';
import { RasporedStolovaComponent } from './raspored-stolova/raspored-stolova.component';
import { OpstiPodaciComponent } from './opsti-podaci/opsti-podaci.component';
import { ZiroRacuniComponent } from './ziro-racuni/ziro-racuni.component';
import { MagaciniIKaseComponent } from './magacini-i-kase/magacini-i-kase.component';
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { PregledIzvestajaComponent } from './pregled-izvestaja/pregled-izvestaja.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { KontrolaIzvestajaComponent } from './kontrola-izvestaja/kontrola-izvestaja.component';
import { AdminLogovanComponent } from './admin-logovan/admin-logovan.component';
import { PregledArtikalaComponent } from './pregled-artikala/pregled-artikala.component';
import { PregledRacunaComponent } from './pregled-racuna/pregled-racuna.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KupacComponent,
    RegistracijaComponent,
    AdminComponent,
    PreduzeceComponent,
    PodaciOPreduzecuComponent,
    NaruciociComponent,
    RobeIUslugeComponent,
    RasporedArtikalaComponent,
    RasporedStolovaComponent,
    OpstiPodaciComponent,
    ZiroRacuniComponent,
    MagaciniIKaseComponent,
    IzdavanjeRacunaComponent,
    PregledIzvestajaComponent,
    KorisniciComponent,
    KontrolaIzvestajaComponent,
    AdminLogovanComponent,
    PregledArtikalaComponent,
    PregledRacunaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
