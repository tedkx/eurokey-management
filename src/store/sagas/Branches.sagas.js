import { call, put, all, takeLatest } from 'redux-saga/effects'

import StoreHelper from '../../lib/StoreHelper'
import Api from '../../lib/Api'
import { BRANCHES_ACTION_TYPES as BAT } from '../actions/Branches.actions'

function* fetchBranches(action) {
    try {
        const response = yield call(Api.fetchBranches, action.payload);
        yield put(StoreHelper.createAction(BAT.BRANCHES_FETCH_SUCCESS, response.data));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(BAT.BRANCHES_FETCH_FAIL, e));
    }
}

function* watchFetchBranches() {
     yield takeLatest(BAT.BRANCHES_FETCH, fetchBranches);
}

export default function* storesSagas() {
    yield all([
        watchFetchBranches()
    ])
};