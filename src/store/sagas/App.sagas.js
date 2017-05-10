import { call, put, all, takeLatest } from 'redux-saga/effects'

import StoreHelper from '../../lib/StoreHelper'
import Api from '../../lib/Api'
import { APP_ACTION_TYPES as AT } from '../actions/App.actions'

function* login(action) {
    try {
        const response = yield call(Api.login, action.payload);
        yield put(StoreHelper.createAction(AT.LOGIN_SUCCESS, response.data));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(AT.LOGIN_FAIL, e));
    }
}

export function* watchLogin() {
     yield takeLatest(AT.LOGIN, login);
}

export default function* appSagas() {
    yield all([
        watchLogin()
    ])
};