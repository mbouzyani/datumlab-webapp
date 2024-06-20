import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TFCCCMComponent } from './tfc-ccm.component';

describe('TFCCCMComponent', () => {
  let component: TFCCCMComponent;
  let fixture: ComponentFixture<TFCCCMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TFCCCMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TFCCCMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
