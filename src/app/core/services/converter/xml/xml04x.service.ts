import { Injectable } from '@angular/core';
import * as pako from 'pako';
import { Entry, EntryField } from 'src/app/core/interfaces/wRevelation.interface';
import { ConverterUtils } from '../../../utils/converter.utils';
import { Cryptographer047Service } from '../../cryptographer/cryptographer047.service';
import { REVELATION_ATTRIBUTE_TYPE, REVELATION_DATA, REVELATION_DATA_VERSION, REVELATION_ENTRY, REVELATION_FIELD, REVELATION_FIELD_ID, REVELATION_VERSION } from './xml04x.const';
import { RawFieldType, HumanizedFieldType, EntryType } from 'src/app/core/enums/wRevelation.enum';

@Injectable({
  providedIn: 'root'
})
export class Xml04xService {
  /**
   * The magic string is the start or head of every revelation file
   * TODO: move to another file, because this should be Rvl047 file independend
   */
  static readonly MAGIC_STRING: Uint8Array = new Uint8Array([114, 118, 108, 0, 2, 0]);
  /**
   * The supported revelation version
   */
  private static readonly VERSION_STRING: string = '0.4.7';
  private static readonly DATA_VERSION_STRING: string = '1';
  private static readonly VERSION_0_4_7: Uint8Array = new Uint8Array([0, 4, 7]);
  private static readonly DATA_VERSION: Uint8Array = new Uint8Array([1]);
  private static readonly PLACEHOLDER: Uint8Array = new Uint8Array([0, 0, 0]);
  /**
   * The xml header - needed for writing
   */
  private static readonly XML_PROLOG = '<?xml version="1.0" encoding="utf-8" ?>'

  private textDecoder: TextDecoder = new TextDecoder('utf-8');

  constructor(
    private cryptographer047Service: Cryptographer047Service,
  ) { }

