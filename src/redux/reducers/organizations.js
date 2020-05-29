export const ORGANIZATIONS_SET_DATA = '[ORGANIZATIONS] SET_DATA';
export const ORGANIZATIONS_SET_STATUS = '[ORGANIZATIONS] SET_STATUS';
export const ORGANIZATIONS_SET_MESSAGE = '[ORGANIZATIONS] SET_MESSAGE';

export const ORGANIZATIONS_STATUS = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initialState = {
  data: [],
  status: ORGANIZATIONS_STATUS.PENDING,
  message: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ORGANIZATIONS_SET_STATUS:
      return {...state, status: payload.status};
    case ORGANIZATIONS_SET_MESSAGE:
      return {...state, message: payload.message};
    case ORGANIZATIONS_SET_DATA:
      return {...state, data: payload.data};
    default:
      return state;
  }
};
