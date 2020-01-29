import { Injectable } from '@angular/core';
import { ConverterUtils } from '../../utils/converter.utils';
import { Xml04xService } from '../converter/xml/xml04x.service';

@Injectable({
  providedIn: 'root'
})
export class RevelationDataService {

  constructor(
    private xml047Service: Xml04xService
  ) { }

  /**
   * Parses the file with the xml047Service and the password and creates the RevelationDataEntries
   * @param file rvl file
   * @param password rvl password
   */
  async open(file, password: string) {
    if (file) {
      // the content to load - that means some encrypted data with header
      const content = new Uint8Array(file.getFile ? await (await file.getFile()).arrayBuffer() : await this.readFileAsync(file) as ArrayBuffer)

      // check if the given fileContent starts with the magic string
      // like all revelation files
      if (!ConverterUtils.compare(content.subarray(0, 6), Xml04xService.MAGIC_STRING)) {
        // TODO: test me!
        throw new Error('FileFormatError: invalid magic string - content is not a revelation file');
      }

      // Try to decode the file with the 0.4.7 version service
      // This is the default file format in Revelation
      return await this.xml047Service.decrypt(content, password)
    } else {
      console.log('Unable to open file', file);
    }
  }

  // source: https://simon-schraeder.de/posts/filereader-async/
  private readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    })
  }
}