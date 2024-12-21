import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`max-w-[80%] ${isUser ? 'ml-auto' : 'mr-auto'} mb-4`}>
      <div className={`p-4 rounded-lg ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
      }`}>
        {message.content}
      </div>
      <div className={`text-xs text-gray-500 mt-1 ${
        isUser ? 'text-right' : 'text-left'
      }`}>
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;