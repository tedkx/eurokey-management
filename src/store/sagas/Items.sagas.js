import { call, put, all, takeLatest } from 'redux-saga/effects'

import StoreHelper from '../../lib/StoreHelper'
import Api from '../../lib/Api'
import { ITEMS_ACTION_TYPES as IAT } from '../actions/Items.actions'

/*
function* fetchKeys(action) {
    try {
        const content = yield call(Api.fetchKeys, action.payload);
        yield put(StoreHelper.createAction(IAT.KEYS_FETCH_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.KEYS_FETCH_FAIL, e));
    }
}

function* watchFetchKeys() { yield takeLatest(IAT.KEYS_FETCH, fetchKeys); }

function* fetchCombinations(action) {
    try {
        const content = yield call(Api.fetchCombinations, action.payload);
        yield put(StoreHelper.createAction(IAT.COMBINATIONS_FETCH_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.COMBINATIONS_FETCH_FAIL, e));
    }
}

function* watchFetchCombinations() { yield takeLatest(IAT.COMBINATIONS_FETCH, fetchCombinations); }

function* fetchKeys(action) {
    try {
        const content = yield call(Api.fetchKeys, action.payload);
        yield put(StoreHelper.createAction(IAT.KEYS_FETCH_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.KEYS_FETCH_FAIL, e));
    }
}

function* watchFetchKeys() { yield takeLatest(IAT.KEYS_FETCH, fetchKeys); }
*/

function* fetchLocks(action) {
    try {
        const content = yield call(Api.fetchLocks, action.payload);
        yield put(StoreHelper.createAction(IAT.LOCKS_FETCH_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.LOCKS_FETCH_FAIL, e));
    }
}
function* watchFetchLocks() { yield takeLatest(IAT.LOCKS_FETCH, fetchLocks); }

export default function* itemsSagas() {
    yield all([
        watchFetchLocks(),
        // watchFetchKeys(),
        // watchFetchCombinations(),
        // watchFetchKeys()
    ])
}