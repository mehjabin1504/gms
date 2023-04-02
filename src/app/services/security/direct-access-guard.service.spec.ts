import { TestBed } from '@angular/core/testing';

import { DirectAccessGuardService } from './direct-access-guard.service';

describe('DirectAccessGuardService', () => {
  let service: DirectAccessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectAccessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
