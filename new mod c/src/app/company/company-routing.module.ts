import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyLoginComponent } from './components/company-login/company-login.component';
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component';

const routes: Routes = [
  { path: '', component: CompanyLoginComponent },
{ path: 'signup', component: CompanyRegistrationComponent },
{ path: 'login', component: CompanyLoginComponent },
{ path: 'login/:token', component: CompanyLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
