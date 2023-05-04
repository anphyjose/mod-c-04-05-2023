import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyLoginComponent } from './components/company-login/company-login.component';
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationService } from './services/registration.service';
import { PrivateModule } from '../private/private.module';
import { LoginService } from './services/login.service';
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  declarations: [
    CompanyComponent,
    CompanyLoginComponent,
    CompanyRegistrationComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
     PrivateModule,   
    NgWizardModule.forRoot(ngWizardConfig)
  ],
 providers: [RegistrationService,LoginService]
})
export class CompanyModule { }
