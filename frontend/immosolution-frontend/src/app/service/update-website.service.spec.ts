import { TestBed } from '@angular/core/testing';

import { UpdateWebsiteService } from './update-website.service';

describe('UpdateWebsiteService', () => {
  let service: UpdateWebsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateWebsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
