import { TestBed } from '@angular/core/testing';

import { DataTypeSetupService } from './data-type-setup.service';

describe('DataTypeSetupService', () => {
  let service: DataTypeSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTypeSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
