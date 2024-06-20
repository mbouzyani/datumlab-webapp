import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingCapacityComponent } from './financing-capacity.component';

describe('FinancingCapacityComponent', () => {
  let component: FinancingCapacityComponent;
  let fixture: ComponentFixture<FinancingCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancingCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancingCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
