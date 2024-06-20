import { TestBed } from '@angular/core/testing';

import { FinancingCapacityService } from './financing-capacity.service';

describe('FinancingCapacityService', () => {
  let service: FinancingCapacityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancingCapacityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
