import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { ContainerComponent } from './components/container/container.component';
import { PersonnelPageComponent } from './components/personnel-page/personnel-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './components/auth/auth.guard';


const routes: Routes = [

  { path: '', component: LandingPageComponent, canActivate: [authGuard] },
  { path: 'landing', component: LandingPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'personnel', component: PersonnelPageComponent, },
  { path: 'user', component: ContainerComponent, canActivate: [authGuard], children: [
    { path: 'admin', component: AdminComponent }
  ] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
