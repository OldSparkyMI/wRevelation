import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordDialogData } from '../password-dialog-data.interface';

@Component({
  selector: 'wrevelation-open-password-dialog',
  templateUrl: './open-password-dialog.component.html',
  styleUrls: ['./open-password-dialog.component.scss']
})
export class OpenPasswordDialogComponent {

  showPassword = false;

  constructor(
    public dialogRef: MatDialogRef<OpenPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.dialogRef.close(this.data);
    }
  }
}
