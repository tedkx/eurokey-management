import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import StoreHelper from '../../lib/StoreHelper'
import Api from '../../lib/Api'
import { ITEMS_ACTION_TYPES as IAT } from '../actions/Items.actions'

function* fetchKeys(action) {
    try {
        const response = yield call(Api.fetchUser, action.payload);
        yield put(StoreHelper.createAction(IAT.KEYS_FETCH_SUCCESS, response.data));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.KEYS_FETCH_FAIL, e));
    }
}

function* itemsSaga() {
    yield takeLatest(IAT.KEYS_FETCH, fetchKeys);
}

export default itemsSaga;