// import axios from 'axios';
import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { GET_USER, GET_USER_SUCCESS } from './actionTypes';
import { getUsers, getUsersSuccess, apiError } from './actions';

import { getUsersApi } from './api';

// const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(login, { email_address: user.username, password: user.password });
        if (response && response.status) {
            localStorage.setItem("authUser", btoa(JSON.stringify(response.data)));
            localStorage.setItem(btoa(btoa("token")), btoa(btoa(response.token)));
            yield put(loginSuccess(response));
            history.push('/dashboard');
        } else {
           yield put(apiError("Invalid credentials. Please login again."));
        }
    } catch (error) {
       yield put(apiError(error.message));
    }
}

function* logoutUser({ payload: { history } }) {
    try {
        localStorage.removeItem("authUser");
        yield put(logoutUserSuccess(''));
        history.push('/login');
    } catch (error) {
        yield put(apiError(error.message));
    }
}


export function* watchUserLogin() {
    yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default authSaga;