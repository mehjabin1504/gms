import { TestBed } from '@angular/core/testing';

import { ComponentWiseEventMappingApiService } from './component-wise-event-mapping-api.service';

describe('ComponentWiseEventMappingApiService', () => {
  let service: ComponentWiseEventMappingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentWiseEventMappingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
