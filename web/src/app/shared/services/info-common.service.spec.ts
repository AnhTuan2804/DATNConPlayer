import { TestBed, inject } from '@angular/core/testing';

import { InfoCommonService } from './info-common.service';

describe('InfoCommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoCommonService]
    });
  });

  it('should be created', inject([InfoCommonService], (service: InfoCommonService) => {
    expect(service).toBeTruthy();
  }));
});
