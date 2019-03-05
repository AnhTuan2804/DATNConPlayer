import { environment as config } from '../../../environments/environment';

export class MenuItems {
    items = [
        {
            title: 'Home',
            icon: 'icon-home',
            items: [
                { title: 'Sub 1', router: '', isNotShow: true }
            ]
        }
    ];

    validRouter = [];
}