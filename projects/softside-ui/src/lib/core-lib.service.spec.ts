import { TestBed } from '@angular/core/testing';

import { CoreLibService } from './core-lib.service';

describe('CoreLibService', () => {
  let service: CoreLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
