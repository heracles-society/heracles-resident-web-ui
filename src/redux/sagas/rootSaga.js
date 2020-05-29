import {all, fork} from 'redux-saga/effects';

import {exchangeGoogleTokenSaga, restoreSessionSaga} from './session';
import {
  fetchUserOnBoardingStateSaga,
  fetchSocietiesSaga,
} from './views/onboarding';

function* watchSagas() {
  yield all([
    fork(fetchUserOnBoardingStateSaga),
    fork(fetchSocietiesSaga),
    fork(restoreSessionSaga),
    fork(exchangeGoogleTokenSaga),
  ]);
}

export default watchSagas;
