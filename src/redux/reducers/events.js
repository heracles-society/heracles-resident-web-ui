export const EVENTS_SET_DATA = '[EVENTS] SET_DATA';
export const EVENTS_SET_STATUS = '[EVENTS] SET_STATUS';
export const EVENTS_SET_MESSAGE = '[EVENTS] SET_MESSAGE';

export const EVENTS_STATUS = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initialState = {
  data: [],
  status: EVENTS_STATUS.PENDING,
  message: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case EVENTS_SET_STATUS:
      return {...state, status: payload.status};
    case EVENTS_SET_MESSAGE:
      return {...state, message: payload.message};
    case EVENTS_SET_DATA:
      return {...state, data: payload.data};
    default:
      return state;
  }
};
