import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { _DeepPartialArray } from 'chart.js/dist/types/utils';
import { Filtermodel } from '../../models/filtermodel';
import { ChartService } from '../../services/chart.service';
 import ChartDataLabels from 'chartjs-plugin-datalabels';
 import *as pluginDataLabels from 'chartjs-plugin-datalabels';
// import  ChartDataLabels } from 'chartjs-plugin-datalabels/types/options';
@Component({
  selector: 'app-influence-visit',
  templateUrl: './influence-visit.component.html',
  styleUrls: ['./influence-visit.component.css']
})
export class InfluenceVisitComponent implements OnInit {
  yesterday: string | undefined
  // dateOne = new Date('2023-01-03')
  //dateTwo = new Date('2023-03-03')
  //  Date_to_check = "2023-01-10";
  value1: any;
  chart!: Chart
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
  chart2: undefined;
  chart3: any;



  // define "lord-icon" custom element with default properties
  //defineElement(lottie.loadAnimation);




  constructor(private chartser: ChartService,private cdr: ChangeDetectorRef) { }
  now: Date = new Date();
  result: any | undefined;
  filterValue: any | undefined;

  data: any;
  barchart: any;
  day: string | undefined;
  viewDay() {
    //const arr = event.target.value;
const arr=this.filterValue;
    //alert("sucess"+" "+arr)
    console.log("Selected Option Is " + arr)
    var obj: Filtermodel = new Filtermodel();


    var DateToCheck: any = new Date();
    switch (arr) {
      case 'TODAY':
        //alert("It is Option-Today");
        //console.log("It is Option-Today");

        DateToCheck = new Date()
        obj.fdate = new Date().toISOString().slice(0, 10).toString();
        obj.type = 'TODAY';
        obj.tdate = new Date().toISOString().slice(0, 10).toString();
        //obj.year=obj.tdate.getFullYear();
        obj.year = DateToCheck.getUTCFullYear();
        obj.month = DateToCheck.getUTCMonth() + 1;
        this.abc = obj.fdate;
        // alert(obj.year+" "+obj.month)

        break;
      case 'YESTERDAY':
        //alert("It is Option-Yeterday");
        // console.log("It is Option-Yesterday");

        const today = new Date();
        const yesterday1 = new Date(today);
        yesterday1.setDate(today.getDate() - 1);

        //alert(yesterday);
        obj.fdate = yesterday1.toISOString().slice(0, 10).toString();
        obj.type = 'YESTERDAY';
        obj.tdate = yesterday1.toISOString().slice(0, 10).toString();
        // alert(obj.fdate + "-" + obj.tdate)
        this.abc = (yesterday1.toLocaleDateString('en-GB').slice(0, 10).toString());
        obj.year = DateToCheck.getFullYear();
        obj.month = DateToCheck.getUTCMonth() + 1;
        break;
      case 'WTD':
        //alert("It is Option-WTD");
        // console.log("It is Option-Week.");

        let today1 = new Date();
        const dayOfWeek = today1.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const startDate = new Date(today1);
        startDate.setDate(today1.getDate() - dayOfWeek);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        // alert(startDate.toLocaleDateString('en-GB').slice(0, 10).toString() + " - " + endDate.toLocaleDateString('en-GB').slice(0, 10).toString()); // Output: start date of the week in local date format
        // Output: end date of the week in local date format

        obj.fdate = startDate.toISOString().slice(0, 10).toString();
        obj.type = 'WTD';
        obj.tdate = endDate.toISOString().slice(0, 10).toString();
        this.abc = (startDate.toLocaleDateString('en-GB').slice(0, 10).toString() + " - " + endDate.toLocaleDateString('en-GB').slice(0, 10).toString());

        obj.year = DateToCheck.getUTCFullYear();
        obj.month = DateToCheck.getUTCMonth() + 1;
        break;
      case 'MTD':
        //alert("It is Option-MTD");
        //  console.log("It is a Month.");
        const today2 = new Date();
        const monthName = today2.toLocaleString('default', { month: 'long' });
        //alert(monthName); // output: March

        const today3 = new Date();
        const firstDayOfMonth = new Date(today3.getFullYear(), today3.getMonth(), 1);
        const lastDayOfMonth = new Date(today3.getFullYear(), today3.getMonth() + 1, 0);
        obj.fdate = firstDayOfMonth.toISOString().slice(0, 10).toString();
        obj.type = 'MTD';
        obj.tdate = lastDayOfMonth.toISOString().slice(0, 10).toString();

        this.abc = monthName;
        obj.year = DateToCheck.getUTCFullYear();
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
   
    this.viewresultchart(obj)
  }
  setFiltervalue(event: any) {
    this.filterValue="";
this.filterValue = event.target.value;
if(this.filterValue!="CUSTOM")
this.viewDay();

  }
  fooFunction(i: number, entityName: string) {
    console.log(`${i} - ${entityName}`);
  }
  ngOnInit(): void {
    this.filterValue="MTD";
    this.viewDay();
  }
  reRender2(): void {
    this.filterValue="MTD";
    this.viewDay();
    this.cdr.detectChanges();
  }
  viewresultchart(resultdate: any) {
    console.log(resultdate);

    this.chartser.getInfluenceVisit(resultdate).subscribe((data: any) => {
      // Create chart data
      //alert(data.company);
      //console.log(data);
      //labels: ['jan 1','feb1']
      console.log(data)
      const chartData = {
        labels: ['Influence visits'],
        title: "Registration count",
        responsive: true,

        datasets: [
          {
            label: 'Total',
            data: [data.totalVisit],
            backgroundColor: "#660000",
            tension: 0.1, 
            barPercentage:0.8,
            datalabels:{
              color:'white',             
            }
          }, 
          {
            label: 'Won',
            data: [data.wonVisit],
            backgroundColor:"#b30000",
            
            tension: 0.1, 
            barPercentage:0.8,
            datalabels:{
              color:'white',           
            }
          },
          {
            label: 'Lost',
            data: [data.lostVisit],
            backgroundColor:"#ff0000",
           fill: false,
            tension: 0.1 ,
            barPercentage:0.8,
            datalabels:{
              color:'white',
            }
          },
          {
            label: 'Open',
            data: [data.openVisit],
            backgroundColor:"#ff2626",
            fill: false,
            tension: 0.1,
            barPercentage:0.8,           
            datalabels:{
              color:'white',
            }
          
        }

        ]
      };

// Create the chart
if(this.chart!=undefined || this.chart3!=undefined){
  this.chart.config.data=chartData;
  this.chart.update();
  this.chart3.config.data=chartData;
  this.chart3.update();
}
else
{
this.chart  = new Chart('myChart2', {
   
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

 this.chart3  = new Chart('myChart7', {
   
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
