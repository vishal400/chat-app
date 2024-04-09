//components/Conversation.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../redux/slice';
import '../App.css';

function Conversation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const conversations = useSelector(state => state.chat ? state.chat.conversations : []);
  const conversation = conversations.find(conv => conv.id === parseInt(id));
  const [message, setMessage] = useState('');
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (!conversation) {
      navigate('/');
    }
  }, [navigate, conversation]);

  useEffect(() => {
    // Scroll to the bottom of the message container when conversation updates
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleMessageSend = () => {
    if (!message.trim()) {
      return;
    }
    
    dispatch(sendMessage({ conversationId: id, message, sender: 'You' }));
    setMessage('');
  };

  return (
    <div className="conversation">
      <h2>Conversation with {conversation ? conversation.contactName : ''}</h2>
      <div ref={messageContainerRef} className="message-container">
        {conversation && conversation.messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'You' ? 'sender' : 'receiver'}>
            <div className="message">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button onClick={handleMessageSend} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default Conversation;
