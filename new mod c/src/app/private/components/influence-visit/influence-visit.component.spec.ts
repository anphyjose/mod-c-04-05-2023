import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluenceVisitComponent } from './influence-visit.component';

describe('InfluenceVisitComponent', () => {
  let component: InfluenceVisitComponent;
  let fixture: ComponentFixture<InfluenceVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluenceVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluenceVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
