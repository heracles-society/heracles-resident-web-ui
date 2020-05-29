export const SOCIETIES_SET_DATA = '[SOCIETIES] SET_DATA';
export const SOCIETIES_SET_STATUS = '[SOCIETIES] SET_STATUS';
export const SOCIETIES_SET_MESSAGE = '[SOCIETIES] SET_MESSAGE';

export const SOCIETIES_STATUS = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initialState = {
  data: [],
  status: SOCIETIES_STATUS.PENDING,
  message: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SOCIETIES_SET_STATUS:
      return {...state, status: payload.status};
    case SOCIETIES_SET_MESSAGE:
      return {...state, message: payload.message};
    case SOCIETIES_SET_DATA:
      return {...state, data: payload.data};
    default:
      return state;
  }
};
