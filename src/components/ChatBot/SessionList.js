import React from 'react';

const SessionList = ({ sessions, activeSession, onSelectSession }) => {
  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <button
          key={session.session_id}
          onClick={() => onSelectSession(session)}
          className={`w-full p-3 text-left rounded-lg transition-colors ${
            activeSession?.session_id === session.session_id
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-gray-100'
          }`}
        >
          <div className="font-medium">
            Chat {session.session_id.slice(0, 8)}...
          </div>
          <div className="text-sm text-gray-500">
            {new Date(session.created_at).toLocaleString()}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SessionList;