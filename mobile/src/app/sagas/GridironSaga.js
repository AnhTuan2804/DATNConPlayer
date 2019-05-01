import {
    // getList
    IS_GET_LIST_GRIDIRON,
    GET_LIST_GRIDIRON_SUCCESSFULLY,
    GET_LIST_GRIDIRON_FAILED,

    // getdetail
    IS_GET_DETAIL_GRIDIRON,
    GET_DETAIL_GRIDIRON_SUCCESSFULLY,
    GET_DETAIL_GRIDIRON_FAILED,

    // create
    IS_CREATE_GRIDIRON,
    CREATE_GRIDIRON_SUCCESSFULLY,
    CREATE_GRIDIRON_FAILED,

    // update
    IS_UPDATE_GRIDIRON,
    UPDATE_GRIDIRON_SUCCESSFULLY,
    UPDATE_GRIDIRON_FAILED,

    // del
    IS_DEL_GRIDIRON,
    DEL_GRIDIRON_SUCCESSFULLY,
    DEL_GRIDIRON_FAILED,
    // createSub
    IS_CREATE_SUB_GRIDIRON,
    CREATE_SUB_GRIDIRON_SUCCESSFULLY,
    CREATE_SUB_GRIDIRON_FAILED,

    // delSub
    IS_DEL_SUB_GRIDIRON,
    DEL_SUB_GRIDIRON_SUCCESSFULLY,
    DEL_SUB_GRIDIRON_FAILED,

    // createPriceOnTime
    IS_CREATE_PRICE_ON_TIME,
    CREATE_PRICE_ON_TIME_SUCCESSFULLY,
    CREATE_PRICE_ON_TIME_FAILED,

    // delPriceOnTime
    IS_DEL_PRICE_ON_TIME,
    DEL_PRICE_ON_TIME_SUCCESSFULLY,
    DEL_PRICE_ON_TIME_FAILED,
} from '../actions/ActionTypes';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import { getListGridiron } from '../actions/GridironActions';

// create
function* createGridironSaga(action) {
    try {
        let body = JSON.stringify({
            "gridiron": {
                "name": action.value.name,
                "address": action.value.address,
                "phone": action.value.phone,
                "link_face": action.value.link_face,
                "area_id": action.value.area_id,
                "picture": action.value.picture,
                "description": action.value.description
            }
        });
        const result = yield Api.createGridironAPI(body);
        yield put({ type: CREATE_GRIDIRON_SUCCESSFULLY });
        if (result) {
            ToastUtil.showToast(Constants.MESSAGE_CREATE_SUCCESS, 'success')
            Actions.Manage()
            yield put(getListGridiron());
        }
    } catch (error) {
        yield put({ type: CREATE_GRIDIRON_FAILED, error });
    }
}

export function* watchCreateGridironSaga() {
    yield takeLatest(IS_CREATE_GRIDIRON, createGridironSaga);
}

// update
function* updateGridironSaga(action) {
    try {
        let body = JSON.stringify({
            "name": action.value.name,
            "address": action.value.address,
            "phone": action.value.phone,
            "link_face": action.value.link_face,
            "area_id": action.value.area_id,
            "picture": action.value.picture,
            "description": action.value.description,
            "id": action.value.id
        });
        const result = yield Api.updateGridironAPI(body);
        yield put({ type: UPDATE_GRIDIRON_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_UPDATE_SUCCESS, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: UPDATE_GRIDIRON_FAILED, error });
    }
}

export function* watchUpdateGridironSaga() {
    yield takeLatest(IS_UPDATE_GRIDIRON, updateGridironSaga);
}

// delete 
function* deleteGridironSaga(action) {
    try {
        let body = JSON.stringify({
            "id": action.id
        });
        const result = yield Api.delGridironAPI(body);
        yield put({ type: DEL_GRIDIRON_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_DELETE_SUCCESS, 'success')
        yield put(getListGridiron());
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: DEL_GRIDIRON_FAILED, error });
    }
}

