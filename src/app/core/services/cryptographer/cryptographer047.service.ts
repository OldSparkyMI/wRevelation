import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Cryptographer047Service {
  private static readonly textEncode = new TextEncoder();
  private static readonly KEY_DERIVATION_FUNCTION = 'PBKDF2';
  private static readonly ITERATIONS = 12e3;
  private static readonly HASH_FUNCTION = 'SHA-1';
  private static readonly ENCRYPTION_FUNCTION = 'AES-CBC';

  async decrypt(content: Uint8Array, pass: string) {
    const password = Cryptographer047Service.textEncode.encode(pass);
    // const magic = fileContent.subarray(0, 6);
    // const dataVersion = fileContent.subarray(6, 9);
    // const placeholder = fileContent.subarray(9, 12);
    const salt = content.subarray(12, 20);
    const iv = content.subarray(20, 36);
    const encryptedData = content.subarray(36);

    const baseKey = await this.getBaseKey(password);
    const aesKey = await this.getAesKey(salt, baseKey);

    return this.decryptData(
      iv,
      aesKey,
      encryptedData
    );
  }

  /**
   * Encrypt the given fileContent
   * @param content content to encrypt
   * @param password password for encryption
   */
  async encrypt(content: Uint8Array, salt: Uint8Array, iv: Uint8Array, pass: string) {
    const password = Cryptographer047Service.textEncode.encode(pass);
    const baseKey = await this.getBaseKey(password);
    const aesKey = await this.getAesKey(salt, baseKey);

    return this.encryptData(
      iv,
      aesKey,
      content);
  }

  private getBaseKey(password: Uint8Array): PromiseLike<CryptoKey> {
    return crypto.subtle.importKey(
      'raw',
      password,
      Cryptographer047Service.KEY_DERIVATION_FUNCTION,
      false,
      ['deriveKey']
    );
  }

  private getAesKey(salt: Uint8Array, baseKey: CryptoKey): PromiseLike<CryptoKey> {
    return crypto.subtle.deriveKey({
      name: Cryptographer047Service.KEY_DERIVATION_FUNCTION,
      salt,
      iterations: Cryptographer047Service.ITERATIONS,
      hash: Cryptographer047Service.HASH_FUNCTION
    },
      baseKey,
      { name: Cryptographer047Service.ENCRYPTION_FUNCTION, length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }

  private encryptData(iv: Uint8Array, aesKey: CryptoKey, content: Uint8Array) {
    return window.crypto.subtle.encrypt(
      { name: Cryptographer047Service.ENCRYPTION_FUNCTION, iv },
      aesKey,
      content
    );
  }

  private async decryptData(iv: Uint8Array, aesKey: CryptoKey, content: Uint8Array) {
    return window.crypto.subtle.decrypt(
      { name: Cryptographer047Service.ENCRYPTION_FUNCTION, iv },
      aesKey,
      content
    );
  }
}
