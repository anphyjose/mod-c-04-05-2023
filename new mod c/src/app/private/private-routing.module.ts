import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CompanyAdminDashboardComponent } from './components/company-admin-dashboard/company-admin-dashboard.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LeadChartComponent } from './components/lead-chart/lead-chart.component';
import { LeadComponent } from './components/lead/lead.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';
import { PublicUserProfileComponent } from './components/public-user-profile/public-user-profile.component';
import { PrivateComponent } from './private.component';
import { UnproductiveVisitComponent } from './components/unproductive-visit/unproductive-visit.component';
import { DetailedChart1Component } from './components/detailed-chart1/detailed-chart1.component';

const routes: Routes = [
//   {path:'',component:PrivateComponent,children:[
    
//     {path:'dashboard',component:CompanyDashboardComponent},
//     // {path:'login',component:PublicLoginComponent},

//   ]

// }
 {path:'dashboard',component:CompanyDashboardComponent},
{path:'adduser',component:AddUserComponent},
{path:'active',component:ActiveUsersComponent},
//  {path:'profile',component:PublicUserProfileComponent},
{path : 'profile/:id',component:PublicUserProfileComponent},
{path:'lead',component:LeadComponent},
{path:'leading',component:LeadChartComponent},
{path:'detailed-chart/:MTD',component:DetailedChart1Component},
{path: 'lead-chart', component:DetailedChart1Component}
// {path:'dashbard',component:CompanyAdminDashboardComponent},


// {path:'pending',component:PendingRequestsComponent},
// {path:'edit/:id',component:EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
