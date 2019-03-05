const _ = require('lodash');
const Imap = require('imap');
const configCommon = require('../helpers/configCommon');

const configEmail = configCommon.getEmail()
const emailAddress = configEmail.emailAddress;
const passWord = configEmail.password;
const hostImap = configEmail.hostImap;
const appConstant = require('../../shared/helpers/appConstant');
const emailHelper = require('../../shared/helpers/emailHelper');
const contactModel = require('../../shared/models/contact.model');
const userModel = require('../../shared/models/user.model');

const imap = new Imap({
    user: emailAddress,
    password: passWord,
    host: hostImap,
    port: 993,
    tls: true,
    connTimeout: 10000, // Default by node-imap
    authTimeout: 5000, // Default by node-imap
});

async function openInbox(cb) {
    imap.openBox('INBOX', false, cb)
}

async function getListContact() {
    const contacts = await contactModel.getListContact()
    return _.orderBy(contacts || [], ['created_at'], ['desc']);
}

async function bodyGmail(dataBody) {
    const textStart = 'Content-Transfer-Encoding: quoted-printable\r\n\r\n';
    const start = dataBody.indexOf(textStart);
    const end = dataBody.indexOf('\r\n\r\n', start + textStart.length);
    const messageReplyOfUser = dataBody.substring(start + textStart.length, end);
    const messageUtf8 = messageReplyOfUser.split('=').join('\\x')
    const messageView = utf8ToText(messageUtf8);
    return {
        start,
        end,
        messageView
    };
}

async function bodyAmazon(dataBody) {
    const textStart = 'Content-Transfer-Encoding: quoted-printable\r\n\r\n';
    let messageReplyOfUser = '';
    const start = dataBody.indexOf(textStart);
    const end = dataBody.indexOf('\r\n\r\n-----Original message-----', start + textStart.length);
    if ((start !== -1) && (end !== -1)) {
        messageReplyOfUser = dataBody.substring(start + textStart.length, end);
    }
    /**
     * TODO START
     else {
        start = dataBody.indexOf('<body>');
        end = dataBody.indexOf('<!-- end sanitized html -->', start + 6);
        const textResidual = '<p style=3D"margin: 0px; font-family: Arial, Tahoma, Helvetica, sans-seri=f; font-size: small;">';
        messageReplyOfUser = dataBody.substring(dataBody.indexOf('>', start + 7), end).replace(textResidual, '');
        messageReplyOfUser = messageReplyOfUser.replace('</p>', '');
    }
    * TODO END
    */
    const messageUtf8 = messageReplyOfUser.split('=').join('\\x')
    const messageView = utf8ToText(messageUtf8).replace('\r\n\r\n', '\r\n');
    return {
        start,
        end,
        messageView
    };
}

