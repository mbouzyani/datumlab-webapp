import { TestBed } from '@angular/core/testing';

import { DvTcService } from './dv-tc.service';

describe('DvTcService', () => {
  let service: DvTcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvTcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
