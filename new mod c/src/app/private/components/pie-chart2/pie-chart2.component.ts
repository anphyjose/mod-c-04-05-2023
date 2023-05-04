import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-pie-chart2',
  templateUrl: './pie-chart2.component.html',
  styleUrls: ['./pie-chart2.component.css']
})
export class PieChart2Component implements OnInit {
  public chart: any;
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }
 createChart(){

    this.chart = new Chart("MyChartPie2", {
      type: 'pie', //this denotes tha type of chart
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
          }},
      data: {// values on X-Axis
        labels: ['Red', 'Pink','Green','Yellow','Orange', ],
	       datasets: [{
    label: 'My First Dataset',
    data: [300, 240, 100, 432, 253],
    backgroundColor: [
      'red',
      'pink',
      'green',
			'yellow',
      'orange',
      'blue',			
    ],
    hoverOffset: 4
  }],
      },
      // options: {
      //   aspectRatio:2.5
      // }

    });
  }
}
