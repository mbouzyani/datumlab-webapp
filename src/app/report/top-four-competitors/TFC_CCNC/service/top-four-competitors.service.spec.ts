import { TestBed } from '@angular/core/testing';

import { TopFourCompetitorsService } from './top-four-competitors.service';

describe('TopFourCompetitorsService', () => {
  let service: TopFourCompetitorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopFourCompetitorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
