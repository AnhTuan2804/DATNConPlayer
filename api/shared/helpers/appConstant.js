module.exports = Object.freeze({
    TIME_EXP_RESTORE_REPORT: 30 * 24 * 60 * 60,
    TIME_EXP_TOKEN: 30 * 24 * 60 * 60,
    TIME_EXP_RESET_CODE: 30 * 60,
    TIME_EXP_VERIFY_EMAIL: 30 * 60,
    TIME_STAMP_ONE_DAY: 24 * 60 * 60,
    TIME_ONE_YEAR: 31556926,
    ROUND_COIN: 8,
    FORMAT_ID_PROJECT: '00000000000',
    LOCALE_DEFAULT: 'ja',
    LOCALE_HEADER: 'locale',
    DELETED: 1,
    HEADER: {
        LOCALE_DEFAULT: 'ja',
        LOCALE_HEADER: 'locale',
        AUTH: 'auth',
        ACCESS_TOKEN: 'access_token',
        TOKEN: 'token',
        LOCALE_ENGLISH: 'en'
    },
    USER: {
        TYPE_ACCOUNT: {
            EMAIL: 0,
            FACEBOOK: 1,
            TWITTER: 2,
            LINE: 3
        },
        STATUS: {
            NEW: 1,
            ACTIVE: 2,
            STOP: 3,
            FORCED_WITHDRAWAL: 4
        },
        ROLE: {
            ADMIN: 1
        }
    },
    DATA_TABLE: {
        MEMBER: 'member',
        TOKEN: 'token',
        SOCIAL_NETWORK: 'social_network',
        CATEGORY: 'category',
        DIFFUSE_MEMBER: 'diffuse_member',
        DIFFUSE_PROJECT: 'diffuse_project',
        SETTING: 'setting',
        PROJECT: 'project',
        RETURN_PROJECT: 'return_project',
        NEWS: 'news',
        BANK_ACCOUNT: 'bank_account',
        SUPPORT_PROJECT: 'support_project',
        FAV_PROJECT: 'fav_project',
        REPORT: 'report',
        LOCATION: 'location',
        FOLLOW_PROJECT: 'follow_project',
        CONTACT: 'contact',
        DELETED_PROJECT_HISTORY: 'deleted_project_history',
        DELETED: 'deleted_history',
        PAGE_VIEW: 'page_view',
        SESSION: 'session',
        EXPIRED_PROJECT: 'expired_project'
    },
    PROJECT: {
        LIMIT_RECOMMEND_PROJECT: 4,
        LIMIT_RETURN_PROJECT: 8,
        LIMIT_RETURN_FIND_PROJECT: 10
    },
    CONTACT_TYPE: {
        SYSTEM: 0,
        PROJECT: 1,
        SUPPORT_LIST: 2,
        USER_SEND_OWNER: 3,
        STATUS: {
            NEW: 0,
            READ: 1,
            SENT: 2
        }
    },
    REPORT: {
        TYPE: {
            PUBLIC: 1,
            DRAFT: 2
        },
        IS_DELETED: 1,
        LIMIT_RETURN_REPORT: 3
    },
    SUPPORT_PROJECT: {
        STATUS: {
            REFUNDED: 1,
            PAID: 2,
            PENDING_WAIT: 3,
            CANCEL: 4
        }
    },
    SYSTEM_ERROR: 'System error',
    ANALYTICS: {
        BOUNCE_RATE_TIME: 10,
        TYPE_DEVICE: {
            PC: 1,
            MOBILE: 2,
            TABLET: 3,
            OTHER: 4
        },
        TYPE_BROWSER: {
            CHROME: 1,
            FIREFOX: 2,
            SAFARI: 3,
            EE: 4,
            OPERA: 5,
            UCBROWSER: 6,
            FACEBOOK: 7,
            INSTAGRAM: 8,
            TWITTER: 9,
            OTHER: 10
        },
        GENDER: {
            MAN: 1,
            WOMAN: 2,
            OTHER: 3
        },
        AGE: {
            MIN_AGE: 1,
            MAX_AGE: 51,
            UNIT_AGE: 10
        },
        LOCATION: {
            UNKNOWN_LOCATION: 1
        }
    }
});
