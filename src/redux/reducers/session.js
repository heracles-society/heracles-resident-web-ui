export const SESSION_RESET = '[SESSION] RESET';
export const SESSION_SET_DATA = '[SESSION] SET_DATA';
export const SESSION_SET_STATUS = '[SESSION] SET_STATUS';
export const SESSION_SET_MESSAGE = '[SESSION] SET_MESSAGE';

export const SESSION_STATUS = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_IN_PROGRESS: 'LOGIN_IN_PROGRESS',
};

const initialState = {
  data: {
    accessToken: null,
    user: null,
  },
  status: SESSION_STATUS.PENDING,
  message: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SESSION_SET_STATUS:
      return {...state, status: payload.status};
    case SESSION_SET_MESSAGE:
      return {...state, message: payload.message};
    case SESSION_SET_DATA:
      return {
        ...state,
        data: {
          accessToken: payload.accessToken,
          user: payload.user,
        },
      };
    case SESSION_RESET:
      return initialState;
    default:
      return state;
  }
};
