import { TestBed } from '@angular/core/testing';

import { TfcCctcService } from './tfc-cctc.service';

describe('TfcCctcService', () => {
  let service: TfcCctcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfcCctcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
