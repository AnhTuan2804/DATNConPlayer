export default class Constants {
    // static token, locale, currency
    // static HOST = 'https://datncsplayer.herokuapp.com/api'; // Server Test
    static HOST = 'http://192.168.0.171:8088/api'; // Server deployed
    static TOKEN = '';
    static EMAIL_ADDRESS = '';
    static USER_ID = '';
    static TYPE_ACCOUNT = '';
    static PHONE = '';
    static AUTHENTICATION = null;
    static USER_IMAGE = null;
    static MESSAGE_CREATE_SUCCESS = 'Create data successfully';
    static MESSAGE_UPDATE_SUCCESS = 'Update data successfully';
    static MESSAGE_DELETE_SUCCESS = 'Delete data successfully';

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