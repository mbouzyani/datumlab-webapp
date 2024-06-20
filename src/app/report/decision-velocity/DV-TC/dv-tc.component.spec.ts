import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvTcComponent } from './dv-tc.component';

describe('DvTcComponent', () => {
  let component: DvTcComponent;
  let fixture: ComponentFixture<DvTcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DvTcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
