import { TestBed } from '@angular/core/testing';

import { ComponentMasterApiService } from './component-master-api.service';

describe('ComponentMasterApiService', () => {
  let service: ComponentMasterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentMasterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
