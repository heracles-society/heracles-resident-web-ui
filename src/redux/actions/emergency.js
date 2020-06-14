import {
  SET_CONVERSATION,
  UPDATE_VISIBLE_STATUS,
  UPDATE_TEXT_ENABLED,
  SET_SOUND,
  SET_DEFAULT_MESSAGE,
  REMOVE_SELECTION,
} from '../reducers/emergency';

export const setConversation = message => {
  return {
    type: SET_CONVERSATION,
    payload: {
      message,
    },
  };
};

export const updateVisibleStatus = status => {
  return {
    type: UPDATE_VISIBLE_STATUS,
    payload: {
      status,
    },
  };
};

export const updateTextEnabled = status => {
  return {
    type: UPDATE_TEXT_ENABLED,
    payload: {
      status,
    },
  };
};

export const setSound = status => {
  return {
    type: SET_SOUND,
    payload: {
      status,
    },
  };
};

export const setDefaultMessage = () => {
  return {
    type: SET_DEFAULT_MESSAGE,
  };
};

export const removeSelection = () => {
  return {
    type: REMOVE_SELECTION,
  };
};