const onHandlerReadEmail = () => {
    try {
        imap.on('ready', async () => {
            await openInbox(async (err) => {
                imap.on('mail', async () => {
                    console.log('connect email')
                    if (err) throw err;
                    const contacts = await getListContact();
                    for (let i = 0; i < contacts.length; i++) {
                        const contact = contacts[i];
                        imap.search(['UNSEEN', ['SUBJECT', `[RE${contact.id}]`]], (err2, results) => {
                            if (err2) throw err2;
                            if (results.length > 0) {
                                try {
                                    const f = imap.fetch(results, {
                                        bodies: '',
                                        markSeen: true
                                    });
                                    f.on('message', msg => {
                                        msg.on('body', (stream) => {
                                            stream.on('data', async (chunk) => {
                                                const dataBody = chunk.toString('utf8');
                                                const textFortmatEmail = 'From: ';
                                                const indexEmailSend = dataBody.indexOf(textFortmatEmail);
                                                const startEmailToRead = dataBody.indexOf('<', indexEmailSend);
                                                const endEmailToRead = dataBody.indexOf('>', indexEmailSend);
                                                const emailSend = dataBody.substring(startEmailToRead + 1, endEmailToRead);
                                                const emailAmazonServer = dataBody.substring(0, dataBody.indexOf('>'));
                                                let start = -1;
                                                let end = -1;
                                                let messageView = '';
                                                if (emailSend.indexOf('@gmail.com') !== -1) {
                                                    const dataBodyGmail = await bodyGmail(dataBody);
                                                    start = dataBodyGmail.start;
                                                    end = dataBodyGmail.end;
                                                    messageView = dataBodyGmail.messageView;
                                                }
                                                if (emailAmazonServer.indexOf('@amazonses.com') !== -1) {
                                                    const dataBodyGmail = await bodyAmazon(dataBody);
                                                    start = dataBodyGmail.start;
                                                    end = dataBodyGmail.end;
                                                    messageView = dataBodyGmail.messageView;
                                                }
                                                if ((start !== -1) && (end !== -1) && (messageView.indexOf('<div') === -1)) {
                                                    const emailSendFormated = emailSend.split('@')[0].replace(/\./g, '');
                                                    const mailFromFormated = contact.member_from.email.split('@')[0].replace(/\./g, '')
                                                    const mailToFormated = contact.member_to.email ? contact.member_to.email.split('@')[0].replace(/\./g, '') : {};
                                                    let user = {};
                                                    if (emailSendFormated === mailToFormated) {
                                                        user = contact.member_to;
                                                    } else {
                                                        user = contact.member_from;
                                                    }
                                                    const dataReply = {
                                                        content: messageView,
                                                        name: user.name || null,
                                                        email: user.email || emailSend,
                                                        member_id: user.id || null,
                                                        url_logo: user.url_logo || null
                                                    };
                                                    const dataUpdate = {
                                                        member_from: contact.member_from || {},
                                                        member_to: contact.member_to || {}
                                                    };
                                                    if (contact.type === appConstant.CONTACT_TYPE.SYSTEM || contact.type === appConstant.CONTACT_TYPE.PROJECT) {
                                                        if (emailSendFormated === mailFromFormated) {
                                                            dataUpdate.member_from.status = 2;
                                                            dataUpdate.member_to.status = 0;
                                                        } else {
                                                            dataUpdate.member_to.status = 2;
                                                            dataUpdate.member_from.status = 0;
                                                            const memberFrom = await userModel.getUserByEmail(contact.member_from.email);
                                                            if (!memberFrom || memberFrom.is_notification !== false) {
                                                                await emailHelper.sendEmail(`[RE${contact.id}]${contact.subject}`, contact.member_from.email || contact.email, null, null, messageView, configCommon.getEmail().emailAddress, appConstant.HEADER.LOCALE_ENGLISH);
                                                            }
                                                        }
                                                        // user is member_to
                                                    } else if (!contact.member_to || user.id === contact.member_to.id) {
                                                        const memberFrom = await userModel.getUserByEmail(contact.member_from.email);
                                                        if ((!memberFrom || memberFrom.is_notification !== false) && user.email !== contact.member_from.email) {
                                                            await emailHelper.sendEmail(`[RE${contact.id}]${contact.subject}`, contact.member_from.email || contact.email, null, null, messageView, configCommon.getEmail().emailAddress, appConstant.HEADER.LOCALE_ENGLISH);
                                                        }
                                                        dataUpdate.member_to.status = 2;
                                                        dataUpdate.member_from.status = 0;
                                                    } else {
                                                        // User is member_from
                                                        const memberTo = await userModel.getUserById(contact.member_to.id);
                                                        if ((!memberTo || memberTo.is_notification !== false) && user.email !== contact.member_to.email) {
                                                            await emailHelper.sendEmail(`[RE${contact.id}]${contact.subject}`, contact.member_to.email || contact.email, null, null, messageView, configCommon.getEmail().emailAddress, appConstant.HEADER.LOCALE_ENGLISH);
                                                        }
                                                        dataUpdate.member_from.status = 2;
                                                        dataUpdate.member_to.status = 0;
                                                    }
                                                    await Promise.all([
                                                        contactModel.createReplyContent(contact.id, dataReply),
                                                        contactModel.updateContactStatus(contact.id, dataUpdate, false)
                                                    ]);
                                                }
                                            })
                                            stream.on('end', () => { });
                                        });
                                        msg.on('end', () => { });
                                    });
                                    f.on('error', err3 => {
                                        console.log(`Fetch error: ${err3}`);
                                    });
                                    f.on('end', () => { });
                                } catch (e) {
                                    console.log('error', e);
                                }
                            }
                        });
                    }
                })
            });
        });
        imap.on('error', (err) => {
            console.log(err);
        });

        imap.on('end', () => {
            console.log('Connection ended');
        });
        imap.connect();
    } catch (e) {
        console.log(e);
    }
}

function utf8ToText(a) { return text8ToText(utf8ToText8(a)) }

function utf8ToText8(a) { const b = '\\\\x'; return a.replace(new RegExp(`${b}([0-9a-fA-F]{2})`, 'g'), (c, d) => { return String.fromCharCode(parseInt(d, 16)) }) }

function text8ToText(b) { const d = []; const c = b.length; const f = false; let e; for (let a = 0; a < c; a++) { e = b.charCodeAt(a); if (f === false && isWhitespace(e) === true) { d.push(b.charAt(a)) } else if (e < 128) { d.push(b.charAt(a)) } else if (e < 224) { d.push(String.fromCharCode(((e & 31) << 6) | (b.charCodeAt(++a) & 63))) } else if (e < 240) { d.push(String.fromCharCode(((e & 15) << 12) | ((b.charCodeAt(++a) & 63) << 6) | (b.charCodeAt(++a) & 63))) } else if (e < 248) { d.push(String.fromCharCode(((e & 7) << 18) | ((b.charCodeAt(++a) & 63) << 12) | ((b.charCodeAt(++a) & 63) << 6) | (b.charCodeAt(++a) & 63))) } else if (e < 252) { d.push(String.fromCharCode(((e & 3) << 24) | ((b.charCodeAt(++a) & 63) << 18) | ((b.charCodeAt(++a) & 63) << 12) | ((b.charCodeAt(++a) & 63) << 6) | (b.charCodeAt(++a) & 63))) } else if (e < 254) { d.push(String.fromCharCode(((e & 1) << 30) | ((b.charCodeAt(++a) & 63) << 24) | ((b.charCodeAt(++a) & 63) << 18) | ((b.charCodeAt(++a) & 63) << 12) | ((b.charCodeAt(++a) & 63) << 6) | (b.charCodeAt(++a) & 63))) } } return d.join('') }

function isWhitespace(a) { if (a === 9 || a === 10 || a === 13 || a === 32) { return true } return false }

module.exports = {
    onHandlerReadEmail
}
