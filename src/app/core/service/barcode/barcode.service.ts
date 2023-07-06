import { Injectable } from '@angular/core';
import { BehaviorSubject, from, interval, Observable, of, throwError, zip } from 'rxjs';
import { Settings } from '../../../app.global';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { catchError, startWith, switchMap, take, tap } from 'rxjs/operators';
import bigInt, { BigInteger } from 'big-integer';
import { UserSettingInfo } from '@core/model/user';
import { SettingInfo } from '@core/model/configuration/setting-info.model';

@Injectable({
  providedIn: 'root',
})
export class BarcodeService {
  private barcodeValue: string = null;
  protected readonly _barcodeValue$: BehaviorSubject<string> = new BehaviorSubject<string>(this.barcodeValue);

  private readonly generationTimer: number = 5000; /// 5 seconds in millis
  private readonly garble: string = 'NTBGQ0RGM0ZFNDIyQTBBNDY5RkU=';
  private readonly DIGITS_POWER: BigInteger[] = [
    bigInt(1),
    bigInt(10),
    bigInt(100),
    bigInt(1000),
    bigInt(10000),
    bigInt(100000),
    bigInt(1000000),
    bigInt(10000000),
    bigInt(100000000),
    bigInt(1000000000),
    bigInt(10000000000),
    bigInt(100000000000),
  ];

  constructor(private readonly settingFacade: SettingsFacadeService) {}

  get barcodeValue$(): Observable<string> {
    return this._barcodeValue$.asObservable();
  }

  set _barcodeValue(value: string) {
    this.barcodeValue = value;
    this._barcodeValue$.next(this.barcodeValue);
  }

  encodePin(pin: string): Observable<string> {
    return this.settingFacade.getSetting(Settings.Setting.SOA_KEY).pipe(
      take(1),
      switchMap(({ value }) => {
      // if this institution does not have an institutionKey, just use normal pin
        return value && this.beginBarcodeGeneration(pin, value) || of(pin);
      }),
      catchError(() => pin)
    );
  }

  generateBarcode(userSetting: UserSettingInfo, settingInfo: SettingInfo, withInterval = false): Observable<string> {
    const timerObservable = interval(this.generationTimer).pipe(startWith(-1));
    const barcodeObservable = zip(of(userSetting), of(settingInfo))
    .pipe(
      switchMap(response => {
        if (!response || response.length < 2 || !response[0] || !response[1]) {
          throwError(new Error('Unable to generate barcode, required values missing'));
        }
        return from(this.beginBarcodeGeneration(response[0].value, response[1].value));
      }),
      tap(value => (this._barcodeValue = value))
    );
    return withInterval ? timerObservable.pipe(switchMap(() => barcodeObservable)) : barcodeObservable.pipe(take(1));
  }

  private async beginBarcodeGeneration(patronKey: string, institutionKey: string): Promise<string> {
    const cryptoAlgorithm = 'HmacSHA256';
    const returnDigits = 9;
    const checksum: number = this.generateDigit(patronKey);
    const institutionKeyBytes: Int8Array = this.hexStringToByteArray(institutionKey);
    const patronKeyBytesPadded: Int8Array = this.patronKeyToByteArray(patronKey);
    const cbordKeyBytes: Int8Array = this.hexStringToByteArray(atob(this.garble));
    const sharedKey: Int8Array = this.XorEncrypt(cbordKeyBytes, institutionKeyBytes);
    const time: BigInteger = bigInt(Date.now()).divide(bigInt(1000));
    /// run totp algo
    const totp: string = await this.generateTOTP(sharedKey, time, returnDigits, cryptoAlgorithm);

    const encryptedKey: Int8Array = this.XorEncrypt(
      patronKeyBytesPadded,
      this.longToByteArrayLittleEndian(bigInt(totp))
    );
    const barcodeValue: string = this.createBarcodeString(
      time,
      this.byteArrayToLongLittleEndian(encryptedKey),
      checksum
    );
    return barcodeValue;
  }

  private createBarcodeString(timestamp: BigInteger, encryptedKey: BigInteger, patronKeyChecksum: number) {
    const version = '1';
    const timeString: string = timestamp.toString().padStart(10, '0');
    const keyString: string = encryptedKey.toString().padStart(10, '0');
    return timeString + version + keyString + patronKeyChecksum.toString();
  }

