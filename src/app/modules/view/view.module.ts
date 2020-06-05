import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.modules';
import { OpenPasswordDialogComponent } from './password/open-password-dialog/open-password-dialog.component';
import { ViewRoutingModule } from './view-routing.module';
import { MenuComponent } from './w-revelation/menu/menu.component';
import { WRevelationComponent } from './w-revelation/w-revelation.component';
import { EntriesComponent } from './w-revelation/entries/entries.component';
import { EntryComponent } from './w-revelation/entry/entry.component';
import { EntryFieldComponentsModule } from './w-revelation/entry/entry-field-components/entry-field-components.module';
import { NewEntryDialogComponent } from './w-revelation/entry/new-entry-dialog/new-entry-dialog.component';

@NgModule({
  declarations: [
    WRevelationComponent,
    MenuComponent,
    OpenPasswordDialogComponent,
    EntriesComponent,
    EntryComponent,
    NewEntryDialogComponent
  ],
  entryComponents: [
    OpenPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    EntryFieldComponentsModule
  ],
  exports: [
    MenuComponent,
    OpenPasswordDialogComponent,
    EntriesComponent
  ]
})
export class ViewModule { }
