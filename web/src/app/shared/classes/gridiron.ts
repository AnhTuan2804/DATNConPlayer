import { Injectable } from "@angular/core";
import * as _ from 'lodash'

@Injectable()
export class Gridiron {
    allGridiron = [];
    constructor() { }
    setData(gridirons) {
        this.allGridiron = [];
        let stt = 1;
        _.forEach(gridirons, (gridiron => {
            let data = [];
            data['gridiron'] = gridiron;
            data['content'] = [
                { title: stt },
                { title: gridiron.name },
                { title: gridiron.area.name }
            ];
            stt++;
            data['actions'] = ['Edit', 'Delete'];
            this.allGridiron.push(data);
        }))
        return this.allGridiron;
    }

    getListForDropdown(gridirons) {
        let tmp = [];
        _.forEach(gridirons, (item => {
            let data = [];
            data['gridiron'] = item;
            data['itemName'] = item.name;
            tmp.push(data);
        }))
        return tmp;
    }

    getallGridiron() {
        return this.allGridiron
    }
}
