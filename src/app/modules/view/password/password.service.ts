import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OpenPasswordDialogComponent } from './open-password-dialog/open-password-dialog.component';
import { PasswordDialogData } from './password-dialog-data.interface';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    public dialog: MatDialog,
  ) { }

  openDialog(passwordDialogData: PasswordDialogData) {
    return this.dialog.open(OpenPasswordDialogComponent, {
      data: passwordDialogData
    });
  }
}
