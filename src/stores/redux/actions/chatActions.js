import chatService from '../../../services/chatService';
import * as types from '../types/index';

let ws = null;

export const connectWebSocketChat = (userId) => (dispatch) => {
  if (ws) {
    ws.close();
  }

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = process.env.REACT_APP_API_WEB_SOCKET;
  const wsUrl = `${protocol}://${host}/chat/ws/${userId}`;

  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('Chat WS Connected');
    dispatch({ type: types.WS_CONNECT });
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    dispatch({
      type: types.NEW_MESSAGE_RECEIVED,
      payload: message
    });
    dispatch(getConversations());
  };

  ws.onclose = () => {
    dispatch({ type: types.WS_DISCONNECT });
  };
};

export const sendMessage = (messageData) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(messageData));
  } else {
    console.error("WebSocket is not connected");
  }
};

export const getChatHistory = (otherUserId) => async (dispatch) => {
  dispatch({ type: types.GET_CHAT_HISTORY_REQUEST });
  try {
    const data = await chatService.getHistory(otherUserId);
    dispatch({ type: types.GET_CHAT_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_CHAT_HISTORY_FAILURE, payload: error });
  }
};

export const getConversations = () => async (dispatch) => {
  dispatch({ type: types.GET_CONVERSATIONS_REQUEST });
  try {
    const data = await chatService.getConversations();
    dispatch({ type: types.GET_CONVERSATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_CONVERSATIONS_FAILURE, payload: error });
  }
};

// Action mới: Đánh dấu đã đọc
export const markMessagesAsRead = (userId) => async (dispatch) => {
  try {
    await chatService.markAsRead(userId);
    dispatch(getConversations());
  } catch (error) {
    console.error("Lỗi mark read:", error);
  }
};

export const setActiveChat = (user) => ({
  type: types.SET_ACTIVE_CHAT,
  payload: user
});
