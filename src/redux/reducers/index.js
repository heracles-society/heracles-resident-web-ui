import {combineReducers} from 'redux';

import cacheReducer from './cache';

export default () => {
  return combineReducers({
    cache: cacheReducer,
  });
};
