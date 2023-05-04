import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-lost-piechart1',
  templateUrl: './lost-piechart1.component.html',
  styleUrls: ['./lost-piechart1.component.css']
})
export class LostPiechart1Component implements OnInit {
  public chart: any;
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }
  createChart(){

    this.chart = new Chart("MyChartPie1", {
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
