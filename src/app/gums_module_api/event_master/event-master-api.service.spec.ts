import { TestBed } from '@angular/core/testing';

import { EventMasterApiService } from './event-master-api.service';

describe('EventMasterApiService', () => {
  let service: EventMasterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventMasterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
