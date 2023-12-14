import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { ContainerComponent } from './components/container/container.component';
import { PersonnelPageComponent } from './components/personnel-page/personnel-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './components/auth/auth.guard';
import { OrgChartComponent } from './components/org-chart/org-chart.component';
import { PayrollComponent } from './components/payroll/payroll.component';


const routes: Routes = [
  { path: 'welcome', component: LandingPageComponent, canActivate: [authGuard] },
  { path: '', component: ContainerComponent, children: [
    { path: 'admin', component: AdminComponent },
  { path: 'personnel', component: PersonnelPageComponent },
  { path: 'payroll', component: PayrollComponent },
] },
    { path: 'personnel', component: PersonnelPageComponent },
    { path: 'org-chart', component: OrgChartComponent },
    { path: 'payroll', component: PayrollComponent },
  ] },
  { path: 'landing', component: LandingPageComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'payroll', component: PayrollComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
