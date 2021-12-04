import { TestBed } from '@angular/core/testing';

import { FacebookAuthGuard } from './facebook-auth.guard';

describe('FacebookAuthGuard', () => {
  let guard: FacebookAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FacebookAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
