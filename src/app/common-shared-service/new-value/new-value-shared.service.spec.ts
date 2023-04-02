import { TestBed } from '@angular/core/testing';

import { NewValueSharedService } from './new-value-shared.service';

describe('NewValueSharedService', () => {
  let service: NewValueSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewValueSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
