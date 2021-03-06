import { Injectable } from "@angular/core";
import * as _ from 'lodash'

@Injectable()
export class Team {
    allTeam = [];
    constructor() { }
    setteam(teams, tab) {
        this.allTeam = [];
        let stt = 1;
        _.forEach(teams, (team => {
            let data = [];
            data['team'] = team;
            data['content'] = [
                { title: stt },
                { title: team.name }
            ];
            stt++;
            if (tab == 'Admin' || team.team_users[0].is_captain == 1) {
                data['actions'] = ['Edit', 'Delete'];
            } else {
                data['actions'] = ['View'];
            }
            this.allTeam.push(data);
        }))
        return this.allTeam;
    }

    getListTeamForDropdown(teams) {
        let tmp = [];
        _.forEach(teams, (team => {
            let data = [];
            data['team'] = team;
            data['itemName'] = team.name;
            tmp.push(data);
        }))
        return tmp;
    }

    getAllTeam() {
        return this.allTeam
    }
}
