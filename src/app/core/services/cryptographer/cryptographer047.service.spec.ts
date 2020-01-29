import { TestBed } from '@angular/core/testing';

import { Cryptographer047Service } from './cryptographer047.service';

describe('Cryptographer047Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cryptographer047Service = TestBed.get(Cryptographer047Service);
    expect(service).toBeTruthy();
  });
});
