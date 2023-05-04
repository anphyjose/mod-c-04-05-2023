import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadVolumeComponent } from './lead-volume.component';

describe('LeadVolumeComponent', () => {
  let component: LeadVolumeComponent;
  let fixture: ComponentFixture<LeadVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadVolumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
