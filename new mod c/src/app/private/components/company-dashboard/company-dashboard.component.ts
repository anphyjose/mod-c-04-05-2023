import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartService } from '../../services/chart.service';
import { PublicUserService } from '../../services/public-user.service';
import { UserService } from '../../services/user.service';
import { Chart, registerables, ChartDataset, ChartOptions, } from 'chart.js/auto';
//  Chart.register(...registerables)
import { Filtermodel } from '../../models/filtermodel';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { EmployeeService } from '../../services/employee.service';
import { LeadComponent } from '../lead/lead.component';
import { UnproductiveVisitComponent } from '../unproductive-visit/unproductive-visit.component';
import { InfluenceVisitComponent } from '../influence-visit/influence-visit.component';
@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {
  //  companyId:any=localStorage.setItem('id');
  @ViewChild('childComponent', { static: false }) childComponent: LeadComponent | undefined;
 
  @ViewChild('childComponent1', { static: false }) childComponent1:UnproductiveVisitComponent | undefined;
  
   @ViewChild('childComponent2', { static: false }) childComponent2:InfluenceVisitComponent | undefined;
  userList: any
  userName: any = localStorage.getItem('username');
  dealVolume: any;
  leads:any
 obj: Filtermodel = new Filtermodel();
 obj1:Filtermodel= new Filtermodel();
  imgSrc: any;
  EmployeeUserPid: any;
  employeeName: any;
  userPid:any
  //  companyId:any=localStorage.setItem('id');
  constructor(
    // private publicuserser: PublicUserService, 
    private chartser: ChartService,
    private router: Router,
    private employeeSer:EmployeeService) { }

    
  ngOnInit(): void {
  
   
    var DateToCheck: any = new Date();
    this.obj.fdate= new Date().toISOString().slice(0, 10).toString();
    this.obj.tdate=new Date().toISOString().slice(0, 10).toString();
    this.obj.type='TODAY';
    this.obj.month= DateToCheck.getUTCMonth() + 1;
    this.obj.year=DateToCheck.getUTCFullYear();
      this.viewresultchart(this.obj);
      const today2 = new Date();
      const monthName = today2.toLocaleString('default', { month: 'long' });
      //alert(monthName); // output: March

      const today3 = new Date();
      const firstDayOfMonth = new Date(today3.getFullYear(), today3.getMonth(), 1);
      const lastDayOfMonth = new Date(today3.getFullYear(), today3.getMonth() + 1, 0);
    this.obj1.fdate=firstDayOfMonth.toISOString().slice(0, 10).toString();
    this.obj1.type='MTD';
    this.obj1.tdate=lastDayOfMonth.toISOString().slice(0, 10).toString();
      
   
    this.obj1.year=DateToCheck.getUTCFullYear();
    this.obj1.month = DateToCheck.getUTCMonth() + 1;
  this. viewLeadchart(this.obj1);

this.employeeSer.getPunchinUsers().subscribe((res:any)=>{
  this.employeeName= res
  console.log(this.employeeName);
   console.log(this.employeeName.userPid);
  // sessionStorage.setItem('userPid',this.employeeName[0].userPid);

})
  }


 
 

  viewresultchart(resultdate: any) {
    console.log(resultdate);

    this.chartser.getLeadVolume(resultdate).subscribe((data:any)=>{
      this.dealVolume = data;
      console.log(this.dealVolume.wonVolume);
      
    })
  }
  viewLeadchart(resultdate: any) {
    console.log(resultdate);

    this.chartser.getleadchartData(resultdate).subscribe((data:any)=>{
      this.leads = data;
      console.log(this.leads.totalLeads);
      
    })
  }
  public show:boolean = false;
  public buttonName:any = 'Show';
  
  toggle() {
    this.show = !this.show;

    // Change the name of the button.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
 
  clicked = false;
  



  public textShow = true;
  showText(){
    this.textShow = true;
   }
   hideText(){
    this.textShow = false;
   }
   setEmployee(event:any){
   
      this.EmployeeUserPid= event.target.value
      sessionStorage.setItem("userPid",this.EmployeeUserPid);
      this.childComponent?.reRender();
  
    this.childComponent1?.reRender1();
   
     this.childComponent2?.reRender2();
    }
    fooFunction(i: number, entityName: string) {
      console.log(`${i} - ${entityName}`);
    }
   }
