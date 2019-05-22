'use strict';
const db = require('../shared/db/db');
const admin = require('firebase-admin');
const firebaseDB = admin.database();
const _ = require('lodash');
const timeUtil = require('../shared/timeUntil');
const appConstant = require('../shared/appConstant');
class LeagueHandler {

    create(token, body) {
        return db.user.find({ where: { token: token } }).then((user) => {
            body.user = _.pick(user, ['email', 'id', 'fullname', 'phone', 'role_id']);
            body.date_expiry_register = timeUtil.getTimesUnixFromTimeFormat(body.date_expiry_register);
            const tmp_team = 'tmp_team_ababab';
            //chia lich vong tron
            const listTeam = [];
            if (body.type_league.name == appConstant.TYPE_LEAGUE_ROUND_CIRCLE) {
                for (let i = 1; i <= body.number_of_teams; i++) {
                    listTeam.push({
                        played: 0,
                        won: 0,
                        draw: 0,
                        lost: 0,
                        for: 0,
                        against: 0,
                        goal_diffrence: 0,
                        point: 0,
                        team: {
                            name: `Team${i}`
                        }
                    })
                }
                if (listTeam.length % 2 != 0) {
                    listTeam.push({ team: { name: tmp_team } });
                }

                const list = [];
                let left;
                let right;
                //so vong dau = n-1 vong(n la so doi)
                for (let i = 1; i < listTeam.length; i++) {
                    const round = [];
                    round.push({ team1: listTeam[i - 1].team, team2: listTeam[listTeam.length - 1].team })
                    left = i == 1 ? listTeam.length - 1 : i - 1;
                    right = i == (listTeam.length - 1) ? 1 : i + 1;
                    //so tran dau tron 1 vong(n/2 - 1 tran)
                    for (let j = 1; j < listTeam.length / 2; j++) {
                        round.push({ team1: listTeam[left - 1].team, team2: listTeam[right - 1].team })
                        left = left == 1 ? listTeam.length - 1 : left - 1;
                        right = right == (listTeam.length - 1) ? 1 : right + 1;
                    }
                    list.push(round)
                }

                const listRound = _.cloneDeep(list);
                _.forEach(list, (item) => {
                    listRound.push(item);
                })
                body['rounds'] = listRound;
            }
            _.remove(listTeam, (item) => {
                return item.team.name == tmp_team;
            })
            body['list_team_tmp'] = listTeam;

            return firebaseDB.ref('/league').push(body).then((result) => {
                return result;
            }).catch((err) => {
                throw err;
            })
        })
    }

    async update(body, date_expiry_register) {
        const id = body.id;
        if (!id) {
            return;
        }
        body = _.omit(body, ['id']);
        body.date_expiry_register = date_expiry_register ? date_expiry_register : timeUtil.getTimesUnixFromTimeFormat(body.date_expiry_register);
        try {
            return firebaseDB.ref('/league/' + id).update(body);
        }
        catch (err) {
            throw err;
        }
    }

    async updateMatch(body) {
        const path = `${body.id}/rounds/${body.current_round}/${body.current_match}`;
        const id = body.id;
        console.log(id);
        if (body.date_of_match) {
            body.date_of_match = timeUtil.getTimesUnixFromTimeFormat(body.date_of_match);
        }
        try {

            if (body.team1_score >-1) {
                body['is_updated_sroce'] = true;
                let listTeam
                await firebaseDB.ref(`/league/${id}`).once("value", function (snapshot) {
                    listTeam = snapshot.val().list_team_tmp;
                })

                _.forEach(listTeam, (item, index) => {
                    if (item.team.name == body.team1.name) {
                        //change data
                        item.for = item.for + body.team1_score;
                        item.against = item.against + body.team2_score;
                        item.played = item.played + 1;

                        if (body.team1_score > body.team2_score) {
                            item.won = item.won + 1;
                            item.point = item.point + 3;
                        } else if (body.team1_score < body.team2_score) {
                            item.lost = item.lost + 1;
                        } else {
                            item.draw = item.draw + 1;
                            item.point = item.point + 1;
                        }

                        //update
                        firebaseDB.ref(`/league/${id}/list_team_tmp/${index}`).update(item);
                    }

                    if (item.team.name == body.team2.name) {

                        item.for = item.for + body.team2_score;
                        item.against = item.against + body.team1_score;
                        item.played = item.played + 1;

                        if (body.team1_score < body.team2_score) {
                            item.won = item.won + 1;
                            item.point = item.point + 3;
                        } else if (body.team1_score > body.team2_score) {
                            item.lost = item.lost + 1;
                        } else {
                            item.draw = item.draw + 1;
                            item.point = item.point + 1;
                        }

                        //update
                        firebaseDB.ref(`/league/${id}/list_team_tmp/${index}`).update(item);
                    }
                })
            }

            body = _.omit(body, ['id', 'current_round', 'current_match']);
            return firebaseDB.ref(`/league/${path}`).update(body);

        }
        catch (err) {
            throw err;
        }
    }

    delete(body) {
        return db.career.deleteCareer(body).then((result) => {
            return result;
        });
    }

}
module.exports = new LeagueHandler();