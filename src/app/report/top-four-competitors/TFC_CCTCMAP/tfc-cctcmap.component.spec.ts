import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TFCCCTCMAPComponent } from './tfc-cctcmap.component';

describe('TFCCCTCMAPComponent', () => {
  let component: TFCCCTCMAPComponent;
  let fixture: ComponentFixture<TFCCCTCMAPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TFCCCTCMAPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TFCCCTCMAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
