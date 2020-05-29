import {stringify} from 'qs';
import {take, call, fork, cancel, put, select, delay} from 'redux-saga/effects';

import {getAPI} from '../../../utils/api';
import {logError} from '../../../utils/logger';
import {
  setStatus,
  setMessage,
  setOnboardingData,
  setSocietyData,
} from '../../actions/views/onboarding';
import {ONBOARDING_STATUS} from '../../reducers/views/onboarding';
export const ONBOARDING__FETCH_STATE = '[SAGAS] ONBOARDING__FETCH_STATE';
export const ONBOARDING__REQUEST_NEW = '[SAGAS] ONBOARDING__REQUEST_NEW';
export const ONBOARDING__FETCH_SOCIETIES =
  '[SAGAS] ONBOARDING__FETCH_SOCIETIES';
export const ONBOARDING__CANCEL_ALL = '[SAGAS] ONBOARDING__CANCEL_ALL';

function* fetchUserOnBoardingStateTask() {
  try {
    yield put(setStatus(ONBOARDING_STATUS.LOADING));
    yield put(setMessage(null));
    yield put(setOnboardingData({onboarded: false}));
    const {data: sessionData} = yield select(state => state.session);
    const response = yield call(getAPI, '/events', {
      params: {
        q: stringify({
          createdBy: sessionData.user._id,
          kind: 'ONBOARDING',
        }),
        limit: 1,
      },
    });
    const {data} = response;
    const onboarded = data.length > 0;
    yield put(setStatus(ONBOARDING_STATUS.SUCCESS));
    yield put(setOnboardingData({onboarded}));
    if (onboarded === false) {
      yield put({type: ONBOARDING__FETCH_SOCIETIES});
    }
  } catch (error) {
    logError(error);
    yield put(setStatus(ONBOARDING_STATUS.FAILED));
    yield put(setMessage('Failed while fetching user onboarding status'));
  }
}

export function* fetchUserOnBoardingStateSaga() {
  let task;
  while (true) {
    yield take(ONBOARDING__FETCH_STATE);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(fetchUserOnBoardingStateTask);
  }
}

export function* fetchSocietiesSagaTask(search) {
  try {
    yield delay(500);
    const {data: onboardingState} = yield select(state => state.onboarding);
    yield put(
      setSocietyData({
        data: [],
        status: ONBOARDING_STATUS.LOADING,
        selectedSociety: onboardingState.societies.selectedSociety,
      }),
    );
    const response = yield call(getAPI, '/societies', {
      params: {
        q: stringify({
          name__regex: search ?? '',
        }),
        limit: 5,
      },
    });
    const {data} = response;
    yield put(
      setSocietyData({
        data,
        status: ONBOARDING_STATUS.SUCCESS,
        selectedSociety: onboardingState.societies.selectedSociety ?? data[0],
      }),
    );
  } catch (error) {
    logError(error);
    setSocietyData({
      data: [],
      status: ONBOARDING_STATUS.FAILED,
      selectedSociety: null,
    });
  }
}

export function* fetchSocietiesSaga() {
  let task;
  while (true) {
    yield take(ONBOARDING__FETCH_SOCIETIES);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(fetchSocietiesSagaTask);
  }
}
