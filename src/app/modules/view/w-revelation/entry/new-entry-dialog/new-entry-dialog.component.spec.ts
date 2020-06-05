import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntryDialogComponent } from './new-entry-dialog.component';
import { MaterialModule } from 'src/app/modules/angular-material/material.modules';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('NewEntryDialogComponent', () => {
  let component: NewEntryDialogComponent;
  let fixture: ComponentFixture<NewEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEntryDialogComponent ],
      imports: [MaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
