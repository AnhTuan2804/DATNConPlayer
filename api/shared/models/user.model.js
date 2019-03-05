const _ = require('lodash');
const moment = require('moment');

const firebaseCommon = require('../../shared/helpers/firebaseCommon');
const appConstant = require('../helpers/appConstant');

const TABLE_MEMBER = appConstant.DATA_TABLE.MEMBER;
const TABLE_TOKEN = appConstant.DATA_TABLE.TOKEN;
const TABLE_SOCIAL_NETWORK = appConstant.DATA_TABLE.SOCIAL_NETWORK;
/** ******************************************** Table member ***************************************** */

/**
 * Function get list member by field
 * @param {*} field
 * @param {*} value
 * @returns {*} list Object
 */
const findByField = async (field, value) => {
    const datas = await firebaseCommon.equalTo(`${TABLE_MEMBER}`, `${field}`, value);
    _.map(datas, (data, key) => {
        data.id = key
    })
    return datas
}

/**
 * Function create member
 * @param {*} data
 * @returns id record
 */
const create = async (data) => {
    const id = await firebaseCommon.create(data, `${TABLE_MEMBER}`);
    return id;
}

/**
 * Function update member
 * @param {*} id
 * @param {*} data
 */
const update = async (id, data) => {
    await firebaseCommon.update(data, `${TABLE_MEMBER}/${id}`);
}

/**
 * Function get list member
 * @returns {*} List object
 */
const getList = async () => {
    const datas = await firebaseCommon.read(`${TABLE_MEMBER}`);
    _.forEach(datas, (data, key) => {
        data.id = key
    })
    return datas
}

/**
 * Function get user by Id
 * @param {*} id
 * @returns {*} Object user or null
 */
const getUserById = async (id) => {
    if (!id) {
        return null;
    }
    const user = await firebaseCommon.read(`${TABLE_MEMBER}/${id}`);
    return user ? Object.assign(user, {
        id
    }) : null;
}


/**
 * Function get user by email
 * @param {*} email
 * @returns {*} Object user or null
 */
const getUserByEmail = async (email) => {
    const users = await firebaseCommon.equalTo(`${TABLE_MEMBER}`, 'email', email);
    const keys = Object.keys(users || {});
    if (keys.length === 0) {
        return null;
    }
    return _.merge(users[keys[0]], {
        id: keys[0]
    })
}

/** ******************************************** Table token ****************************************** */

/**
 * Function create token account
 * @param {*} data {member_id, token}
 * @returns {*} id record
 */
const createToken = async (data) => {
    const id = await firebaseCommon.create(data, `${TABLE_TOKEN}`);
    return id;
}

/**
 * Function remove token account
 * @param {*} id id record token
 */
const removeToken = async (id) => {
    await firebaseCommon.remove(`${TABLE_TOKEN}/${id}`);
}

/**
 * Function get user by token
 * @param {*} token
 * @returns {*} Object user or null
 */
const getUserByToken = async (token) => {
    const tokens = await firebaseCommon.equalTo(`${TABLE_TOKEN}`, 'token', token);
    const keys = Object.keys(tokens || {});
    if (keys.length === 0 || !tokens[keys[0]].member_id) {
        return null;
    }
    const id = tokens[keys[0]].member_id;
    const user = await firebaseCommon.read(`${TABLE_MEMBER}/${id}`);
    return user ? Object.assign(user, {
        id
    }) : null;
}

const removeUserToken = async (token) => {
    const record = await firebaseCommon.read(`${TABLE_TOKEN}`, 'token', token);
    await firebaseCommon.remove(`${TABLE_TOKEN}/${Object.keys(record)[0]}`);
}

/**
 *
 * @param {*} id
 */
const removeTokenByMemberId = async (id) => {
    const tokens = await firebaseCommon.equalTo(`${TABLE_TOKEN}`, 'member_id', id);
    const keys = Object.keys(tokens || {});
    if (keys.length === 0) {
        return false;
    }
    const dataUpdate = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        dataUpdate[`${key}`] = null;
    }
    await firebaseCommon.update(dataUpdate, `${TABLE_TOKEN}`, true);
    return true;
}

/**
 * Function remove expried token
 */
const removeExpriedToken = async () => {
    const listToken = await firebaseCommon.read(`${TABLE_TOKEN}`);
    const now = moment().unix();
    const dataRemove = {};
    _.forEach(listToken, (value, key) => {
        if (now - Number(value.created_at || 0) > appConstant.TIME_EXP_TOKEN) {
            dataRemove[`${key}`] = null;
        }
    })
    if (Object.keys(dataRemove).length > 0) {
        await firebaseCommon.update(dataRemove, `${TABLE_TOKEN}`, true);
    }
}

/** ******************************************** Table social_network ********************************* */

/**
 * Function create social network account
 * @param {*} data {member_id, social_id, type}
 * @returns {*} id record
 */
const createSocialAccount = async (data) => {
    const id = await firebaseCommon.create(data, `${TABLE_SOCIAL_NETWORK}`);
    return id;
}

/**
 * Function get user by social Id
 * @param {*} socialId
 * @param {*} type
 * @returns Object User or null
 */
const getUserBySocialId = async (socialId, type) => {
    const accounts = await firebaseCommon.equalTo(`${TABLE_SOCIAL_NETWORK}`, 'social_id', socialId);
    const keys = Object.keys(accounts || {});
    if (keys.length === 0 || accounts[keys[0]].type !== type || !accounts[keys[0]].member_id) {
        return null;
    }
    const id = accounts[keys[0]].member_id;
    const user = await firebaseCommon.read(`${TABLE_MEMBER}/${id}`);
    return user ? Object.assign(user, {
        id
    }) : null;
}

/**
 * @description Delete user by id request
 * @param {*} id
 */
const removeSocialByMemberId = async (id) => {
    const social = await getSocialByMemberId(id);
    if (!social) {
        return null;
    }
    // await deletedMemberModel.moveSocialThroughTableDeleted(social);
    const result = await firebaseCommon.remove(`${TABLE_SOCIAL_NETWORK}/${social.id}`);
    return result;
}
/**
 * @description Get data social by member id removed.
 * @param {*} id
 */
const getSocialByMemberId = async (id) => {
    const account = await firebaseCommon.equalTo(`${TABLE_SOCIAL_NETWORK}`, 'member_id', id);
    if (!account) {
        return null;
    }
    const key = Object.keys(account || {});
    account[key[0]].id = key[0];
    return account[key[0]];
}

/**
 * @description: Get info of user
 * @param {*} id
 */
const getInfoUserFromUser = async (user) => {
    return _.pick(user, ['name', 'url_logo', 'email', 'description', 'id'])
}

/**
 * Function filter info user for analytics
 * @param {*} user
 */
const filterInfoUserForAnalytics = async (user) => {
    return _.pick(user, ['name', 'url_logo', 'email', 'description', 'id', 'zipcode', 'sex', 'birthday', 'type'])
}
/**
 * @description Delete user by id request
 * @param {*} id
 */
const removeUserById = async (id) => {
    const result = await firebaseCommon.remove(`${TABLE_MEMBER}/${id}`);
    return result;
}

module.exports = {
    findByField,
    create,
    update,
    getList,
    getUserById,
    getUserByToken,
    getUserByEmail,
    createSocialAccount,
    getUserBySocialId,
    createToken,
    removeToken,
    removeUserToken,
    removeExpriedToken,
    getInfoUserFromUser,
    filterInfoUserForAnalytics,
    removeUserById,
    removeSocialByMemberId,
    removeTokenByMemberId
}
