import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPiechart1Component } from './lost-piechart1.component';

describe('LostPiechart1Component', () => {
  let component: LostPiechart1Component;
  let fixture: ComponentFixture<LostPiechart1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostPiechart1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPiechart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
