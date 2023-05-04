import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
    //  { path: 'admin-dashboard', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
    //{ path: 'dashboard', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
     { path: 'dashboard', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
     { path: 'publicregistration', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule) },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
