import { TestBed } from '@angular/core/testing';

import { TfcCcmService } from './tfc-ccm.service';

describe('TfcCcmService', () => {
  let service: TfcCcmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfcCcmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
