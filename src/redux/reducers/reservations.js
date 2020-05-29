export const RESERVATIONS_SET_DATA = '[INVENTORIES] SET_DATA';
export const RESERVATIONS_SET_STATUS = '[INVENTORIES] SET_STATUS';
export const RESERVATIONS_SET_MESSAGE = '[INVENTORIES] SET_MESSAGE';

export const RESERVATIONS_STATUS = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initialState = {
  data: [],
  status: RESERVATIONS_STATUS.PENDING,
  message: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case RESERVATIONS_SET_STATUS:
      return {...state, status: payload.status};
    case RESERVATIONS_SET_MESSAGE:
      return {...state, message: payload.message};
    case RESERVATIONS_SET_DATA:
      return {...state, data: payload.data};
    default:
      return state;
  }
};
