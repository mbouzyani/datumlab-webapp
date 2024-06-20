import { TestBed } from '@angular/core/testing';

import { DvNcService } from './dv-nc.service';

describe('DvNcService', () => {
  let service: DvNcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DvNcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
