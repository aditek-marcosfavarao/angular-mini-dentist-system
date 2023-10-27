import { TestBed } from '@angular/core/testing';

import { DatabaseMockService } from './database.mock.service';

describe('DatabaseMockService', () => {
  let service: DatabaseMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
