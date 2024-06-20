import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanComingToTermComponent } from './loan-coming-to-term.component';

describe('LoanComingToTermComponent', () => {
  let component: LoanComingToTermComponent;
  let fixture: ComponentFixture<LoanComingToTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanComingToTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanComingToTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
