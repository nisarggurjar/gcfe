import React, { useState, useEffect } from 'react';
import { chatApi } from '../../api/chat';
import SessionList from './SessionList';
import ChatInterface from './ChatInterface';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = 'user123'; // In production, get this from auth system

  useEffect(() => {
    fetchUserSessions();
  }, []);

  useEffect(() => {
    if (activeSession) {
      fetchSessionHistory(activeSession.session_id);
    }
  }, [activeSession]);

  const fetchUserSessions = async () => {
    try {
      const fetchedSessions = await chatApi.getUserSessions(userId);
      setSessions(fetchedSessions);
      
      if (!activeSession && fetchedSessions.length > 0) {
        setActiveSession(fetchedSessions[0]);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchSessionHistory = async (sessionId) => {
    try {
      const history = await chatApi.getChatHistory(sessionId);
      setMessages(history);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      // Clear messages if session not found
      setMessages([]);
    }
  };

  const createNewSession = async () => {
    // First create a new session in the backend
    try {
      const sessionId = crypto.randomUUID();
      const response = await chatApi.createSession({
        session_id: sessionId,
        user_id: userId
      });
      
      const newSession = {
        session_id: sessionId,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setActiveSession(newSession);
      setMessages([]);
      await fetchUserSessions();
    } catch (error) {
      console.error('Error creating new session:', error);
    }
  };

  const sendMessage = async (message) => {
    if (!activeSession) return;

    setLoading(true);
    try {
      const response = await chatApi.sendMessage({
        message,
        session_id: activeSession.session_id,
        user_id: userId
      });

      // Immediately update messages with the new message pair
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'user', content: message, timestamp: new Date().toISOString() },
        { role: 'assistant', content: response.response, timestamp: new Date().toISOString() }
      ]);

      await fetchUserSessions(); // Update session list to reflect latest activity
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <button
          onClick={createNewSession}
          className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          New Chat
        </button>
        <SessionList
          sessions={sessions}
          activeSession={activeSession}
          onSelectSession={setActiveSession}
        />
      </div>

      <div className="flex-1">
        <ChatInterface
          messages={messages}
          loading={loading}
          onSendMessage={sendMessage}
          activeSession={activeSession}
        />
      </div>
    </div>
  );
};

export default ChatBot;
