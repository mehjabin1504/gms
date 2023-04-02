import { TestBed } from '@angular/core/testing';

import { EventWiseDynamicItemService } from './event-wise-dynamic-item.service';

describe('EventWiseDynamicItemService', () => {
  let service: EventWiseDynamicItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventWiseDynamicItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
