import axios from 'axios';

const API_BASE_URL = 'http://184.72.86.235';

export const chatApi = {
  sendMessage: async (request) => {
    const response = await axios.post(`${API_BASE_URL}/chat`, request);
    return response.data;
  },

  getChatHistory: async (sessionId) => {
    const response = await axios.get(`${API_BASE_URL}/chat-history/${sessionId}`);
    return response.data.history;
  },

  getUserSessions: async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/user-sessions/${userId}`);
    return response.data.sessions;
  },

  createSession: async (sessionData) => {
    const response = await axios.post(`${API_BASE_URL}/create-session`, sessionData);
    return response.data;
  }
};

// import axios from 'axios';

// const API_BASE_URL = 'http://10.1.208.192:9000';

// export const chatApi = {ß
//   sendMessage: async (request) => {
//     const response = await axios.post(`${API_BASE_URL}/chat`, request);
//     return response.data;
//   },

//   getChatHistory: async (sessionId) => {
//     const response = await axios.get(`${API_BASE_URL}/chat-history/${sessionId}`);
//     return response.data.history;
//   },

//   getUserSessions: async (userId) => {
//     const response = await axios.get(`${API_BASE_URL}/user-sessions/${userId}`);
//     return response.data.sessions;
//   }
// };