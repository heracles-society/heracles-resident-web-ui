export const GET_CONVERSATION = 'GET_CONVERSATION';
export const SET_CONVERSATION = 'SET_CONVERSATION';
export const UPDATE_VISIBLE_STATUS = 'UPDATE_VISIBLE_STATUS';
export const UPDATE_TEXT_ENABLED = 'UPDATE_TEXT_ENABLED';
export const SET_DEFAULT_MESSAGE = 'SET_DEFAULT_MESSAGE';
export const REMOVE_SELECTION = 'REMOVE_SELECTION';
export const SET_SOUND = 'SET_SOUND';
export const SAVE_CONVERSATION_IN_DB = 'SAVE_CONVERSATION_IN_DB';

const messageState = [
  {
    sender: false,
    title: `Welcome to Heracles Emergency Support Team. Please select call or chat option for continue.`,
    selection: [
      {
        title: 'Chat',
        color: 'primary',
      },
      {
        title: 'Call',
        color: 'secondary',
      },
    ],
  },
];
const initialState = {
  isChatBoxVisible: false,
  isTextBoxEnabled: true,
  isSoundEnabled: true,
  messages: messageState,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_CONVERSATION:
      return {...state, messages: state.messages.concat(payload.message)};
    case UPDATE_VISIBLE_STATUS:
      return {...state, isChatBoxVisible: payload.status};
    case UPDATE_TEXT_ENABLED:
      return {...state, isTextBoxEnabled: payload.status};
    case SET_SOUND:
      return {...state, isSoundEnabled: payload.status};
    case SET_DEFAULT_MESSAGE:
      return {...state, messages: messageState};
    case REMOVE_SELECTION:
      const msg = [...state.messages];
      msg[payload.index].selection = [];
      return {...state, messages: msg};
    default:
      return state;
  }
};
