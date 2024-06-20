import { TestBed } from '@angular/core/testing';

import { LcttMapService } from './lctt-map.service';

describe('LcttMapService', () => {
  let service: LcttMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LcttMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
