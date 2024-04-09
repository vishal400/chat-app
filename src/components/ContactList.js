// components/ContactList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addConversation } from '../redux/slice';
import '../App.css';

function ContactList() {
  const contacts = useSelector(state => state.chat.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startConversation = (contactId) => {
    dispatch(addConversation(contactId));
    navigate('/');
  };

  return (
    <div className="contact-list">
      <h1>Contacts</h1>
      {contacts.map(contact => (
        <div key={contact.id} className="contact-item" onClick={() => startConversation(contact.id)}>
          <h3>{contact.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
