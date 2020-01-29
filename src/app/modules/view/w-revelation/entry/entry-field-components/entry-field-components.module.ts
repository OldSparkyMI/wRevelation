import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MaterialModule } from 'src/app/modules/angular-material/material.modules';
import { EntryFieldDescriptionComponent } from './entry-field-description/entry-field-description.component';
import { EntryFieldEmailComponent } from './entry-field-email/entry-field-email.component';
import { EntryFieldIconComponent } from './entry-field-icon/entry-field-icon.component';
import { EntryFieldNameComponent } from './entry-field-name/entry-field-name.component';
import { EntryFieldNotesComponent } from './entry-field-notes/entry-field-notes.component';
import { EntryFieldPasswordComponent } from './entry-field-password/entry-field-password.component';
import { EntryFieldUrlComponent } from './entry-field-url/entry-field-url.component';
import { EntryFieldUsernameComponent } from './entry-field-username/entry-field-username.component';
import { EntryFieldHostnameComponent } from './entry-field-hostname/entry-field-hostname.component';
import { EntryFieldPhonePhonenumberComponent } from './entry-field-phone-number/entry-field-phone-phonenumber.component';
import { EntryFieldPinComponent } from './entry-field-pin/entry-field-pin.component';
import { EntryFieldCertificateComponent } from './entry-field-certificate/entry-field-certificate.component';
import { EntryFieldKeyfileComponent } from './entry-field-keyfile/entry-field-keyfile.component';
import { EntryFieldCreditcardCardtypeComponent } from './entry-field-creditcard-cardtype/entry-field-creditcard-cardtype.component';
import { EntryFieldCreditcardCardnumberComponent } from './entry-field-creditcard-cardnumber/entry-field-creditcard-cardnumber.component';
import { EntryFieldCreditcardCcvComponent } from './entry-field-creditcard-ccv/entry-field-creditcard-ccv.component';
import { EntryFieldCreditcardExpirydateComponent } from './entry-field-creditcard-expirydate/entry-field-creditcard-expirydate.component';
import { EntryFieldDomainComponent } from './entry-field-domain/entry-field-domain.component';
import { EntryFieldDatabaseComponent } from './entry-field-database/entry-field-database.component';
import { EntryFieldLocationComponent } from './entry-field-location/entry-field-location.component';
import { EntryFieldCodeComponent } from './entry-field-code/entry-field-code.component';
import { EntryFieldPortComponent } from './entry-field-port/entry-field-port.component';

@NgModule({
  declarations: [
    EntryFieldUrlComponent,
    EntryFieldUsernameComponent,
    EntryFieldHostnameComponent,
    EntryFieldEmailComponent,
    EntryFieldPasswordComponent,
    EntryFieldNameComponent,
    EntryFieldDescriptionComponent,
    EntryFieldNotesComponent,
    EntryFieldIconComponent,
    EntryFieldPhonePhonenumberComponent,
    EntryFieldPinComponent,
    EntryFieldCertificateComponent,
    EntryFieldKeyfileComponent,
    EntryFieldCreditcardCardtypeComponent,
    EntryFieldCreditcardCardnumberComponent,
    EntryFieldCreditcardCcvComponent,
    EntryFieldCreditcardExpirydateComponent,
    EntryFieldDomainComponent,
    EntryFieldDatabaseComponent,
    EntryFieldLocationComponent,
    EntryFieldCodeComponent,
    EntryFieldPortComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FlexLayoutModule
  ],
  exports: [
    EntryFieldUrlComponent,
    EntryFieldUsernameComponent,
    EntryFieldHostnameComponent,
    EntryFieldEmailComponent,
    EntryFieldPasswordComponent,
    EntryFieldNameComponent,
    EntryFieldDescriptionComponent,
    EntryFieldNotesComponent,
    EntryFieldIconComponent,
    EntryFieldPhonePhonenumberComponent,
    EntryFieldPinComponent,
    EntryFieldCertificateComponent,
    EntryFieldKeyfileComponent,
    EntryFieldCreditcardCardtypeComponent,
    EntryFieldCreditcardCardnumberComponent,
    EntryFieldCreditcardCcvComponent,
    EntryFieldCreditcardExpirydateComponent,
    EntryFieldDomainComponent,
    EntryFieldDatabaseComponent,
    EntryFieldLocationComponent,
    EntryFieldCodeComponent,
    EntryFieldPortComponent,
  ]
})
export class EntryFieldComponentsModule { }
