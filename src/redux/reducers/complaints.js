export const COMPLAINTS_SET_DATA = '[COMPLAINTS] SET_DATA';
export const COMPLAINTS_SET_STATUS = '[COMPLAINTS] SET_STATUS';
export const COMPLAINTS_SET_MESSAGE = '[COMPLAINTS] SET_MESSAGE';

export const COMPLAINTS_STATUS = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initialState = {
  data: [],
  status: COMPLAINTS_STATUS.PENDING,
  message: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case COMPLAINTS_SET_STATUS:
      return {...state, status: payload.status};
    case COMPLAINTS_SET_MESSAGE:
      return {...state, message: payload.message};
    case COMPLAINTS_SET_DATA:
      return {...state, data: payload.data};
    default:
      return state;
  }
};
