import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { ContainerComponent } from './components/container/container.component';
import { PersonnelPageComponent } from './components/personnel-page/personnel-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './components/auth/auth.guard';
import { OrgChartComponent } from './components/org-chart/org-chart.component';


const routes: Routes = [
  { path: 'welcome', component: LandingPageComponent, canActivate: [authGuard] },
  { path: '', component: ContainerComponent, canActivate: [authGuard], children: [
    { path: 'admin', component: AdminComponent },
    { path: 'personnel', component: PersonnelPageComponent },
    { path: 'org-chart', component: OrgChartComponent },
  ] },
  // { path: 'welcome', component: LandingPageComponent, canActivate: [authGuard] },
  { path: 'landing', component: LandingPageComponent },
  { path: 'auth', component: AuthComponent },
  // { path: 'personnel', component: PersonnelPageComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
