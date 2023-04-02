import { TestBed } from '@angular/core/testing';

import { ComponentWiseActivityMappingApiService } from './component-wise-activity-mapping-api.service';

describe('ComponentWiseActivityMappingApiService', () => {
  let service: ComponentWiseActivityMappingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentWiseActivityMappingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
