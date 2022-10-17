import { TestBed } from '@angular/core/testing';

import { SilosService } from './silos.service';

describe('SilosService', () => {
  let service: SilosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
