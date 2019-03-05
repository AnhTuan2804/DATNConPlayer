const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const configCommon = require('../helpers/configCommon')
const localeUtils = require('./localesUtils');
const appConstant = require('./appConstant');

const configEmail = configCommon.getEmail()
const emailAddress = configEmail.emailAddress;
const emailName = configEmail.emailName;
const accessKeyId = configEmail.accessKeyId;
const secretAccessKey = configEmail.secretAccessKey;
const region = configEmail.region;
const smtpConfig = {
    accessKeyId,
    secretAccessKey,
    region
    // host,
    // port,
    // secure: true, // use SSL
    // auth: { user, pass },
    // tls: { rejectUnauthorized: false }
};

function sendEmail(subject, emailReceiver, cc, bcc, data, fromMail, lang = appConstant.LOCALE_DEFAULT) {
    // create reusable transporter object using the default SMTP transport
    // var transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
    const transporter = nodemailer.createTransport(sesTransport(smtpConfig));
    // setup e-mail data with unicode symbols
    const name = fromMail ? `From ${fromMail}` : emailName;
    const mailOptions = {
        from: `"${name}" <${emailAddress}>`, // sender address
        to: emailReceiver,
        cc,
        bcc, // list of receivers
        subject, // Subject line
        html: data
    };
    return transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error)
            return error;
            // throw new Error('Error send email from server');
        }
            return localeUtils.userMessage(lang).SENT_EMAIL_SUCCESSFULLY;
    });
}
module.exports = {
    sendEmail
}