  async encrypt(revelationEntries: Entry[], password: string) {

    // TODO: move to cryptographer047
    // FIXME: auto generate salt
    const salt = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    // FIXME: auto generate iv
    const iv = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6]);
    const xml = this.convertRevelationEntries(
      Xml04xService.VERSION_STRING,
      Xml04xService.DATA_VERSION_STRING,
      revelationEntries
    );

    const zipContent = pako.deflate(xml, { to: Int8Array });
    const zipContentWithPad = this.addPadding(zipContent);
    const generatedSha256 = await ConverterUtils.createSha256Hash(zipContentWithPad);
    const encryptContent = new Uint8Array(await this.cryptographer047Service.encrypt(
      ConverterUtils.concatTypedArrays(generatedSha256, zipContent),
      salt,
      iv,
      password
    ));

    let content = Xml04xService.MAGIC_STRING;
    content = ConverterUtils.concatTypedArrays(content, Xml04xService.VERSION_0_4_7);
    content = ConverterUtils.concatTypedArrays(content, Xml04xService.PLACEHOLDER);
    content = ConverterUtils.concatTypedArrays(content, salt);
    content = ConverterUtils.concatTypedArrays(content, iv);
    content = ConverterUtils.concatTypedArrays(content, encryptContent);
    return content;
  }

  async decrypt(fileContent: Uint8Array, password: string) {
    // Check here that the MAGIC STRING and the VERSION is correct to decode the file content
    if (ConverterUtils.compare(fileContent.subarray(6, 9), Xml04xService.VERSION_0_4_7)) {
      const compressedData = new Uint8Array(await this.cryptographer047Service.decrypt(fileContent, password));
      const sha256 = compressedData.subarray(0, 32);
      const zipContent = this.addPadding(compressedData.subarray(32));
      const generatedSha256 = await ConverterUtils.createSha256Hash(zipContent);

      if (ConverterUtils.compare(sha256, generatedSha256)) {
        const xmlContent = String.fromCharCode.apply(null, pako.inflate(zipContent));

        // provide data & metadata to the main application service
        const htmlCollection: HTMLCollection = this.xml2HTMLCollection(xmlContent)
        if (htmlCollection && htmlCollection.item(0)) {
          return this.getRevelationEntries(htmlCollection.item(0));
        } else {
          throw Error('No root element');
        }
      } else {
        console.error('expect: ', sha256);
        console.error('actual: ', generatedSha256);
        throw Error('SHA256 checksum does not match.');
      }
    } else {
      throw Error('No Revelation 0.4.7 file format.');
    }
  }

  getRevelationEntries(revelationData: Element): Entry[] {
    const matTreeResult: Entry[] = [];
    if (revelationData && revelationData.hasChildNodes()) { // unique item only on revelationdata root element
      for (let i = 0; i < revelationData.childNodes.length; i++) {
        const childElement: ChildNode = revelationData.childNodes[i];
        if (childElement && childElement.nodeType === Node.ELEMENT_NODE) {
          matTreeResult.push(this.getEntries(childElement as Element, 0));
        }
      }
    } else {
      console.error('Execute setData(xmlFileContent) before getRevelationEntries().');
    }
    return matTreeResult;
  }

  // RevelationEntries 2 XML
  convertRevelationEntries(version: string, dataVersion: string, revelationEntries: Entry[]) {
    const xmlSerializer = new XMLSerializer();

    // --> create root node somehow
    const root = document.createElement(REVELATION_DATA);
    root.setAttribute(REVELATION_VERSION, version);
    root.setAttribute(REVELATION_DATA_VERSION, dataVersion);

    revelationEntries.forEach(revelationEntry => {
      root.appendChild(this.revelationEntry2Xml(revelationEntry));
    });

    // TODO: keep NAMESPACES, if any description is xmlns=... it will be replaced
    return Xml04xService.XML_PROLOG + xmlSerializer.serializeToString(root).replace(/ xmlns=\"(.*?)\"/g, '');;
  }

  createField(fieldId: RawFieldType, value: string): EntryField {
    return {
      id: RawFieldType[fieldId],
      key: HumanizedFieldType[fieldId],
      value
    } as EntryField;
  }

  /**
   * Returns the icon for the given entry type
   */
  getIcon(entryType: EntryType) {
    switch (entryType) {
      case EntryType.FOLDER:
        return 'folder';
      case EntryType.GENERIC:
        return 'description'
      case EntryType.WEBSITE:
        return 'web'
      case EntryType.PHONE:
        return 'smartphone';
      case EntryType.CRYPTOKEY:
        return 'vpn_key';
      case EntryType.EMAIL:
        return 'email';
      case EntryType.CREDITCARD:
        return 'credit_card'
      case EntryType.SHELL:
        return 'computer';
      case EntryType.DOOR:
        return 'lock';
      case EntryType.DATABASE:
        return 'storage';
      case EntryType.FTP:
        return 'folder_special';
      case EntryType.VNC:
        return 'desktop_windows';
      case EntryType.REMOTEDESKTOP:
        return 'desktop_mac';
      default:
        console.warn('getIcon: Unkown entry type', entryType);
    }
  }

  /**
   * Converts a RevelationEntry into xml
   * @param revelationEntry 
   */
  private revelationEntry2Xml(revelationEntry: Entry): Element {
    const entry = document.createElement(REVELATION_ENTRY)
    entry.setAttribute(REVELATION_ATTRIBUTE_TYPE, revelationEntry.type);

    const name = document.createElement(RawFieldType.NAME);
    name.textContent = Xml04xService.escapeXmlSpecialChars(revelationEntry.name);

    const description = document.createElement(RawFieldType.DESCRIPTION);
    description.textContent = Xml04xService.escapeXmlSpecialChars(revelationEntry.description);

    const updated = document.createElement(RawFieldType.UPDATED);
    updated.textContent = revelationEntry.updated;

    const notes = document.createElement(RawFieldType.NOTES);
    notes.textContent = Xml04xService.escapeXmlSpecialChars(revelationEntry.notes);

    entry.appendChild(name);
    entry.appendChild(description);
    entry.appendChild(updated);
    entry.appendChild(notes);

    for (let revelationField in revelationEntry.fields) {
      const field = document.createElement(REVELATION_FIELD);
      field.setAttribute(REVELATION_FIELD_ID, revelationEntry.fields[revelationField].id.replace('_', '-'));
      field.textContent = Xml04xService.escapeXmlSpecialChars(revelationEntry.fields[revelationField].value);
      entry.appendChild(field);
    }

    if (revelationEntry.children) {
      revelationEntry.children.forEach(revelationChildEntry => entry.appendChild(this.revelationEntry2Xml(revelationChildEntry)));
    }

    return entry;
  }

  private static escapeXmlSpecialChars(content: string) {
    return content
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace('&', '&amp;')
      .replace("'", '&apos;')
      .replace('"', '&quot;');
  }

  private xml2HTMLCollection(xmlContent: string): HTMLCollection {
    if (xmlContent) {
      const xmlDocument = new DOMParser().parseFromString(xmlContent, "text/xml");;

      if (xmlDocument.getRootNode().hasChildNodes()) {

        // this is basicly the revelation data root element
        // the top level revelation entries are stored here
        return xmlDocument.getElementsByTagName(REVELATION_DATA);
      }
    }
  }

  private getEntries(element: Element, level: number): Entry {
    if (element && element.hasChildNodes()) {
      const type = EntryType[element.getAttribute(REVELATION_ATTRIBUTE_TYPE).toLocaleUpperCase()];
      const icon = this.getIcon(type);
      const name = this.getByName(element, RawFieldType.NAME);
      const description = this.getByName(element, RawFieldType.DESCRIPTION);
      const notes = this.getByName(element, RawFieldType.NOTES);
      const updated = this.getByName(element, RawFieldType.UPDATED);
      const fields = this.getFields(element);
      const level = 0;
      const expandable = false;
      const children = [];
      const entryElements = element.getElementsByTagName(REVELATION_ENTRY);
      if (entryElements && entryElements.length > 0) {
        for (let i = 0; i < entryElements.length; i++) {
          children.push(this.getEntries(entryElements[i], level + 1));
        }
      }

      return {
        name, type, icon, description, notes, updated, fields, children, level, expandable
      } as Entry;
    }
  }

  private addPadding(a: Uint8Array): Uint8Array {
    let padlen = (16 - (a.byteLength % 16));
    if (padlen == 0)
      padlen = 16;

    const padlenArray = [...Array(padlen).keys()].map(() => padlen);
    return ConverterUtils.concatTypedArrays(a, padlenArray);
  }

  /**
   * TODO: this works for the mantatory elements, but this isn't the way it should be!
   */
  private getByName(element: Element, name: string) {
    const e = element.getElementsByTagName(name);
    if (e && e.length > 0 && e[0].textContent) {
      return e[0].textContent
    }
  }

  /**
   * Get the value from every generic field value
   */
  private getFields(element: Element): {} {

    const fields = {};

    element.childNodes.forEach((child: Element) => {
      if (child.nodeName === REVELATION_FIELD) {
        fields[child.getAttribute(REVELATION_FIELD_ID)] = {
            id: RawFieldType[child.getAttribute(REVELATION_FIELD_ID)],
            key: HumanizedFieldType[child.getAttribute(REVELATION_FIELD_ID)],
            value: child.textContent 
        }
      }
    });

    return fields;
  }
}