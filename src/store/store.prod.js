import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import appMiddlewares from '../redux/middlewares';
import rootReducer from '../redux/reducers';
import {startSagas} from '../redux/sagas';
import {loadData} from '../utils/localStorage';

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer(),
    preloadedState,
    applyMiddleware(thunk, ...appMiddlewares, sagaMiddleware),
  );

  startSagas(sagaMiddleware);
  return store;
};

const existingState = loadData() || {};
const defaultStore = configureStore(existingState);

export default {
  configureStore,
  defaultStore,
};
