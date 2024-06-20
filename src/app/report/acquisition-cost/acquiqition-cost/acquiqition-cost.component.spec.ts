import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquiqitionCostComponent } from './acquiqition-cost.component';

describe('AcquiqitionCostComponent', () => {
  let component: AcquiqitionCostComponent;
  let fixture: ComponentFixture<AcquiqitionCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquiqitionCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquiqitionCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
