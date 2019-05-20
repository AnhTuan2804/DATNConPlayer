export default class Constants {
    // static token, locale, currency
    // static HOST = 'https://datncsplayer.herokuapp.com/api'; // Server Test
    static HOST = 'http://192.168.137.9:8088/api'; // Server deployed
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
    static REQUIRE = 'Required';
    static DONT_SPACE = 'Don\'t leave spaces at the beginning or end of the string';
    static DONT_DOT = 'No point at the end of the sentence';
    static PASS_MAXLENGTH = 'Password length can not exceed 40 characters. ';
    static PASS_MINLENGTH = 'Password must be at least 6 characters. ';
    static PASS_CONF_NOTMATCH = 'Password does not match. ';
    static EMAIL_VALID = 'Email must be valid email';
    static EMAIL_NUMBER_VALID = 'Your email address or user ID is invalid. ';

    // EXIT_APP
    static TITLE_EXIT_APP = '終了アプリ';
    static TITLE_FONFIRM_EXIT = '退室しますか？';
    static TITLE_NO = 'No';
    static TITLE_YES = 'Yes';

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


    static TYPE_LEAUGE = [
        {
            id: 'type_1',
            name: "Round Circle",
        }, {
            id: 'type2',
            name: 'Two Stages',
        }
    ]
}