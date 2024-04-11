import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';

function ConversationList() {
  const conversations = useSelector(state => state.chat.conversations);
  const contacts = useSelector(state => state.chat.contacts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conversation =>
    conversation.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="conversation-list">
      <div className="create-conversation">
        <Link to="/contacts">Create Conversation</Link>
      </div>
      <input
        type="text"
        placeholder="Search Conversations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="conversation-list-scroll">
        {filteredConversations.map(conversation => {
          const contact = contacts.find(contact => contact.id === conversation.contactId);
          return (
            <Link to={`/conversation/${conversation.id}`} key={conversation.id} className="conversation-item">
              <div className="user-profile">
                <img src={contact ? contact.profilePic : ''} alt="Profile" />
                <div>
                  <h3>{conversation.contactName}</h3>
                  {/* Render one-liner messages with truncation */}
                  <p>{getLastMessage(conversation)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Function to get the last message or default message if no messages exist
function getLastMessage(conversation) {
  if (conversation.messages.length === 0) {
    return "No messages yet";
  } else {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    return truncateMessage(lastMessage.text);
  }
}

// Function to truncate messages to one line
function truncateMessage(message) {
  const maxLength = 30; // Maximum length for one-liner message
  if (message.length > maxLength) {
    return message.substring(0, maxLength) + '...'; // Truncate longer messages
  }
  return message;
}

export default ConversationList;
