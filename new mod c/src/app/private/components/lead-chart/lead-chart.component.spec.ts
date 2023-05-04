import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadChartComponent } from './lead-chart.component';

describe('LeadChartComponent', () => {
  let component: LeadChartComponent;
  let fixture: ComponentFixture<LeadChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
