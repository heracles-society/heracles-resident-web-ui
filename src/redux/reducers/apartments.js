export const APARTMENTS_SET_DATA = '[APARTMENTS] SET_DATA';
export const APARTMENTS_SET_STATUS = '[APARTMENTS] SET_STATUS';
export const APARTMENTS_SET_MESSAGE = '[APARTMENTS] SET_MESSAGE';

export const APARTMENTS_STATUS = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initialState = {
  data: [],
  status: APARTMENTS_STATUS.PENDING,
  message: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case APARTMENTS_SET_STATUS:
      return {...state, status: payload.status};
    case APARTMENTS_SET_MESSAGE:
      return {...state, message: payload.message};
    case APARTMENTS_SET_DATA:
      return {...state, data: payload.data};
    default:
      return state;
  }
};
