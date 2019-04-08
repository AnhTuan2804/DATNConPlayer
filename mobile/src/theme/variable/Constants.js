export default class Constants {
    // static token, locale, currency
    // static HOST = 'https://datncsplayer.herokuapp.com/api'; // Server Test
    static HOST = 'http://192.168.1.53:8088/api'; // Server deployed
    static TOKEN = '';
    static EMAIL_ADDRESS = '';
    static USER_ID = '';
    static TYPE_ACCOUNT = '';
    static PHONE = '';
    static AUTHENTICATION = null;
    static USER_IMAGE = null;

    // VALIDATE
    static REQUIRE = '必須';
    static DONT_SPACE = '最初と最後を空白にしないでください';
    static DONT_DOT = '文末に点がない';
    static PASS_MAXLENGTH = 'パスワードの長さは40文字を超えることはできません。';
    static PASS_MINLENGTH = 'パスワードは6文字以上でなければなりません。';
    static PASS_CONF_NOTMATCH = 'パスワードが一致しません。';
    static EMAIL_VALID = '電子メールは有効な電子メールでなければなりません';
    static EMAIL_NUMBER_VALID = 'あなたのメールアドレスまたはユーザーIDは無効です。';

    //Common
    static MESSAGE_ERROR = 'HTTP Error 400 - Bad Request';
    static MODAL_OK = 'OK';
    static MAX_AMOUNT_WITHDRAW_BTC = null;
    static MIN_AMOUNT_WITHDRAW_BTC = null;
    static MAX_AMOUNT_WITHDRAW_JPY = null;
    static MIN_AMOUNT_WITHDRAW_JPY = null;

    //Link app
    static LINK_TO_REGISTER = 'https://coins-payment.com/register/personal';
    static LINK_TO_CONFIRM_ACCOUNT_TYPE_1 = 'https://coins-payment.com/profile-personal';
    static LINK_TO_CONFIRM_ACCOUNT_TYPE_2 = 'https://coins-payment.com/profile';
    static LINK_TO_AUTHENTICATION_APP_IOS = 'https://itunes.apple.com/vn/app/google-authenticator/id388497605?mt=8';
    static LINK_TO_AUTHENTICATION_APP_ANDROID = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en';
    static LINK_TO_AUTHENTICATION_SETTING = 'https://coins-payment.com/setting/two-factor';
    static LINK_TO_SETTING = 'https://coins-payment.com/setting';
    static LINK_TO_CONTACT = 'https://coins-payment.com/contact';
    static LINK_TO_NOTIFICATION = 'https://coins-payment.com/setting/notification';
    static LINK_TO_CREATE_ADDRESS_BTC = 'https://coins-payment.com/setting/add-address';
    static LINK_TO_CREATE_ADDRESS_JPY = 'https://coins-payment.com/setting/add-bank';

    // EXIT_APP
    static TITLE_EXIT_APP = '終了アプリ';
    static TITLE_FONFIRM_EXIT = '退室しますか？';
    static TITLE_NO = 'いいえ';
    static TITLE_YES = 'はい';

    // Chuyen doi don vi (px--->>>dp)
    static RATE_SIZE = 2;

    // Table Color
    static red = '#D71920';
    static orange = '#F7931E';
    static snow = '#F1F1F1';
    static lightGrey = '#E5E5E5';
    static deepGrey = '#808080';
    static darkGrey = '#5D5D5D';
    static grey = '#CBCBCB';
    static auctionColor = '#EB3940';
    static white = '#FFFFFF';
    static blue = '#3FA7F3';
    static iconLightDark = '#515151';
    static activeControl = '#93a1bb';
    static navMenuTheme = '#36B092';
    static green = '#7fb439';
    static whiteSilver = '#f5f5f5';
    static turquoise = '#36b092';
}