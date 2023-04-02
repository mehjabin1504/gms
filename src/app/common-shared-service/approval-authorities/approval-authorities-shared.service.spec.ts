import { TestBed } from '@angular/core/testing';

import { ApprovalAuthoritiesSharedService } from './approval-authorities-shared.service';

describe('ApprovalAuthoritiesSharedService', () => {
  let service: ApprovalAuthoritiesSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalAuthoritiesSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
