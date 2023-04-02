import { TestBed } from '@angular/core/testing';

import { WorkflowDesignMasterApiService } from './workflow-design-master-api.service';

describe('WorkflowDesignMasterApiService', () => {
  let service: WorkflowDesignMasterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowDesignMasterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
