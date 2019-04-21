import { TestBed } from '@angular/core/testing';

import { WalkNameService } from './walk-name.service';

describe('WalkNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalkNameService = TestBed.get(WalkNameService);
    expect(service).toBeTruthy();
  });
});
