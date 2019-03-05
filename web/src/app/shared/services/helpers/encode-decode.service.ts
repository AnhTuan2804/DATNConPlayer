import { Injectable, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import { md5 } from 'js-md5';
import { environment as config } from '../../../../environments/environment';

@Injectable()
export class EncodeDecodeService {
  baseSecret: string;
  baseContent: string;
  lengthBaseContent: number;
  constructor() {
    this.baseSecret = config.encodeDecode.baseSecret;
    this.baseContent = config.encodeDecode.baseContent;
    this.lengthBaseContent = config.encodeDecode.lengthBaseContent;
  }
  encodeBase64(data) {
    return Buffer.from(data).toString('base64');
  }

  decodeBase64(data) {
    return Buffer.from(data, 'base64').toString();
  }

  encodeMd5(data) {
    data = data + '';
    return md5(data);
  }
  encode(content) {
    let newContent = '';
    let baseString = this.getBaseString(this.baseSecret);
    let baseNumber = this.getBaseString(this.baseSecret);
    let character;
    let characterBaseString;
    let characterBaseNumber;
    let indexContent = 0;
    let indexBase = 0;
    let indexNumber = 0;
    let number;
    let mod;
    let div;
    let lengthContent = content.length;
    let lengthBaseString = baseString.length;
    let lengthNumber = baseNumber.length;
    let lengthBaseContent = this.baseContent.length;

    while (indexContent < lengthContent) {
      character = content.charCodeAt(indexContent);

      if (character >= 32 && character <= 126) {
        characterBaseString = baseString.charCodeAt(indexBase);
        characterBaseNumber = baseNumber.charCodeAt(indexNumber);
        number = character + characterBaseString + characterBaseNumber;
        mod = number % lengthBaseContent;
        div = Math.floor(number / lengthBaseContent);
        newContent += div + this.baseContent.charAt(mod);
      } else {
        newContent += String.fromCharCode(character);
      }
      indexContent++;
      indexBase = (indexBase + 1) % lengthBaseString;
      indexNumber = (indexNumber + 1) % lengthNumber;
    }
    if (content != this.decode(newContent)) {
      throw Error('Encode is error!')
    }
    return newContent;
  }

  decode(content) {
    let newContent = '';
    let baseString = this.getBaseString(this.baseSecret);
    let baseNumber = this.getBaseString(this.baseSecret);
    let character;
    let characterBaseString;
    let characterBaseNumber;
    let indexContent = 0;
    let indexBase = 0;
    let indexNumber = 0;
    let number;
    let mod;
    let div;
    let lengthContent = content.length;
    let lengthBaseString = baseString.length;
    let lengthNumber = baseNumber.length;
    let lengthBaseContent = this.baseContent.length;

    while (indexContent < lengthContent) {
      div = 0;
      character = content.charCodeAt(indexContent);

      if (character >= 48 && character <= 57) {
        div = character - 48;
        indexContent++;
        character = content.charCodeAt(indexContent);
      }

      mod = this.baseContent.indexOf(String.fromCharCode(character));

      if (mod >= 0) {
        number = div * lengthBaseContent + mod;
        characterBaseString = baseString.charCodeAt(indexBase);
        characterBaseNumber = baseNumber.charCodeAt(indexNumber);
        character = (number - characterBaseString - characterBaseNumber);
      }

      newContent += String.fromCharCode(character);
      indexContent++;
      indexBase = (indexBase + 1) % lengthBaseString;
      indexNumber = (indexNumber + 1) % lengthNumber;
    }

    return newContent;
  }
  getBaseString(content) {
    let length = content.length;

    return content.substring(0, length - 8);
  }

  getBaseNumber(content) {
    let length = content.length;

    return content.substring(length - 8, length);
  }
  randomBaseContent() {
    let baseContent = '';
    let stringContent = '';
    let number;
    let length;
    let character;

    for (let index = 65; index <= 122; index++) {
      if (index <= 90 || index >= 97) {
        stringContent += String.fromCharCode(index);
      }
    }
    length = stringContent.length;
    while (length > 0) {
      number = Math.floor(Math.random() * length);
      character = stringContent.charAt(number);
      baseContent += character;
      stringContent = stringContent.replace(character, "");
      length = stringContent.length;
    }

    return baseContent;
  }

  randomBaseSecret() {
    let baseSecret = '';
    let number;
    let length = 100 + Math.floor(Math.random() * 100);
    let date;

    for (let index = 0; index < length; index++) {
      number = 65 + Math.floor(Math.random() * 57);
      baseSecret += String.fromCharCode(number);
    }
    date = Date.now();
    baseSecret += date;

    return baseSecret;
  }

  randomSecretKey() {
    return this.randomBaseSecret() + this.randomBaseContent();
  }

  getBaseInfor(secretKey) {
    if (!secretKey) {
      return;
    }

    let indexStart = secretKey.length - this.lengthBaseContent;

    this.baseContent = secretKey.substring(indexStart);
    this.baseSecret = secretKey.substring(0, indexStart);
  }

  secret(content) {
    let encodeString = this.encode(content);
    let decodeString = this.decode(encodeString);

    if (decodeString === content) {
      return encodeString;
    } else {
      throw new Error('Encode is error');
    }
  }

}
