import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConversationList from './components/ConversationList';
import Conversation from './components/Conversation';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="chat-container">
          <div className="conversation-list">
            <ConversationList />
          </div>
          <Routes>
            <Route path="/" element={<Conversation />} />
            <Route path="/conversation/:id" element={<Conversation />} />
            <Route path="/contacts" element={<ContactList />} /> {/* Add this route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
