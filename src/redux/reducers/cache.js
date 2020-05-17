export const RESET_CACHE = '[cache]reset';
export const ADD_ONE_TO_CACHE = '[cache]add_one';
export const REMOVE_ONE_FROM_CACHE = '[cache]remove_one';

const addToCache = (state, payload) => {
  const {key, value} = payload;
  return {
    ...state,
    [key]: {
      data: value,
      addedAt: new Date().toISOString(),
    },
  };
};

const initialState = {};
export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_ONE_TO_CACHE:
      return addToCache(state, payload);
    case REMOVE_ONE_FROM_CACHE:
      return state;
    case RESET_CACHE:
      return initialState;
    default:
      return state;
  }
};
