// 'use strict'
const db = require('../shared/db/db');
const _ = require('lodash');
const PasswordManagement = require('../shared/security/passwordManagement');
const EmailHelper = require('../shared/helpers/emailHelper');
const emailHelper = new EmailHelper();
const passwordManagement = new PasswordManagement();
const bcrypt = require('bcrypt')
class UserHandler {
    registerAccount(data) {
        return db.getSequelize().transaction(function (transaction) {
            return db.user.find(db.getTransaction(transaction, { where: { email: data.email } })).then((user) => {
                if (user !== null) {
                    throw new Error("Email is exist already!");
                } else {
                    return db.user.find(db.getTransaction(transaction, { where: { phone: data.phone } })).then(async (user) => {
                        if (user !== null) {
                            throw new Error("Phone is exist already!");
                        } else {
                            data['password'] = await passwordManagement.hashPassword(data.password);
                            return db.user.createUser(data, transaction).then((user) => {
                                return user
                            })
                        }
                    })
                }
            })
        })
    }

    editPassWord(token, body) {
        return db.user.find({ where: { token: token } }).then(async (user) => {
            if (user) {
                const checkPass = await bcrypt.compare(body.currentPassword, user.password);
                if (!checkPass) {
                    throw new Error('Wrong current password!')
                }
                body['id'] = user.id;
                body['password'] = await passwordManagement.hashPassword(body.newPassword);
                return db.user.updateUser(body).then((result) => {
                    return result;
                }).catch((err) => {
                    throw new Error(err);
                })
            }
        })
    }

    editPassWordUser(id, newPasswordBase64) {
        const newPassword = Buffer.from(newPasswordBase64, 'base64');
        return db.user.changePassUser(id, newPassword).then((user) => {
            return user
        })
    }

    findUserByToken(token) {
        return db.user.find({ where: { token: token }, include: [{ model: db.role }] })
            .then((user) => {
                if (user) {
                    return user;
                } else {
                    throw new Error("Account is not exist!");
                }
            });
    }

    editProfile(token, body) {
        const whereClause = {
            token: token
        };
        return db.user.find({ where: whereClause })
            .then((user) => {
                return db.user.find({ where: { phone: body.phone } }).then((userByPhone) => {
                    if (userByPhone && userByPhone.token != token) {
                        throw new Error('Phone is exist already!')
                    } else {
                        body['id'] = user.id;
                        return db.user.updateUser(body).then((result) => {
                            return result;
                        }).catch((err) => {
                            throw new Error(err);
                        })
                    }
                })
            });
    }

    createNewAccount(body) {
        return db.getSequelize().transaction(function (transaction) {
            return db.user.find(db.getTransaction(transaction, { where: { email: body.user.email } })).then((user) => {
                if (user !== null) {
                    throw new Error("Email is exist already!");
                } else {
                    return db.user.find(db.getTransaction(transaction, { where: { phone: body.user.phone } })).then(async (user) => {
                        if (user !== null) {
                            throw new Error("Phone is exist already!");
                        } else {
                            body.user.password = await passwordManagement.hashPassword(body.user.password);
                            return db.user.createUser(body.user, transaction).then((user) => {
                                return user
                            })
                        }
                    })
                }
            })
        })
    }

    saveUser(user, body) {
        user.email = body.email;
        user.phone = body.phone;
        user.fullname = body.fullname;
        return user.save().then((updateUser) => {
            return updateUser;
        });
    }

    getListUser() {
        return db.user.getListUser().then((result) => {
            return result;
        })
    }

    getListUserForAdmin() {
        return db.user.getListUserForAdmin().then((result) => {
            return result;
        })
    }

    getUserByToken(token) {
        return db.user.getUserByToken(token).then((result) => {
            return result;
        })
    }

    fiterListUser(listUser) {
        const arrayUser = [];
        _.forEach(listUser, (user) => {
            const tmp = user.getUser();
            arrayUser.push(tmp)
        })
        return arrayUser;
    }

    logOut(token) {
        const whereClause = {
            token: token
        };
        return db.user.find({ where: whereClause })
            .then((user) => {
                user.token = null;
                return user.save().then((updateUser) => {
                    return user.getUser();
                });
            });
    }

    doDeleteUser(body) {
        return db.user.deleteUser(body).then((user) => {
            if (user > 0) {
                return user;
            } else {
                throw new Error('Account is not exist!');
            }
        });
    }

    resetPassword(email) {
        return db.user.find({ where: { email: email } }).then((user) => {
            if (!user) {
                throw new Error('Email is not exist!');
            } else {
                const newPass = passwordManagement.getNonceString(10) + 'Abc1@';
                const hashPassword = passwordManagement.hashPassword(newPass);
                user.password = hashPassword;
                return user.save().then((result) => {
                    const detail = `Hi ${result.fullname},<br/><br/>You recenty forgoten the password for The System Connecting Football Team.Password has been reset to <b>${newPass}</b><br/>Please login.<br/><br/>Kindly Regards,<br/>Admin: Anh Tuan - Hien Dieu`
                    return emailHelper.sendEmail(`Resetting password for ${result.fullname}`, email, null, null, detail)
                });

            }
        })
    }
}

module.exports = new UserHandler();