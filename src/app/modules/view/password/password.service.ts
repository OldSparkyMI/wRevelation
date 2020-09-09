import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() {
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
   * Return the SHA-512 hash of the current password/string
   * @param password - the current user password
   * @param options.algorithm: the hash algorithm
   */
  public async hash(password: string, options?: { algorithm: 'SHA-256' | 'SHA-512' }): Promise<string> {
    if (password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await crypto.subtle.digest(options?.algorithm || 'SHA-512', data);
      const hashArray = Array.from(new Uint8Array(hash));                     // convert buffer to byte array
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
      return hashHex;
    }
  }
}
