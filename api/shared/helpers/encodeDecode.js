const md5 = require('js-md5');
const configCommon = require('./configCommon');
const localeUtils = require('./localesUtils');
const appConstant = require('./appConstant');

const encodeDecodeConfig = configCommon.getEncodeDecode();

class EncodeDecode {
  constructor(secretKey) {
    this.baseSecret = encodeDecodeConfig.baseSecret;
    this.baseContent = encodeDecodeConfig.baseContent;
    this.lengthBaseContent = encodeDecodeConfig.lengthBaseContent;

    if (secretKey) {
      this.getBaseInfor(secretKey);
    }
  }

  encodeBase64(data) {
    return Buffer.from(data).toString('base64');
  }

  decodeBase64(data) {
    return Buffer.from(data, 'base64').toString();
  }

  encodeMd5(data) {
    data += '';
    return md5(data);
  }

  encode(content, lang = appConstant.LOCALE_DEFAULT) {
    let newContent = '';
    const baseString = this.getBaseString(this.baseSecret);
    const baseNumber = this.getBaseString(this.baseSecret);
    let character;
    let characterBaseString;
    let characterBaseNumber;
    let indexContent = 0;
    let indexBase = 0;
    let indexNumber = 0;
    let number;
    let mod;
    let div;
    const lengthContent = content.length;
    const lengthBaseString = baseString.length;
    const lengthNumber = baseNumber.length;
    const lengthBaseContent = this.baseContent.length;

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
    if (content !== this.decode(newContent)) {
      throw Error(localeUtils.authMessage(lang).ENCODE_IS_ERROR);
    }
    return newContent;
  }

  decode(content) {
    let newContent = '';
    const baseString = this.getBaseString(this.baseSecret);
    const baseNumber = this.getBaseString(this.baseSecret);
    let character;
    let characterBaseString;
    let characterBaseNumber;
    let indexContent = 0;
    let indexBase = 0;
    let indexNumber = 0;
    let number;
    let mod;
    let div;
    const lengthContent = content.length;
    const lengthBaseString = baseString.length;
    const lengthNumber = baseNumber.length;
    const lengthBaseContent = this.baseContent.length;

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
    const length = content.length;

    return content.substring(0, length - 8);
  }

  getBaseNumber(content) {
    const length = content.length;

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
      stringContent = stringContent.replace(character, '');
      length = stringContent.length;
    }

    return baseContent;
  }

  randomBaseSecret() {
    let baseSecret = '';
    let number;
    const length = 100 + Math.floor(Math.random() * 100);
    for (let index = 0; index < length; index++) {
      number = 65 + Math.floor(Math.random() * 57);
      baseSecret += String.fromCharCode(number);
    }
    const date = Date.now();
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

    const indexStart = secretKey.length - this.lengthBaseContent;

    this.baseContent = secretKey.substring(indexStart);
    this.baseSecret = secretKey.substring(0, indexStart);
  }

  secret(content) {
    const encodeString = this.encode(content);
    const decodeString = this.decode(encodeString);

    if (decodeString === content) {
      return encodeString;
    }
      throw new Error(localeUtils.authMessage('ENGLISH').ENCODE_IS_ERROR);
  }
}

module.exports = new EncodeDecode();
