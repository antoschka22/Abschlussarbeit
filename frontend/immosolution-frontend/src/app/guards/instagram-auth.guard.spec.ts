import { TestBed } from '@angular/core/testing';

import { InstagramAuthGuard } from './instagram-auth.guard';

describe('InstagramAuthGuard', () => {
  let guard: InstagramAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InstagramAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
