import {all, fork} from 'redux-saga/effects';

import {
  exchangeGoogleTokenSaga,
  restoreSessionSaga,
  persistAccessToken,
} from './session';
import {
  fetchUserOnBoardingStateSaga,
  fetchSocietiesSaga,
  requestOnboardingSaga,
} from './views/onboarding';

function* watchSagas() {
  yield all([
    fork(fetchUserOnBoardingStateSaga),
    fork(fetchSocietiesSaga),
    fork(requestOnboardingSaga),
    fork(persistAccessToken),
    fork(restoreSessionSaga),
    fork(exchangeGoogleTokenSaga),
  ]);
}

export default watchSagas;
