import { TestBed, inject } from '@angular/core/testing';

import { GridironService } from './gridiron.service';

describe('GridironService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridironService]
    });
  });

  it('should be created', inject([GridironService], (service: GridironService) => {
    expect(service).toBeTruthy();
  }));
});
