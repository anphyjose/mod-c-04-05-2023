import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicuserComponent } from './publicuser.component';

describe('PublicuserComponent', () => {
  let component: PublicuserComponent;
  let fixture: ComponentFixture<PublicuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
