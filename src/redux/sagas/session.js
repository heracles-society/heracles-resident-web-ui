import * as jwt from 'jsonwebtoken';
import {take, call, fork, cancel, put, select, delay} from 'redux-saga/effects';

import {postAPI, getAPI} from '../../utils/api';
import {AUTH_KEY, JWT_PUBLIC_KEY} from '../../utils/constants';
import {logError} from '../../utils/logger';
import {setStatus, setMessage, setData, reset} from '../actions/session';
import {SESSION_STATUS} from '../reducers/session';

export const SESSION__RESTORE = '[SAGAS] SESSION__RESTORE';
export const SESSION__EXCHANGE_GOOGLE_TOKEN =
  '[SAGAS] SESSION__EXCHANGE_GOOGLE_TOKEN';

let verifyTokenTask;

export function* validateTokenSaga() {
  while (true) {
    const accessToken = yield select(state => state.session?.data?.accessToken);
    localStorage.removeItem(AUTH_KEY);
    try {
      if (accessToken) {
        jwt.verify(accessToken, JWT_PUBLIC_KEY);
        localStorage.setItem(AUTH_KEY, accessToken);
      }
    } catch (error) {
      logError(error);
      if (accessToken) {
        localStorage.removeItem(AUTH_KEY);
        yield put(reset());
        yield put(setStatus(SESSION_STATUS.LOGGED_OUT));
        yield put(setMessage('You have been logged out'));
      }
    }
    yield delay(60000);
  }
}

function* exchangeGoogleTokenTask(googleAccessToken) {
  try {
    if (verifyTokenTask) {
      cancel(verifyTokenTask);
    }
    yield put(reset());
    yield put(setStatus(SESSION_STATUS.LOGIN_IN_PROGRESS));

    const {data} = yield call(
      postAPI,
      '/auth/google/token',
      {},
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      },
    );
    const accessToken = data.accessToken;
    const userInfo = jwt.verify(accessToken, JWT_PUBLIC_KEY);
    const {data: user} = yield call(getAPI, `/users/${userInfo.sub}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    yield put(setStatus(SESSION_STATUS.LOGGED_IN));
    yield put(setData({accessToken: accessToken, user: user}));
    localStorage.setItem(AUTH_KEY, accessToken);
    verifyTokenTask = yield fork(validateTokenSaga);
  } catch (error) {
    logError(error);
    yield put(setStatus(SESSION_STATUS.FAILED));
    yield put(setMessage('Failed while login...'));
  }
}

export function* exchangeGoogleTokenSaga() {
  let task;
  while (true) {
    const action = yield take(SESSION__EXCHANGE_GOOGLE_TOKEN);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(exchangeGoogleTokenTask, action.payload.googleToken);
  }
}

export function* restoreSessionSaga() {
  while (true) {
    yield take(SESSION__RESTORE);
    const accessToken = localStorage.getItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    try {
      if (verifyTokenTask) {
        cancel(verifyTokenTask);
      }
      if (accessToken) {
        yield put(setStatus(SESSION_STATUS.LOGIN_IN_PROGRESS));
        const userInfo = jwt.verify(accessToken, JWT_PUBLIC_KEY);
        const {data: user} = yield call(getAPI, `/users/${userInfo.sub}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        localStorage.setItem(AUTH_KEY, accessToken);
        yield put(setStatus(SESSION_STATUS.LOGGED_IN));
        yield put(setData({accessToken: accessToken, user: user}));
        verifyTokenTask = yield fork(validateTokenSaga);
      } else {
        yield put(setStatus(SESSION_STATUS.LOGGED_OUT));
      }
    } catch (error) {
      logError(error);
      if (accessToken) {
        localStorage.removeItem(AUTH_KEY);
        yield put(reset());
        yield put(setStatus(SESSION_STATUS.LOGGED_OUT));
        yield put(setMessage('You have been logged out'));
      }
    }
  }
}