  /**
   * This method generates a TOTP value for the given set of parameters.
   *
   * @param key: the shared secret byte array
   * @param time: a value that reflects a time
   * @param returnDigits: number of digits to return
   * @param crypto: the crypto function to use
   *
   * @return: a numeric String in base 10 that includes digits
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async generateTOTP(key: Int8Array, time: BigInteger, returnDigits: number, crypto: string): Promise<string> {
    let result: string;

    // convert the time to a 0 padded 8 Byte array
    const msg = new Int8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const timeBytes = this.longToByteArrayLittleEndian(time);
    for (let i = 0; i < msg.length; i++) {
      msg[msg.length - i - 1] = timeBytes[i];
    }

    // Perform hash
    const hash: Int8Array = await this.hmac_sha(key, msg);
    // put selected bytes into result int
    const offset: number = hash[hash.length - 1] & 0xf;

    const binary: BigInteger = bigInt(hash[offset])
      .and(bigInt(0x7f))
      .shiftLeft(bigInt(24))
      .or(
        bigInt(hash[offset + 1])
          .and(bigInt(0xff))
          .shiftLeft(bigInt(16))
          .or(
            bigInt(hash[offset + 2])
              .and(bigInt(0xff))
              .shiftLeft(bigInt(8))
              .or(bigInt(hash[offset + 3]).and(bigInt(0xff)))
          )
      );

    const otp: BigInteger = binary.mod(this.DIGITS_POWER[returnDigits]);

    result = otp.toString();

    while (result.length < returnDigits) {
      result = '0' + result;
    }
    return result;
  }

  /**
   * This method uses the JCE to provide the crypto algorithm. HMAC computes a Hashed Message Authentication Code with the crypto hash algorithm as a
   * parameter.
   *
   * @param crypto: the crypto algorithm (HmacSHA1, HmacSHA256, HmacSHA512)
   * @param keyBytes: the bytes to use for the HMAC key
   * @param text: the message or text to be authenticated
   */
  private async hmac_sha(keyBytes: Int8Array, textBytes: Int8Array): Promise<Int8Array> {
    // eslint-disable-next-line no-useless-catch
    const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, true, [
      'sign',
    ]);
    const sig = await crypto.subtle.sign('HMAC', cryptoKey, textBytes);
    return new Int8Array(sig);
  }

  /**
   * XOR encrypt the given subject with the given key. subject - byte[] to be encrypted. key - byte[] array to use to encrypt subject.
   */
  private XorEncrypt(subject: Int8Array, key: Int8Array): Int8Array {
    const result = new Int8Array(subject.length);
    for (let i = 0; i < subject.length; result[i] = subject[i] ^ key[i++ % key.length]);
    return result;
  }

  /**
   * Prepare the patron key so that it may be encrypted
   *
   * @param patronKey Patron key to be converted
   * @return byte[]
   */
  private patronKeyToByteArray(patronKey: string): Int8Array {
    // Convert the patron key to a padded byte array
    const patronKeyBytesPadded = new Int8Array([0, 0, 0, 0]);
    // convert the patron key string to a long, then to a byte array
    const patronKeyBytes = this.longToByteArrayLittleEndian(bigInt(patronKey));
    // copy the bytes into a padded array
    for (let i = 0; i < patronKeyBytesPadded.length; i++) {
      patronKeyBytesPadded[i] = patronKeyBytes[i];
    }
    return patronKeyBytesPadded;
  }

  private hexStringToByteArray(s: string): Int8Array {
    const len = s.length;
    const data: Int8Array = new Int8Array(len / 2);
    for (let i = 0; i < len; i += 2) {
      data[i / 2] = (parseInt(s.charAt(i), 16) << 4) + parseInt(s.charAt(i + 1), 16);
    }
    return data;
  }

  /**
   * Convert a given byte array to a long
   *
   * @param value byte array
   * @return long value of the byte array
   */
  private byteArrayToLongBigEndian(value: Int8Array): BigInteger {
    // @es-ignore
    let result: BigInteger = bigInt(0);
    for (let i = 0; i < value.length; i++) {
      result = result.add(
        bigInt(value[value.length - i - 1])
          .and(bigInt(0xff))
          .shiftLeft(bigInt(8 * i))
      );
    }
    return result;
  }

  /**
   * Convert a given byte array to a long
   *
   * @param value byte array
   * @return long value of the byte array
   */
  public byteArrayToLongLittleEndian(value: Int8Array): BigInteger {
    // @es-ignore
    let result: BigInteger = bigInt(0);
    for (let i = 0; i < value.length; i++) {
      result = result.add(
        bigInt(value[i])
          .and(bigInt(0xff))
          .shiftLeft(bigInt(8 * i))
      );
    }
    return result;
  }

  /**
   * Converts the given long number to a byte array, little endian.
   *
   * @param number Number to convert
   * @return byte[]
   */
  private longToByteArrayLittleEndian(value: BigInteger): Int8Array {
    const longSize = 8;
    const patronKeyBytesPadded: Int8Array = new Int8Array(longSize);
    for (let i = 0; i < longSize; i++) {
      const bi = bigInt(i);
      patronKeyBytesPadded[i] = Number(value.shiftRight(bigInt(8).multiply(bi)).and(bigInt(0xff)));
    }
    return patronKeyBytesPadded;
  }

  private generateDigit(s: string): number {
    const digit = 10 - (this.doLuhn(s, true) % 10);
    if (digit % 10 == 0) {
      return 0;
    } else {
      return digit;
    }
  }

  private doLuhn(s: string, evenPosition: boolean): number {
    let sum = 0;
    for (let i = s.length - 1; i >= 0; i--) {
      let n = Number(s.substring(i, i + 1));
      if (evenPosition) {
        n *= 2;
        if (n > 9) {
          n = (n % 10) + 1;
        }
      }
      sum += n;
      evenPosition = !evenPosition;
    }

    return sum;
  }
}
