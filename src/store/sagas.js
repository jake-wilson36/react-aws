import { all } from 'redux-saga/effects';

//public
import AuthSaga from './auth/login/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';


export default function* rootSaga() {
    yield all([
        //public
        AuthSaga(),
        ForgetSaga(),
        LayoutSaga()
    ])
}