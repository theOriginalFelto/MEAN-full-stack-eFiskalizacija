import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLogovanComponent } from './admin-logovan/admin-logovan.component';
import { AdminComponent } from './admin/admin.component';
import { IzdavanjeRacunaComponent } from './izdavanje-racuna/izdavanje-racuna.component';
import { KontrolaIzvestajaComponent } from './kontrola-izvestaja/kontrola-izvestaja.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { KupacComponent } from './kupac/kupac.component';
import { LoginComponent } from './login/login.component';
import { MagaciniIKaseComponent } from './magacini-i-kase/magacini-i-kase.component';
import { NaruciociComponent } from './narucioci/narucioci.component';
import { OpstiPodaciComponent } from './opsti-podaci/opsti-podaci.component';
import { PodaciOPreduzecuComponent } from './podaci-o-preduzecu/podaci-o-preduzecu.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PregledArtikalaComponent } from './pregled-artikala/pregled-artikala.component';
import { PregledIzvestajaComponent } from './pregled-izvestaja/pregled-izvestaja.component';
import { PregledRacunaComponent } from './pregled-racuna/pregled-racuna.component';
import { RasporedArtikalaComponent } from './raspored-artikala/raspored-artikala.component';
import { RasporedStolovaComponent } from './raspored-stolova/raspored-stolova.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RobeIUslugeComponent } from './robe-i-usluge/robe-i-usluge.component';
import { ZiroRacuniComponent } from './ziro-racuni/ziro-racuni.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "kupac", component: KupacComponent, children: [
    {
      path: 'pregled-artikala/:id',
      component: PregledArtikalaComponent,
    },
    {
      path: 'pregled-racuna/:id',
      component: PregledRacunaComponent,
    }
  ]},
  {path: 'preduzece', component: PreduzeceComponent, children: [
      {
        path: 'podaci-o-preduzecu/:id',
        component: PodaciOPreduzecuComponent,
        children: [
          {
            path: 'opsti-podaci/:id',
            component: OpstiPodaciComponent
          },
          {
            path: 'ziro-racuni/:id',
            component: ZiroRacuniComponent
          },
          {
            path: 'magacini-i-kase/:id',
            component: MagaciniIKaseComponent
          },
        ]
      },
      {
        path: 'narucioci/:id',
        component: NaruciociComponent,
      },
      {
        path: 'robe-i-usluge/:id',
        component: RobeIUslugeComponent,
      },
      {
        path: 'raspored-artikala/:id',
        component: RasporedArtikalaComponent,
      },
      {
        path: 'raspored-stolova/:id',
        component: RasporedStolovaComponent,
      }, 
      {
        path: 'izdavanje-racuna/:id',
        component: IzdavanjeRacunaComponent,
      }, 
      {
        path: 'pregled-izvestaja/:id',
        component: PregledIzvestajaComponent,
      }, 
    ],
    runGuardsAndResolvers: 'always',
  },
  {path: 'admin-logovan', component: AdminLogovanComponent, children: [
    {
      path: 'kontrola-izvestaja',
      component: KontrolaIzvestajaComponent,
    },
    {
      path: 'korisnici',
      component: KorisniciComponent,
    }
  ]},
  {path: 'register', component: RegistracijaComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
