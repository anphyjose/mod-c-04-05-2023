import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnproductiveVisitComponent } from './unproductive-visit.component';

describe('UnproductiveVisitComponent', () => {
  let component: UnproductiveVisitComponent;
  let fixture: ComponentFixture<UnproductiveVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnproductiveVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnproductiveVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
