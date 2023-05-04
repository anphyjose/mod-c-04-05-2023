import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { Lead } from '../../models/lead';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-lead-chart',
  templateUrl: './lead-chart.component.html',
  styleUrls: ['./lead-chart.component.css']
})
export class LeadChartComponent implements OnInit {
 
  constructor(private chartserv: ChartService) { }
  userList: any
  userName: any = localStorage.getItem('username');
  selectedTeam = '';
  // result: any;
  filterValue: any | undefined;
  users: any;
  coinName: any;
  values: any;
  chart!: Chart;
  selectedValue: any;
  yesterday: string | undefined
  dateOne = new Date('2023-01-03')
  dateTwo = new Date('2023-03-03')
  Date_to_check = "2023-01-10";
  value1: any;
  arr: any;
  entities = [
    { id: 0, name: '-Select-' },
    { id: 1, name: 'TODAY' },
    { id: 2, name: 'YESTERDAY' },
    { id: 3, name: 'WTD' },
    { id: 4, name: 'MTD' },
    { id: 5, name: 'CUSTOM' },
  ];

  //  companyId:any=localStorage.setItem('id');


  from: string = "2023-01-25";
  to: string = "2023-02-25";

  now: Date = new Date();



  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  firstmonths = ['January', 'Februry', 'March', 'April', 'May', 'June'];
  secondmonth = ['July', 'Augest', 'September', 'October', 'November', 'December'];
  result: any | undefined;


  data: any;
  barchart: any;
  day: string | undefined;
  //.............https://www.npmjs.com/package/typescript-calendar-date/v/1.3.1

