import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';

@Component({
  templateUrl: './new-entry-dialog.component.html',
  styleUrls: ['./new-entry-dialog.component.scss']
})
export class NewEntryDialogComponent {

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.dialog.close(this.entry);
  }

  constructor(
    public dialog: MatDialogRef<NewEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public entry: Entry) {
  }
}
