import * as types from '../types/index';

const initialState = {
  connected: false,
  conversations: [],
  activeChatUser: null,
  messages: [],
  isLoading: false,
  error: null
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WS_CONNECT:
      return { ...state, connected: true };
    case types.WS_DISCONNECT:
      return { ...state, connected: false };

    case types.NEW_MESSAGE_RECEIVED:
      const newMsg = action.payload;

      let isRelevant = false;

      if (state.activeChatUser) {
        isRelevant = (newMsg.sender_id === state.activeChatUser.id || newMsg.receiver_id === state.activeChatUser.id);
      } else {
        isRelevant = true;
      }

      if (isRelevant) {
        return { ...state, messages: [...state.messages, newMsg] };
      }
      return state;

    case types.GET_CHAT_HISTORY_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_CHAT_HISTORY_SUCCESS:
      return { ...state, isLoading: false, messages: action.payload };

    case types.GET_CONVERSATIONS_SUCCESS:
      return { ...state, conversations: action.payload };

    case types.SET_ACTIVE_CHAT:
      return { ...state, activeChatUser: action.payload, messages: [] };

    default:
      return state;
  }
};

export default chatReducer;
