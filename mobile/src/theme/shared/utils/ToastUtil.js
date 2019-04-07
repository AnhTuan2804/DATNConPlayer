import { Toast } from 'native-base';
import Constants from '../../../theme/variable/Constants';

export default class ToastUtil {
    static showToast(text, type) {
        Toast.show({
            text: text,
            buttonText: Constants.MODAL_OK,
            type: type,
            duration: 3000,
            position: 'top'
        });
    }
}

