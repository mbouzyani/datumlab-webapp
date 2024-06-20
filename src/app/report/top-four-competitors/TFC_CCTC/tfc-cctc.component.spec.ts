import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TFCCCTCComponent } from './tfc-cctc.component';

describe('TFCCCTCComponent', () => {
  let component: TFCCCTCComponent;
  let fixture: ComponentFixture<TFCCCTCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TFCCCTCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TFCCCTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
