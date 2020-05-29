import {combineReducers} from 'redux';

import apartments from './apartments';
import cache from './cache';
import complaints from './complaints';
import events from './events';
import organizations from './organizations';
import reservations from './reservations';
import session from './session';
import societies from './societies';
/** State Reducers for views */
import onboarding from './views/onboarding';

export default () => {
  return combineReducers({
    cache,
    apartments,
    complaints,
    events,
    organizations,
    reservations,
    session,
    societies,
    onboarding,
  });
};
