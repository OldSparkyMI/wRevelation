import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HumanizedFieldType, RawFieldType } from 'src/app/core/enums/wRevelation.enum';
import { AbstractEntryDataFieldComponent } from '../abstract-entry-data-field.component';

@Component({
  selector: 'wrevelation-entry-field-password',
  templateUrl: './entry-field-password.component.html',
  styleUrls: ['./entry-field-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryFieldPasswordComponent),
      multi: true
    }
  ]
})
export class EntryFieldPasswordComponent extends AbstractEntryDataFieldComponent {

  showPassword = false;
  protected ID = RawFieldType.GENERIC_PASSWORD;
  protected KEY = HumanizedFieldType.GENERIC_PASSWORD;

  /**
   * Copies the input of the password field to the clipboard
   * There are so many ways to do this, but 
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
   * recommend to use document.execCommand("copy")
   * but this won't work with a password field
   */
  copyToClipboard(text: string) {
    if ((window as any).clipboardData && (window as any).clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return (window as any).clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      }
      finally {
        document.body.removeChild(textarea);
      }
    }
  }
}
