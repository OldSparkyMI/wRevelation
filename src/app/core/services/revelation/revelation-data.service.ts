import { Injectable } from '@angular/core';
import { ConverterUtils } from '../../utils/converter.utils';
import { Xml04xService } from '../converter/xml/xml04x.service';
import { NativeFileSystemApi } from '../../utils/native-file-system-api.utils';
import { take } from 'rxjs/operators';
import { Entry } from '../../interfaces/wRevelation.interface';

@Injectable({
  providedIn: 'root'
})
export class RevelationDataService {

  static SAVE_OPTIONS = {
    type: 'save-file',
    accepts: [{
      description: 'wRevelation file',
      extensions: ['rvl'],
      mimeTypes: ['binary/octet-stream'],
    }],
  };

  constructor(
    private xml047Service: Xml04xService
  ) { }

  /**
   * Parses the file with the xml047Service and the password and creates the RevelationDataEntries
   * @param file rvl file
   * @param password rvl password
   */
  async open(file, password: string): Promise<Entry[]> {
    if (file) {
      // the content to load - that means some encrypted data with header
      const content = new Uint8Array(file.getFile ? await (await file.getFile()).arrayBuffer() : await this.readFileAsync(file) as ArrayBuffer);

      // check if the given fileContent starts with the magic string
      // like all revelation files
      if (!ConverterUtils.compare(content.subarray(0, 6), Xml04xService.MAGIC_STRING)) {
        // TODO: test me!
        throw new Error('FileFormatError: invalid magic string - content is not a revelation file');
      }

      // Try to decode the file with the 0.4.7 version service
      // This is the default file format in Revelation
      return await this.xml047Service.decrypt(content, password);
    } else {
      console.error('Unable to open file', file);
    }
  }

  /**
   * Saves the RevelationDateEntries into a file
   */
  async save(revelationData$, file?: any, password?: string) {
    try {
      revelationData$
        .pipe(take(1))
        .subscribe(async (revelationEntries: Entry[]) => {
          // the only available storage service is the xml047Service, use this
          // save this content directly to disk
          const content = await this.xml047Service.encrypt(revelationEntries, password);

          if (NativeFileSystemApi.hasNativeFS) {
            // native file system download
            // Create a writer (request permission if necessary).
            const writable = await file.createWritable();
            // Make sure we start with an empty file
            await writable.truncate(0);
            await writable.write(content);
            await writable.close();
          } else {
            // legacy download
            throw Error('Not implemented');
          }
        });
    } catch (e) {
      console.warn(e);
    }
  }

  // source: https://simon-schraeder.de/posts/filereader-async/
  private readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  }
}