export function* watchDeleteGridironSaga() {
    yield takeLatest(IS_DEL_GRIDIRON, deleteGridironSaga);
}

// get list 
function* getListGridironSaga(action) {
    try {
        const list = yield Api.getListGridironAPI();
        yield put({ type: GET_LIST_GRIDIRON_SUCCESSFULLY, listGridiron: list });
    } catch (error) {
        yield put({ type: GET_LIST_GRIDIRON_FAILED, error });
    }
}

export function* watchGetListGridironSaga() {
    yield takeLatest(IS_GET_LIST_GRIDIRON, getListGridironSaga);
}

// get detail
function* getGridironDetailSaga(action) {
    try {
        const id = action.value.id;
        const result = yield Api.getGridironDetailAPI(id);
        yield put({ type: GET_DETAIL_GRIDIRON_SUCCESSFULLY, infoGridiron: result });
    } catch (error) {
        yield put({ type: GET_DETAIL_GRIDIRON_FAILED, error });
    }
}

export function* watchGetGridironDetailSaga() {
    yield takeLatest(IS_GET_DETAIL_GRIDIRON, getGridironDetailSaga);
}

// add sub gridiron
function* addSubGridironSaga(action) {
    try {
        /**
         * listSub = [
         *  {
         *      name: nameOfSubGrin,
         *      size_gridiron_id: size_id,
         *      gridiron_id: id_gridiron
         *  },
         * {
         *      name: nameOfSubGrin,
         *      size_gridiron_id: size_id,
         *      gridiron_id: id_gridiron
         *  }
         * ]
         */
        let body = JSON.stringify({
            "sub_gridirons": action.value.listSub
        });
        const result = yield Api.addSubGridironAPI(body);
        yield put({ type: CREATE_SUB_GRIDIRON_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_CREATE_SUCCESS, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: CREATE_SUB_GRIDIRON_FAILED, error });
    }
}

export function* watchAddSubGridironSaga() {
    yield takeLatest(IS_CREATE_SUB_GRIDIRON, addSubGridironSaga);
}

// delete sub
function* deleteSubGridironSaga(action) {
    try {
        let body = JSON.stringify({
            "id": action.value.id
            //id of sub gridiron
        });
        const result = yield Api.delSubGridironAPI(body);
        yield put({ type: DEL_SUB_GRIDIRON_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_DELETE_SUCCESS, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: DEL_SUB_GRIDIRON_FAILED, error });
    }
}

export function* watchDeleteSubGridironSaga() {
    yield takeLatest(IS_DEL_SUB_GRIDIRON, deleteSubGridironSaga);
}


// add price on time
function* addPriceOnTimeSaga(action) {
    try {
        let body = JSON.stringify({
            "price": actione.value.price,
            "time_id": actione.value.time_id,
            "size_gridiron_id": actione.value.size_gridiron_id,
            "gridiron_id": action.value.gridiron_id
        });
        const result = yield Api.addPriceOnTimeAPI(body);
        yield put({ type: CREATE_PRICE_ON_TIME_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_CREATE_SUCCESS, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: CREATE_PRICE_ON_TIME_FAILED, error });
    }
}

export function* watchAddPriceOnTimeSaga() {
    yield takeLatest(IS_CREATE_PRICE_ON_TIME, addPriceOnTimeSaga);
}

// delete price on time
function* deletePriceOnTimeSaga(action) {
    try {
        let body = JSON.stringify({
            "id": action.value.id
            //id of price ontime
        });
        const result = yield Api.delSubGridironAPI(body);
        yield put({ type: DEL_PRICE_ON_TIME_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_DELETE_SUCCESS, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: DEL_PRICE_ON_TIME_FAILED, error });
    }
}

export function* watchDeletePriceOnTimeSaga() {
    yield takeLatest(IS_DEL_PRICE_ON_TIME, deletePriceOnTimeSaga);
}
