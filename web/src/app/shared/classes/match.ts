import { Injectable } from "@angular/core";
import * as _ from 'lodash'
import { TimeService } from '../../shared/services/helpers/time.service'
import { Utils } from "../enums/utils";

@Injectable()
export class Match {
    allMatch = [];
    constructor(private timeService: TimeService) { }
    setData(matches, email?) {
        this.allMatch = [];
        let stt = 1;
        _.forEach(matches, ((item, key) => {
            if (email && item.user.email != email) return;
            let data = [];
            data['match'] = item;
            data['content'] = [
                { title: stt },
                { title: this.timeService.formatDateFromTimeUnix(item.date_of_match, 'DD/MM/YYYY') },
                { title: item.time.time_start + ' : ' + item.time.time_end },
                { title: item.status },
                { title: item.team_guest ? item.team_guest.name : '' },
            ];
            stt++;
            data['actions'] = item.status == Utils.STATUS_NEW || item.status == Utils.STATUS_WAITTING ? ['Edit'] : [''];
            this.allMatch.push(data);
        }))
        return this.allMatch;
    }

    getAllMatch() {
        return this.allMatch
    }
}
