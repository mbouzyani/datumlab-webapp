import { TestBed } from '@angular/core/testing';

import { LoanComingToTermService } from './loan-coming-to-term.service';

describe('LoanComingToTermService', () => {
  let service: LoanComingToTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanComingToTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
