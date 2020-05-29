import createSagaMonitor from '@clarketm/saga-monitor';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import appMiddlewares from '../redux/middlewares';
import rootReducer from '../redux/reducers';
import {startSagas, cancelSagas} from '../redux/sagas';
import {loadData} from '../utils/localStorage';

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: createSagaMonitor({
      level: 'log',
    }),
  });
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;
  const middlewares = [
    thunk,
    ...appMiddlewares,
    createLogger({
      collapsed: true,
    }),
    sagaMiddleware,
  ];
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(rootReducer(), preloadedState, enhancers);

  startSagas(sagaMiddleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../redux/reducers', () => {
      const nextRootReducer = require('../redux/reducers').default;
      store.replaceReducer(nextRootReducer);
    });

    module.hot.accept('../redux/sagas', () => {
      cancelSagas(store);
      const nextRootSaga = require('../redux/sagas');
      nextRootSaga.startSagas(sagaMiddleware);
    });
  }

  return store;
};

const existingState = loadData() || {};
const defaultStore = configureStore(existingState);

export default {
  configureStore,
  defaultStore,
};
