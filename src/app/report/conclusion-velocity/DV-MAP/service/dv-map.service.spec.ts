import { TestBed } from '@angular/core/testing';

import { DvMapService } from './dv-map.service';

describe('DvMapService', () => {
  let service: DvMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
