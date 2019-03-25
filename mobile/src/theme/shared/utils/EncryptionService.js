import * as base64 from 'base-64';

export default  class EncryptionService {
    static encodeBase64(data) {
        return base64.encode(data);
    }

   static decodeBase64(data) {
        return base64.decode(data);
    }
}