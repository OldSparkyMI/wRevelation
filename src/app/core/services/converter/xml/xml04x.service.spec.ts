import { TestBed } from '@angular/core/testing';

import { Xml04xService } from './xml04x.service';

describe('XmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Xml04xService = TestBed.inject(Xml04xService);
    expect(service).toBeTruthy();
  });
});
