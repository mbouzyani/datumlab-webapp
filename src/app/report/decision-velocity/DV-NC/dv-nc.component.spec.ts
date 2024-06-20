import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DVNCComponent } from './dv-nc.component';

describe('DVNCComponent', () => {
  let component: DVNCComponent;
  let fixture: ComponentFixture<DVNCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DVNCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DVNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
