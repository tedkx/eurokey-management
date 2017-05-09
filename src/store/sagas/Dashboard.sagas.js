import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import StoreHelper from '../../lib/StoreHelper'
import Api from '../../lib/Api'
import { DASH_ACTION_TYPES as DAT } from '../actions/Dashboard.actions'

function* fetchDashboardData(action) {
    try {
        const response = yield call(Api.fetchDashboardData);
        yield put(StoreHelper.createAction(DAT.FETCH_DATA_SUCCESS, response.data));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(DAT.FETCH_DATA_FAIL, e));
    }
}

function* dashboardSagas() {
    yield takeLatest(DAT.FETCH_DATA, fetchDashboardData);
}

export default dashboardSagas;