import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicUserService } from '../private/services/public-user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // FontAwesomeModule
  ],
  providers: [PublicUserService]
})
export class SharedModule { }
