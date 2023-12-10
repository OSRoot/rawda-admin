import { TestBed } from '@angular/core/testing';

import { RefreshWatcherService } from './refresh-watcher.service';

describe('RefreshWatcherService', () => {
  let service: RefreshWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
