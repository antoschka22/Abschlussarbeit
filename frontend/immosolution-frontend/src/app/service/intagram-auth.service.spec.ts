import { TestBed } from '@angular/core/testing';

import { IntagramAuthService } from './intagram-auth.service';

describe('IntagramAuthService', () => {
  let service: IntagramAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntagramAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
