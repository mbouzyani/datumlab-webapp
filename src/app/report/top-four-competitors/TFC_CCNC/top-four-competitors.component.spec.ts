import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFourCompetitorsComponent } from './top-four-competitors.component';

describe('TopFourCompetitorsComponent', () => {
  let component: TopFourCompetitorsComponent;
  let fixture: ComponentFixture<TopFourCompetitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopFourCompetitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopFourCompetitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
