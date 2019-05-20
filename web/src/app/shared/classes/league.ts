import { Injectable } from "@angular/core";
import * as _ from 'lodash'
import { TimeService } from '../../shared/services/helpers/time.service'
import { Utils } from "../enums/utils";

@Injectable()
export class League {
    allLeague = [];
    constructor(private timeService: TimeService) { }
    setData(leagues) {
        this.allLeague = [];
        let stt = 1;
        _.forEach(leagues, ((item, key) => {
            const numberRegister = item.list_team ? `${item.list_team.length}/${item.number_of_teams}` : `0/${item.number_of_teams}`
            let data = [];
            data['league'] = item;
            data['content'] = [
                { title: stt },
                { title: item.name_of_league },
                { title: this.timeService.formatDateFromTimeUnix(item.date_expiry_register, 'DD/MM/YYYY') },
                { title: numberRegister },
                { title: item.status },
            ];
            stt++;
            data['actions'] = item.status == Utils.STATUS_NEW ? ['Edit'] : ['View'];
            this.allLeague.push(data);
        }))
        return this.allLeague;
    }

    getAllLeague() {
        return this.allLeague
    }
}
