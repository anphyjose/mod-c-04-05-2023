import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { _DeepPartialArray } from 'chart.js/dist/types/utils';
import { Filtermodel } from '../../models/filtermodel';
import { ChartService } from '../../services/chart.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-lead-volume',
  templateUrl: './lead-volume.component.html',
  styleUrls: ['./lead-volume.component.css']
})
export class LeadVolumeComponent implements OnInit {
  yesterday: string | undefined
 
  value1: any;
  chart!: Chart
  startDate:any;
  endDate:any

  filterValue: any | undefined;

  entities = [
    { id: 0, name: '-Select-' },
    { id: 1, name: 'TODAY' },
    { id: 2, name: 'WTD' },
    { id: 3, name: 'MTD' },
    { id: 4, name: 'CUSTOM' },
  ];
  abc: string | _DeepPartialArray<string> | undefined;
  chart2: any;

  constructor(private chartser:ChartService) { }
  now: Date = new Date();
  result: any | undefined;

  data: any;
  barchart: any;
  day: string | undefined;
  viewDay() {
    // const arr = event.target.value;
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
 viewresultchart(resultdate: any) {
    console.log(resultdate);

    this.chartser.getLeadVolume(resultdate).subscribe((data: any) => {
      // Create chart data
      //alert(data.company);
      //console.log(data);
      //labels: ['jan 1','feb1']
      console.log(data)
      const chartData = {

        // labels: [data.totalVolume],
         labels:['Lead volume'],
        title: "Registration count",
        responsive: true,

        datasets: [
          {
            label: 'Total',
            data: [data.totalVolume],
            backgroundColor: "#8d4004",
            //  fill: false,
            //borderColor: 'rgb(175, 192, 192)',
            tension: 0.1, // a new option to curve the line chart-tension more beauty
            barPercentage:0.8,
            datalabels:{
              color:'white',
          
            
            }
          },
          {
            label: 'Won',
            data: [data.wonVolume],
            backgroundColor: "#be5504",
            // data: ['467','576', '572', '79', '92','574', '573', '576'],
            //dataPoints:data.admin,
            //  fill: false,
            // borderColor: '#ff0000',
            tension: 0.1, // a new option to curve the line chart-tension more beauty
            barPercentage:0.8,
            datalabels:{
              color:'white',
          
            
            }
          },
          {
            label: 'Lost',
            data: [data.lostVolume],
            backgroundColor:"#d67229",
            // data: ['300','700', '600', '179', '82','92', '573', '556'],
            //dataPoints:data.user,
            fill: false,
            // borderColor: 'rgb(90, 192, 192)',
            tension: 0.1, // a new option to curve the line chart-tension more beauty
            barPercentage:0.8,
            datalabels:{
              color:'white',
          
            
            }
          },
          {
            label: 'Open',
            data: [data.openVolume],
            backgroundColor: "#ec9706",
            //  data: ['300','700', '600', '179', '82','92', '573', '556'],
            //dataPoints:data.user,
            fill: false,
            // borderColor: 'rgb(90, 192, 192)',
            tension: 0.1,
            barPercentage:0.8,
            datalabels:{
              color:'white',
          
            
            }
            // a new option to curve the line chart-tension more beauty
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
this.chart  = new Chart('myChart3', {
   
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

 this.chart2  = new Chart('myChart8', {
   
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
  /******************************************************************************************* */
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
