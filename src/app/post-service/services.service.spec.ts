import { TestBed } from '@angular/core/testing';

import { PostServiceService } from './services.service';

describe('PostServiceService', () => {
  let service: PostServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
