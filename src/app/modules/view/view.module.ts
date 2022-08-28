import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../angular-material/material.modules';
import { OpenPasswordDialogComponent } from './password/open-password-dialog/open-password-dialog.component';
import { ViewRoutingModule } from './view-routing.module';
import { EntriesComponent } from './w-revelation/entries/entries.component';
import { EntryFieldComponentsModule } from './w-revelation/entry/entry-field-components/entry-field-components.module';
import { EntryComponent } from './w-revelation/entry/entry.component';
import { NewEntryDialogComponent } from './w-revelation/entry/new-entry-dialog/new-entry-dialog.component';
import { FilenameMenuDialogComponent, MenuComponent } from './w-revelation/menu/menu.component';
import { WRevelationComponent } from './w-revelation/w-revelation.component';

@NgModule({
    declarations: [
        WRevelationComponent,
        MenuComponent,
        OpenPasswordDialogComponent,
        FilenameMenuDialogComponent,
        EntriesComponent,
        EntryComponent,
        NewEntryDialogComponent
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
