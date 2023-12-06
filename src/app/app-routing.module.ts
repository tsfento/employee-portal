import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { ContainerComponent } from './components/container/container.component';
import { PersonnelPageComponent } from './components/personnel-page/personnel-page.component';

const routes: Routes = [

  { path: '', component: LandingPageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'user', component: ContainerComponent },
  { path: 'personnel', component: PersonnelPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
