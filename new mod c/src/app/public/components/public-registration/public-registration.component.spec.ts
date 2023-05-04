import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRegistrationComponent } from './public-registration.component';

describe('PublicRegistrationComponent', () => {
  let component: PublicRegistrationComponent;
  let fixture: ComponentFixture<PublicRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
