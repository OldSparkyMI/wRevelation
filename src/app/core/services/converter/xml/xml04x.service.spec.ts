import { TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/modules/angular-material/material.modules';
import { Xml04xService } from './xml04x.service';

describe('XmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MaterialModule]
  }));

  it('should be created', () => {
    const service: Xml04xService = TestBed.inject(Xml04xService);
    expect(service).toBeTruthy();
  });
});
