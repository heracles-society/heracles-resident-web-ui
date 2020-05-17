import {all, fork, delay} from 'redux-saga/effects';

function* dummy() {
  while (true) {
    try {
      yield delay(5500);
      yield 'testing';
    } catch (error) {}
  }
}

function* watchSagas() {
  yield all([fork(dummy)]);
}

export default watchSagas;
