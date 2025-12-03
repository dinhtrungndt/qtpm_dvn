import api from './api';

const chatService = {
  getHistory: async (otherUserId) => {
    const res = await api.get(`/chat/history/${otherUserId}`);
    return res.data;
  },

  getConversations: async () => {
    const res = await api.get(`/chat/conversations`);
    return res.data;
  },

  markAsRead: async (userId) => {
    return await api.put(`/chat/read/${userId}`);
  }
};

export default chatService;
