import { TestBed } from '@angular/core/testing';

import { HttpIntersepterBasicAuthService } from './http-intersepter-basic-auth.service';

describe('HttpIntersepterBasicAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpIntersepterBasicAuthService = TestBed.get(HttpIntersepterBasicAuthService);
    expect(service).toBeTruthy();
  });
});
