import { TestBed } from '@angular/core/testing';

import { TreeBuilderApiService } from './tree-builder-api.service';

describe('TreeBuilderApiService', () => {
  let service: TreeBuilderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeBuilderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
