const config = require('../../config/db.config');
var nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const host = config.email.host;
const port = config.email.port;
const user = config.email.emailAddress;
const pass = config.email.password;
const userName = config.email.emailName;
const smtpConfig = {
    host,
    port,
    secure: true, 
    auth: { user, pass }
};
class EmailHelper {
    sendEmail(subject, emailReceiver, cc, bcc, data) {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: `"${userName}" <${user}>`, // sender address
            to: emailReceiver,
            cc,
            bcc, // list of receivers
            subject: subject, // Subject line
            html: data
        };
        return transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                throw new Error('Error send email from server');
            } else {
                return 'Send email success';
            }
        });
    }
}
module.exports = EmailHelper;