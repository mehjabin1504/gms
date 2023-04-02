import { TestBed } from '@angular/core/testing';

import { OldValueSharedService } from './old-value-shared.service';

describe('OldValueSharedService', () => {
  let service: OldValueSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldValueSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
