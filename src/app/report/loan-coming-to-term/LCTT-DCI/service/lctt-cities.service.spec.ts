import { TestBed } from '@angular/core/testing';

import { LcttCitiesService } from './lctt-cities.service';

describe('LcttCitiesService', () => {
  let service: LcttCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LcttCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
