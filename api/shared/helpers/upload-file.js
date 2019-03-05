const moment = require('moment');
const admin = require('firebase-admin');

const bucket = admin.storage().bucket();

/**
 * upload file from a base64 string
 */
async function uploadBase64Image(directory, name, extension, base64String, changeName = true) {
  if (changeName) {
    name += moment().unix();
  }
  const imageBuffer = Buffer.from(base64String, 'base64');
  const file = bucket.file(`${directory}/${name}.${extension}`);

  return new Promise((resolve, reject) => {
    file.save(imageBuffer, {
      metadata: {
        contentType: `image/${extension}`
      },
    }, ((error) => {
      if (error) {
        reject(error);
      } else {
        file.getSignedUrl({
          action: 'read',
          expires: '01-01-2999'
        }).then(signedUrls => {
          resolve(signedUrls[0]);
        });
      }
    }));
  });
}

module.exports = {
  uploadBase64Image
}
