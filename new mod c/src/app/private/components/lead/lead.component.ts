import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Chart, ChartDataset,ChartOptions, registerables } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { _DeepPartialArray } from 'chart.js/dist/types/utils';
import { ChartService } from '../../services/chart.service';
import { Filtermodel } from '../../models/filtermodel';
// import lottie from 'lottie-web';
// import { defineElement } from 'lord-icon-element';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
  yesterday:string | undefined
  // dateOne = new Date('2023-01-03')
   //dateTwo = new Date('2023-03-03')
  //  Date_to_check = "2023-01-10";
  value1: any;
  chart!:Chart
  chart2!:Chart
  filterValue: any | undefined;
  startDate:any;
  endDate:any
  
 // define "lord-icon" custom element with default properties
 //defineElement(lottie.loadAnimation);
 
 
  entities = [
    { id: 0, name: '-Select-' },
    { id: 1, name: 'TODAY' },
    { id: 2, name: 'WTD' },
    { id: 3, name: 'MTD' },
    { id: 4, name: 'CUSTOM' },
  ];
  abc: string | _DeepPartialArray<string> | undefined;
 
 
 
  constructor(private chartser:ChartService,private cdr: ChangeDetectorRef) { }
  now:Date= new Date();
  result:any | undefined;

data:any;
barchart:any;
day:string | undefined;
viewDay(){
  // const arr = event.target.value;
  const arr=this.filterValue;
  //alert("sucess"+" "+arr)
  console.log("Selected Option Is "+arr)
  var obj:Filtermodel=new Filtermodel() ;
  
  
 var DateToCheck : any =new Date();
  switch (arr) {
    case 'TODAY':
      //alert("It is Option-Today");
      //console.log("It is Option-Today");
       
        DateToCheck= new Date()
        obj.fdate=new Date().toISOString().slice(0, 10).toString();
        obj.type='TODAY';
        obj.tdate=new Date().toISOString().slice(0, 10).toString();
        //obj.year=obj.tdate.getFullYear();
        obj.year=DateToCheck.getUTCFullYear();
        obj.month = DateToCheck.getUTCMonth() + 1;
        this.abc=obj.fdate;
       // alert(obj.year+" "+obj.month)
        
        break ;
    case 'YESTERDAY':
      //alert("It is Option-Yeterday");
       // console.log("It is Option-Yesterday");
       
        const today = new Date();
        const yesterday1 = new Date(today);
        yesterday1.setDate(today.getDate() - 1);
        
        //alert(yesterday);
        obj.fdate=yesterday1.toISOString().slice(0, 10).toString();
        obj.type='YESTERDAY';
        obj.tdate=yesterday1.toISOString().slice(0, 10).toString();
    // alert(obj.fdate+"-"+obj.tdate)
    this.abc=(yesterday1.toLocaleDateString('en-GB').slice(0, 10).toString());
    obj.year=DateToCheck.getFullYear();
    obj.month = DateToCheck.getUTCMonth() + 1;
        break;
    case 'WTD':
       let today1 = new Date();
        const dayOfWeek = today1.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const startDate = new Date(today1);
        startDate.setDate(today1.getDate() - dayOfWeek);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
         obj.fdate=startDate.toISOString().slice(0, 10).toString();
        obj.type='WTD';
        obj.tdate=endDate.toISOString().slice(0, 10).toString();
        this.abc=(startDate.toLocaleDateString('en-GB').slice(0, 10).toString()+" - "+endDate.toLocaleDateString('en-GB').slice(0, 10).toString());
        obj.year=DateToCheck.getUTCFullYear();
        obj.month = DateToCheck.getUTCMonth() + 1;
        break;
    case 'MTD':
       const today2 = new Date();
        const monthName = today2.toLocaleString('default', { month: 'long' });
        const today3 = new Date();
        const firstDayOfMonth = new Date(today3.getFullYear(), today3.getMonth(), 1);
        const lastDayOfMonth = new Date(today3.getFullYear(), today3.getMonth() + 1, 0);
        obj.fdate=firstDayOfMonth.toISOString().slice(0, 10).toString();
        obj.type='MTD';
        obj.tdate=lastDayOfMonth.toISOString().slice(0, 10).toString();
        
      this.abc=monthName;
      obj.year=DateToCheck.getUTCFullYear();
      obj.month = DateToCheck.getUTCMonth() + 1;
        break;
    case 'CUSTOM':
      obj.fdate= this.startDate
      obj.tdate=this.endDate
      obj.year=DateToCheck.getUTCFullYear();
      obj.month=DateToCheck.getUTCMonth();
      break;
      default:
        console.log("No such option exists!");
        break;
 }
  // this.day=event
  // this.viewresultchart(this.day)
  this.viewresultchart(obj)
 }
 setFiltervalue(event: any) {
  this.filterValue="";
this.filterValue = event.target.value;
if(this.filterValue!="CUSTOM")
this.viewDay();

}
 fooFunction(i: number, entityName: string){
  console.log(`${i} - ${entityName}`);
 }

  ngOnInit(): void {
    this.filterValue="MTD";
    this.viewDay();
  }
  reRender(): void {
    this.filterValue="MTD";
    this.viewDay();
    this.cdr.detectChanges();
  }

  viewresultchart(resultdate : any){
    console.log(resultdate);
  
    this. chartser.getleadchartData(resultdate).subscribe(data => {
      
      console.log(data)
      const chartData = {
        labels: ['Lead status'],
        title:"Registration count",
        responsive: true,
        datasets: [
            {
              label:'Total',
              data: [data.totalLeads],
              backgroundColor:"#008000",
              tension: 0.1, 
              barPercentage:0.8,
              datalabels:{
                color:'white',
              }
            },
            {
              label:'Won',
              data: [data.wonLeads],
              backgroundColor: "#00a550",
              tension: 0.1 ,
              barPercentage:0.8,
              datalabels:{
                color:'white',       
                }
            },
            {
              label:'Lost',
              data: [data.lostLeads],
              backgroundColor:"#00a877",
              fill: false,
              tension: 0.1 ,
              barPercentage:0.8,
              datalabels:{
                color:'white',
              }
            },
            {
            label:'Open',
            data: [data.openLeads],
            backgroundColor: "#009f6b",
            fill: false,tension: 0.1,
            barPercentage:0.8,
            datalabels:{
              color:'white',
              }
          }         
          ]
      };
    
  
      // Create the chart
      if(this.chart!=undefined || this.chart2!=undefined){
       this.chart.config.data=chartData;
       this.chart.update();
       this.chart2.config.data=chartData;
       this.chart2.update();
     }
     else
     {
     this.chart  = new Chart('myChart1', {
        
        type: 'bar',
        data: chartData,
        
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels:{

              usePointStyle:true,
              pointStyle:'circle'
              
              
              }
            }
            },
          scales: {
              y: {
                  //beginAtZero: true,
                  // title: { text: 'Registration Count', display: true }, 
                  display: true 
 
              } ,
              //  x: { 
              //   title: { text: this.abc, display: true },
              //  // labels:['jan 1','feb 1']
              // //  labels:data.abc
               
              //  } ,
               
               
          },
          
          responsive: true,
         
            
      },
      plugins: [ChartDataLabels],
      
      });

      this.chart2  = new Chart('myChart6', {
        
        type: 'bar',
        data: chartData,
        
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels:{

              usePointStyle:true,
              pointStyle:'circle'
              
              
              }
            }
            },
          scales: {
              y: {
                  //beginAtZero: true,
                  // title: { text: 'Registration Count', display: true }, 
                  display: true 
 
              } ,
              //  x: { 
              //   title: { text: this.abc, display: true },
              //  // labels:['jan 1','feb 1']
              // //  labels:data.abc
               
              //  } ,
               
               
          },
          
          responsive: true,
         
            
      },
      plugins: [ChartDataLabels],
      
      });
     }
    });
    
 
 }
 

  title = 'angulartoastr';
  showModal: boolean | undefined;
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  
//***********************************************************************************/
logDates() {
  // this.show = true;
  console.log('Start Date:', this.startDate);
  console.log('End Date:', this.endDate);
  this.viewDay();

}

setStartDate(event:any){
  this.startDate= event.target.value
}

setEndDate(event:any){
  this.endDate= event.target.value

}
 }