  viewDay(event: any) {
    // const arr = event.target.value;
    this.arr = event.target.value;
    alert("sucess" + " " + this.arr)
    console.log("Selected Option Is " + this.arr)
    var obj: Lead = new Lead();


    var DateToCheck: any;
    switch (this.arr) {
      case 'TODAY':
        //alert("It is Option-Today");
        console.log("It is Option-Today");
        labelname: "March 04"
        DateToCheck = new Date()
        obj.fdate = new Date().toISOString().slice(0, 10).toString();
        obj.type = 'TODAY';
        
        obj.month= (DateToCheck.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        obj.tdate = new Date().toISOString().slice(0, 10).toString();
        obj.year= DateToCheck.getFullYear();
        console.log(obj.fdate); // Output: "2023-03-06"
        console.log(obj.tdate);
        console.log("month"+obj.month);
        console.log(obj.year); // Output: "2023-03-12"
        break;
      case 'YESTERDAY':
        //alert("It is Option-Yeterday");
        console.log("It is Option-Yesterday");
        let currentDate = new Date()

        // Subtract one day (in milliseconds) to get yesterday's date
        let yesterdayDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

        // Format the date as a string using the toISOString() method
        obj.fdate = yesterdayDate.toISOString().slice(0, 10);
      
        console.log(obj.fdate); // Output: "2023-03-05"
        //  obj.fdate=
        obj.type = 'YESTERDAY';
        obj.month= (currentDate.getMonth() + 1);
        obj.tdate = new Date().toISOString().slice(0, 10).toString();
        obj.year= currentDate .getFullYear();
        console.log(obj.fdate); // Output: "2023-03-06"
        console.log(obj.tdate); // Output: "2023-03-12"
        console.log("month"+obj.month);
        console.log(obj.year);
      
        break;
      case 'WTD':
        //       //alert("It is Option-WTD");
        console.log("It is Option-Week.");
        //         // obj.fdate=new Date().toLocaleDateString('en-GB').toString();
        //         // obj.type='WTD';
        //         // obj.tdate=new Date().toLocaleDateString('en-GB').toString();
        let DateCurrent = new Date();

        // Calculate the start and end dates of the week
        let firstDayOfWeek = new Date(DateCurrent.setDate(DateCurrent.getDate() - DateCurrent.getDay() + 1));
        let lastDayOfWeek = new Date(DateCurrent.setDate(DateCurrent.getDate() - DateCurrent.getDay() + 7));

        // Format the dates as strings using the toISOString() method
        obj.fdate = firstDayOfWeek.toISOString().slice(0, 10);
        obj.type = 'WTD';
        obj.tdate = lastDayOfWeek.toISOString().slice(0, 10);
        obj.month=(DateCurrent.getMonth() + 1);
        obj.year=  DateCurrent.getFullYear();
        console.log(obj.fdate); // Output: "2023-03-06"
        console.log(obj.tdate); // Output: "2023-03-12"
        console.log("month"+obj.month);
        console.log(obj.year);
        
        break;
      case 'MTD':
        //alert("It is Option-MTD");
        console.log("It is a Month.");

        // obj.fdate=new Date().toLocaleDateString('en-GB').toString();
        // obj.type='MTD';
        // obj.tdate=new Date().toLocaleDateString('en-GB').toString();
        // Get the current date
        let currentMonth = new Date();

        // Calculate the start and end dates of the month
        let firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        let lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        // Format the dates as strings using the toISOString() method
        obj.fdate = firstDayOfMonth.toISOString().slice(0, 10);
        obj.type = 'MTD';
        obj.tdate = lastDayOfMonth.toISOString().slice(0, 10);
        obj.month= lastDayOfMonth.getMonth() + 1;
        obj.year= lastDayOfMonth.getFullYear();
        console.log(obj.fdate); // Output: "2023-03-01"
        console.log(obj.tdate); 
        console.log("month"+obj.month);// Output: "2023-03-31"
        console.log(obj.year);
        break;
      case 'CUSTOM':
        //alert("It is Option-Custom");
        console.log("It is a Custom.");
        // Set the from and to dates
        let fromDate = new Date('2023-03-01');
        let toDate = new Date('2023-03-31');

        // Format the dates as strings using the toISOString() method
        obj.fdate = fromDate.toISOString().slice(0, 10);
        obj.type = 'CUSTOM';
        obj.tdate = toDate.toISOString().slice(0, 10);
        obj.year=  fromDate.getFullYear();
        console.log(obj.fdate); // Output: "2023-03-01"
        console.log(obj.tdate); // Output: "2023-03-31"
        console.log("month"+obj.month);
        console.log(obj.year);
        break;

      default:
        console.log("No such option exists!");
        break;
    }
    this.day = event
    
    this.viewresultchart(obj);
   
  }
  
  fooFunction(i: number, entityName: string) {
    console.log(`${i} - ${entityName}`);
  }

  ngOnInit(): void {
// this.chartserv.getLeadchartdata().subscribe((data:any)=>{
//   console.log(data)
//   })
  // this.createChart();
//  this.viewresultchart();
}

viewresultchart(resultdate:any) {
  console.log(resultdate);
  this.chartserv.getLeadchartData1(resultdate).subscribe((data:any)=>{

    console.log(data)
    // console.log(data.user)
    const chartData = {

     labels: data,
      //  labels:this.getLabels(),display: false,
      title: "Registration count",
      responsive: true,

      datasets: [

        {
          label: ' User',
          data: data.totalLeads,
          // data: ['300','700', '600', '179', '82','92', '573', '556'],
          //dataPoints:data.user,
          //  borderColor: '#3e95cd',
            backgroundColor:"#3e95cd",
          fill: false,
          // borderColor: 'Blue',
          tension: 0.1 // a new option to curve the line chart-tension more beauty

        }
       

      ]
    };

    if (this.chart != undefined) {
      this.chart.config.data = chartData;
      this.chart.update();
    } else {
    // Create the chart
   this.chart = new Chart('myChart', {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: { text: 'Registration Count', display: true },
            display: true
          },
          x: {
            title: { text: this.getLabels(), display: true },
            
            //  title: { text: 'X-Data', display: true },
            // labels:['jan 1','feb 1']
            // labels: this.getLabels()

          },

        },
        responsive: true,


      }
    });
  }
    // alert(this.result);
  });

}
getLabels(): any {
  if (this.arr === 'WTD') {
    // this.updateChart();
    // this.chart.update();
     return 'WTD';
    // this.updateChart();
  } else if (this.arr === 'MTD') {
    // this.updateChart();
    // this.chart.update();
     return 'MTD';
  }
  else if (this.arr === 'TODAY') {
    // this.updateChart();
    return 'TODAY';
  }
  else if (this.arr === 'YESTERDAY') {
    return 'YESTERDAY';
  }
  else {
    return 'CUSTOM'
  }
}


// update chart when selected option changes
updateChart() {
  // this.chart.data.labels = this.getLabels();
  this.chart.update();
}

// createChart(){
 
//   this.chartserv.getLeadchartdata().subscribe((res:any)=>{
//       console.log(res)
//       console.log("wonLeads"+res.wonLeads);
      
//       this.chart = new Chart("MyChart", {
//         type: 'bar', //this denotes tha type of chart
  
//         data: {// values on X-Axis
       
//           labels:['year'],
//            datasets: [
//             {
//               label: "Totalleads",
          
//                      data:[res.totalLeads],    
//               backgroundColor: 'blue'
//             },
//             {
//               label: "lostLeads",
//               data:[res.lostLeads],
       
//               backgroundColor: 'limegreen'
//             }  ,
//             {
//               label: "wonLeads",
//               data:[res.wonLeads],
          
//               backgroundColor: 'rose'
//             } ,
//             {
//               label: "openLeads",
//               data:[res.openLeads],
          
//               backgroundColor: 'cyan'
//             } 

//           ]
//         },
//         options: {
//           aspectRatio:2.5
//         }
        
//       });

//       })
  
//   }
}
