import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicRegistrationComponent } from './components/public-registration/public-registration.component';

const routes: Routes = [
  { path: 'publicregistration', component: PublicRegistrationComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
