import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvMapComponent } from './dv-map.component';

describe('DvMapComponent', () => {
  let component: DvMapComponent;
  let fixture: ComponentFixture<DvMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DvMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
