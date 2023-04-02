import { TestBed } from '@angular/core/testing';

import { UserManagementApprovalSharedService } from './user-management-approval-shared.service';

describe('NonFinancialApprovalSharedService', () => {
  let service: UserManagementApprovalSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementApprovalSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
