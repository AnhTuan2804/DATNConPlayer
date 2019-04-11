import { Injectable } from "@angular/core";
import * as _ from 'lodash'

@Injectable()
export class Level {
    allLevel = [];
    constructor() { }
    setData(levels) {
        this.allLevel = [];
        let stt = 1;
        _.forEach(levels, (level => {
            let data = [];
            data['level'] = level;
            data['content'] = [
                { title: stt },
                { title: level.level, link: true, clickAble: true }
            ];
            stt++;
            data['actions'] = ['Delete'];
            this.allLevel.push(data);
        }))
        return this.allLevel;
    }

    getListForDropdown(levels) {
        let tmp = [];
        _.forEach(levels, (level => {
            let data = [];
            data['level'] = level;
            data['itemName'] = level.level;
            tmp.push(data);
        }))
        return tmp;
    }

    getAll() {
        return this.allLevel
    }
}
