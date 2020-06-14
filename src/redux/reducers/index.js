import {combineReducers} from 'redux';

import apartments from './apartments';
import cache from './cache';
import complaints from './complaints';
import emergency from './emergency';
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
    emergency,
    organizations,
    reservations,
    session,
    societies,
    onboarding,
  });
};
