// import axios from 'axios';
import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { loginSuccess, logoutUserSuccess, apiError, LoaderHandler } from './actions';


import { login } from './api';


function* loginUser({ payload: { user, history } }) {
    try {
        // yield put(LoaderHandler(true));
        const response = yield call(login, { email_address: user.username, password: user.password });
        if (response && response.status) {
            localStorage.setItem("authUser", btoa(JSON.stringify(response.data)));
            localStorage.setItem(btoa(btoa("token")), btoa(btoa(response.token)));
            yield put(loginSuccess(response));
            history.push('/dashboard');
        } else {
            yield put(apiError("Invalid credentials. Please login again."));
        }
        //yield put(LoaderHandler(false));
    } catch (error) {
        //      yield put(LoaderHandler(false));
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