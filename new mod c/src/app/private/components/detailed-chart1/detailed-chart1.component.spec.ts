import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedChart1Component } from './detailed-chart1.component';

describe('DetailedChart1Component', () => {
  let component: DetailedChart1Component;
  let fixture: ComponentFixture<DetailedChart1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedChart1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
