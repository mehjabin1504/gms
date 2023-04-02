import { TestBed } from '@angular/core/testing';

import { EventWiseWorkflowApiService } from './event-wise-workflow-api.service';

describe('EventWiseWorkflowApiService', () => {
  let service: EventWiseWorkflowApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventWiseWorkflowApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
