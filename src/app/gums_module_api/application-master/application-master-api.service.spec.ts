import { TestBed } from '@angular/core/testing';

import { ApplicationMasterApiService } from './application-master-api.service';

describe('AccountTypeGroupDetalisApiService', () => {
  let service: ApplicationMasterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationMasterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
