import { TestBed } from '@angular/core/testing';

import { ActivityMasterApiServiceService } from './activity-master-api-service.service';

describe('ActivityMasterApiServiceService', () => {
  let service: ActivityMasterApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityMasterApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
