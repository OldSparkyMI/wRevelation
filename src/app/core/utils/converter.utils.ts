export class ConverterUtils {

  /**
   * Compares two arrays of the same type
   */
  static compare(a, b) {
    for (let i = a.length; -1 < i; i -= 1) {
      if ((a[i] !== b[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Concats two arrays of the same type
   */
  static concatTypedArrays(a, b) {
    const c = new (a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }

  /**
   * Generates a Sha256Hash of the given data
   */
  static async createSha256Hash(data: Uint8Array): Promise<Uint8Array> {
    return new Uint8Array(await window.crypto.subtle.digest('SHA-256', data));
  }
}
