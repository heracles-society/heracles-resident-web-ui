import {
  SESSION_SET_STATUS,
  SESSION_SET_MESSAGE,
  SESSION_SET_DATA,
} from '../reducers/session';
import {
  SESSION__EXCHANGE_GOOGLE_TOKEN,
  SESSION__RESTORE,
} from '../sagas/session';

export const reset = status => {
  return {
    type: SESSION_SET_STATUS,
    payload: {
      status,
    },
  };
};

export const setStatus = status => {
  return {
    type: SESSION_SET_STATUS,
    payload: {
      status,
    },
  };
};

export const setMessage = message => {
  return {
    type: SESSION_SET_MESSAGE,
    payload: {
      message,
    },
  };
};

export const setData = ({accessToken, user}) => {
  return {
    type: SESSION_SET_DATA,
    payload: {
      accessToken,
      user,
    },
  };
};

/** Sagas */

export const restoreSession = () => {
  return {
    type: SESSION__RESTORE,
    payload: {},
  };
};

export const startGoogleTokenExchange = googleToken => {
  return {
    type: SESSION__EXCHANGE_GOOGLE_TOKEN,
    payload: {
      googleToken,
    },
  };
};
