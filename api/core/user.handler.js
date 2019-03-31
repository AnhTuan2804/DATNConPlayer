// 'use strict'
const db = require('../shared/db/db');
const _ = require('lodash');
const PasswordManagement = require('../shared/security/passwordManagement');
const EmailHelper = require('../shared/helpers/emailHelper');
const emailHelper = new EmailHelper();
const passwordManagement = new PasswordManagement();
class UserHandler {

    createNewUser(data) {
        return db.getSequelize().transaction(function (transaction) {
            return db.user.find(db.getTransaction(transaction, { where: { email: data.email } })).then((user) => {
                if (user !== null) {
                    throw new Error("Email đã tồn tại!");
                } else {
                    return db.user.find(db.getTransaction(transaction, { where: { phone: data.phone } })).then(async (user) => {
                        if (user !== null) {
                            throw new Error("Số điện thoại đã tồn tại!");
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

    editPassWord(token, oldPasswordBase64, newPasswordBase64) {
        const newPassword = Buffer.from(newPasswordBase64, 'base64');
        const oldPassword = Buffer.from(oldPasswordBase64, 'base64');
        return db.user.changePass(token, oldPassword, newPassword).then((user) => {
            return user
        })
    }

    editPassWordUser(id, newPasswordBase64) {
        const newPassword = Buffer.from(newPasswordBase64, 'base64');
        return db.user.changePassUser(id, newPassword).then((user) => {
            return user
        })
    }

    findUserByToken(token) {
        return db.user.find({ where: { token: token } })
            .then((user) => {
                if (user) {
                    return user.getUser();
                } else {
                    throw new Error("Tài khoản không tồn tại!");
                }
            });
    }

    editProfile(token, body) {
        const whereClause = {
            token: token
        };
        // return db.user.find({ where: whereClause })
        //     .then((user) => {
        //         if (body.userName && body.userName == user.user_name) {
        //             return this.saveUser(user, body);
        //         } else {
        //             return db.user.find({ where: { user_name: body.userName } }).then((userExist) => {
        //                 if (userExist !== null) {
        //                     throw new Error("user_name already exists");
        //                 } else {
        //                     return this.saveUser(user, body);
        //                 }
        //             })
        //         }
        //     });
    }

    editUser(body) {
        const whereClause = {
            id: body.id
        }
        return db.user.find({ where: whereClause })
            .then((user) => {

                // if (body.userName && body.userName == user.user_name) {
                //     return this.saveUser(user, body);
                // } else {
                //     return db.user.find({ where: { user_name: body.userName } }).then((userExist) => {
                //         if (userExist !== null) {
                //             throw new Error("user_name already exists");
                //         } else {
                //             return this.saveUser(user, body);
                //         }
                //     })
                // }
            });
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
            return result
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

    doDeleteUser(id) {
        return db.user.deleteUser(id).then((user) => {
            if (user > 0) {
                return user;
            } else {
                throw new Error('Tài khoản không tồn tại!');
            }
        });
    }

    resetPassword(email) {
        return db.user.find({ where: { email: email } }).then((user) => {
            if (!user) {
                throw new Error('Sai địa chỉ email!');
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