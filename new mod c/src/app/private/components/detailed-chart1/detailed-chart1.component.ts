import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-chart1',
  templateUrl: './detailed-chart1.component.html',
  styleUrls: ['./detailed-chart1.component.css']
})
export class DetailedChart1Component implements OnInit {
  userId: string | null | undefined;

  constructor(private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void { 
  //    this.activatedRoute.paramMap.subscribe((params) => {
  //   this.userId = params.get("userId"); //+ string to number
  // });
  }
  title = 'angulartoastr';
  // showModal: boolean | undefined;
  // show()
  // {
  //   this.showModal = true; // Show-Hide Modal Check
    
  // }
  // //Bootstrap Modal Close event
  // hide()
  // {
  //   this.showModal = false;
  // }
}
