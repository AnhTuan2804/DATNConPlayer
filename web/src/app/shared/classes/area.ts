import { Injectable } from "@angular/core";
import * as _ from 'lodash'

@Injectable()
export class Area {
    allArea = [];
    constructor() { }
    setArea(areas) {
        this.allArea = [];
        let stt = 1;
        _.forEach(areas, (area => {
            let data = [];
            data['area'] = area;
            data['content'] = [
                { title: stt },
                { title: area.area, link: true, clickAble: true }
            ];
            stt++;
            data['actions'] = ['Delete'];
            this.allArea.push(data);
        }))
        return this.allArea;
    }

    getAllArea() {
        return this.allArea
    }
}
