//components/ConversationList.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';

function ConversationList() {
  const conversations = useSelector(state => state.chat.conversations);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conversation =>
    conversation.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="conversation-list">
      <h1>Conversations</h1>
      <input
        type="text"
        placeholder="Search Conversations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredConversations.map(conversation => (
        <Link to={`/conversation/${conversation.id}`} key={conversation.id} className="conversation-item">
          <div>
            <h3>{conversation.contactName}</h3>
            <p>{conversation.messages[conversation.messages.length - 1].text}</p>
          </div>
        </Link>
      ))}
      <div className="create-conversation">
        <Link to="/contacts">Create Conversation</Link>
      </div>
    </div>
  );
}

export default ConversationList;
