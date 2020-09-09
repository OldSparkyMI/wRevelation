import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordDialogData } from '../password-dialog-data.interface';
import { PasswordService } from '../password.service';

@Component({
  selector: 'wrevelation-open-password-dialog',
  templateUrl: './open-password-dialog.component.html',
  styleUrls: ['./open-password-dialog.component.scss']
})
export class OpenPasswordDialogComponent {

  showPassword = false;
  currentPasswordHash: string;

  constructor(
    public dialogRef: MatDialogRef<OpenPasswordDialogComponent>,
    private passwordService: PasswordService,
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

  async hash(password: string) {
    this.currentPasswordHash = await this.passwordService.hash(password);
  }
}
