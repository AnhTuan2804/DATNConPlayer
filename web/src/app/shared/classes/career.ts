import { Injectable } from "@angular/core";
import * as _ from 'lodash'

@Injectable()
export class Career {
    allCareer = [];
    constructor() { }
    setData(careers) {
        this.allCareer = [];
        let stt = 1;
        _.forEach(careers, (item => {
            let data = [];
            data['career'] = item;
            data['content'] = [
                { title: stt },
                { title: item.name, link: true, clickAble: true }
            ];
            stt++;
            data['actions'] = ['Delete'];
            this.allCareer.push(data);
        }))
        return this.allCareer;
    }

    getListForDropdown(careers) {
        let tmp = [];
        _.forEach(careers, (item => {
            let data = [];
            data['career'] = item;
            data['itemName'] = item.name;
            tmp.push(data);
        }))
        return tmp;
    }

    getAll() {
        return this.allCareer
    }
}
