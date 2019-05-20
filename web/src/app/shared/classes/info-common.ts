import { Injectable } from "@angular/core";
import * as _ from 'lodash'
import { Utils } from "../enums/utils";
@Injectable()
export class InfoCommon {
    allArea = [];
    constructor() { }

    getListTimeForDropDown(times) {
        const tmp = [];
        _.forEach(times, (item) => {
            let data = [];
            data['time'] = item;
            data['itemName'] = item.time_start + ' : ' + item.time_end;
            tmp.push(data);
        })
        return tmp;
    }

    getListSizeForDropDown(sizes) {
        const tmp = [];
        _.forEach(sizes, (item) => {
            let data = [];
            data['size'] = item;
            data['itemName'] = item.name;
            tmp.push(data);
        })
        return tmp;
    }

    getListTypeOfCompetition() {
        const tmp = [];
        tmp.push({
            type: {
                id: 'type_1',
                name: Utils.TYPE_LEAGUE_TWO_STAGES,
            },
            itemName: Utils.TYPE_LEAGUE_TWO_STAGES
        }, {
                type: {
                    id: 'type2',
                    name: Utils.TYPE_LEAGUE_ROUND_CIRCLE,
                },
                itemName: Utils.TYPE_LEAGUE_ROUND_CIRCLE
            })
        return tmp;
    }
}
