import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public/public.component';
import { PublicuserComponent } from './publicuser.component';
import { PublicLoginComponent } from './components/public-login/public-login.component';
import { PublicRegistrationComponent } from './components/public-registration/public-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicRegistrationService } from './services/public-registration.service';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    PublicComponent,
    PublicuserComponent,
    PublicLoginComponent,
    PublicRegistrationComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,HttpClientModule
  ],
  providers: [AuthService,PublicRegistrationService ]
})
export class PublicModule { }
