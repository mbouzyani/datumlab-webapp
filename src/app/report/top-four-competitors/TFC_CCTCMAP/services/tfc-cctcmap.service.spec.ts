import { TestBed } from '@angular/core/testing';

import { TFC_CCTCMAPService } from './tfc-cctcmap.service';

describe('ServicesService', () => {
  let service: TFC_CCTCMAPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TFC_CCTCMAPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
