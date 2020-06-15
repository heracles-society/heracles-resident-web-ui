import {takeLatest, all} from 'redux-saga/effects';

import {SAVE_CONVERSATION_IN_DB} from '../../reducers/emergency';

function* saveConvesationsSaga(action) {
  try {
    // eslint-disable-next-line no-console
    yield console.log(action.payload);
    // yield call(postAPI, '/events', {
    //   society: societyId,
    //   name: `On boarding ${sessionData.user.email}`,
    //   kind: 'ONBOARDING',
    //   description: `On boarding ${sessionData.user.email}`,
    //   createdBy: sessionData.user._id,
    // });
  } catch (err) {}
}

export function* saveConvesationsWatcher() {
  yield all([takeLatest(SAVE_CONVERSATION_IN_DB, saveConvesationsSaga)]);
}
