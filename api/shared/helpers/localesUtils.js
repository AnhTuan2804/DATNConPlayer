const i18n = require('i18n');

const ENGLISH = 'en';
const JAPAN = 'ja';

function userMessage(lang = JAPAN) {
    lang = checkLang(lang);
    const language = i18n.__({
        phrase: 'USER',
        locale: lang,
    });
    return language;
}

/* * ***************************************** Function helper ************************************************ */

function checkLang(lang = JAPAN) {
    if (lang !== ENGLISH && lang !== JAPAN) {
        lang = JAPAN;
    }
    return lang
}
module.exports = {
    userMessage
}
