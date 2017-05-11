import { call, put, all, takeLatest } from 'redux-saga/effects'

import StoreHelper from '../../lib/StoreHelper'
import Api from '../../lib/Api'
import { DASH_ACTION_TYPES as DAT } from '../actions/Dashboard.actions'

function* fetchDashboardData(action) {
    try {
        const content = yield call(Api.fetchDashboardData);
        yield put(StoreHelper.createAction(DAT.FETCH_DATA_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(DAT.FETCH_DATA_FAIL, e));
    }
}

function* watchFetchDashboardData() {
    yield takeLatest(DAT.FETCH_DATA, fetchDashboardData);
}

export default function* dashboardSagas() {
    yield all([
        watchFetchDashboardData()
    ])
};