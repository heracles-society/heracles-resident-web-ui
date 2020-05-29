export const ONBOARDING_RESET = '[ONBOARDING] RESET';
export const ONBOARDING_SET_STATUS = '[ONBOARDING] SET_STATUS';
export const ONBOARDING_SET_MESSAGE = '[ONBOARDING] SET_MESSAGE';
export const ONBOARDING_SET_DATA = '[ONBOARDING] SET_DATA';

export const ONBOARDING_STATUS = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initialState = {
  status: ONBOARDING_STATUS.PENDING,
  data: {
    onboarded: false,
    societies: {
      data: [],
      selectedSociety: null,
      status: ONBOARDING_STATUS.PENDING,
    },
  },
  message: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ONBOARDING_SET_STATUS:
      return {...state, status: payload.status};
    case ONBOARDING_SET_MESSAGE:
      return {...state, message: payload.message};
    case ONBOARDING_SET_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...payload.data,
        },
      };
    case ONBOARDING_RESET:
      return initialState;
    default:
      return state;
  }
};
