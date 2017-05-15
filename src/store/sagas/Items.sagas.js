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

function* fetchLockBranchesAssignments(action) {
    try {
        const content = yield call(Api.fetchLockBranchesAssignments, action.payload);
        yield put(StoreHelper.createAction(IAT.LOCK_BRANCHES_ASSIGNMENTS_FETCH_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.LOCK_BRANCHES_ASSIGNMENTS_FETCH_FAIL, e));
    }
}
function* watchFetchLockBranchesAssignments() { yield takeLatest(IAT.LOCK_BRANCHES_ASSIGNMENTS_FETCH, fetchLockBranchesAssignments); }

function* saveLockBranchesAssignments(action) {
    try {
        const content = yield call(Api.saveLockBranchesAssignments, action.payload);
        yield put(StoreHelper.createAction(IAT.LOCK_BRANCHES_ASSIGNMENTS_SAVE_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.LOCK_BRANCHES_ASSIGNMENTS_SAVE_FAIL, e));
    }
}
function* watchSaveLockBranchesAssignments() { yield takeLatest(IAT.LOCK_BRANCHES_ASSIGNMENTS_SAVE, saveLockBranchesAssignments); }

function* fetchUnlockers(action) {
    try {
        const content = yield call(Api.fetchUnlockers, action.payload);
        yield put(StoreHelper.createAction(IAT.UNLOCKERS_FETCH_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.UNLOCKERS_FETCH_FAIL, e));
    }
}
function* watchFetchUnlockers() { yield takeLatest(IAT.UNLOCKERS_FETCH, fetchUnlockers); }

function* fetchUnlockerEmployeesAssignments(action) {
    try {
        const content = yield call(Api.fetchUnlockerEmployeesAssignments, action.payload.type, action.payload.id);
        yield put(StoreHelper.createAction(IAT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH_FAIL, e));
    }
}
function* watchFetchUnlockerEmployeesAssignments() { yield takeLatest(IAT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH, fetchUnlockerEmployeesAssignments); }

function* saveUnlockerEmployeesAssignments(action) {
    try {
        const content = yield call(Api.saveUnlockerEmployeesAssignments, action.payload.type, action.payload.id, action.payload.assignments);
        yield put(StoreHelper.createAction(IAT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE_SUCCESS, content));
    } catch (e) {
        yield put(StoreHelper.errorFromSaga(IAT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE_FAIL, e));
    }
}
function* watchSaveUnlockerEmployeesAssignments() { yield takeLatest(IAT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE, saveUnlockerEmployeesAssignments); }

export default function* itemsSagas() {
    yield all([
        watchFetchLocks(),
        watchFetchLockBranchesAssignments(),
        watchSaveLockBranchesAssignments(),
        
        watchFetchUnlockers(),
        watchFetchUnlockerEmployeesAssignments(),
        watchSaveUnlockerEmployeesAssignments()
    ])
}