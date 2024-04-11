// store.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slice';
import data from '../data/data.json'; // Import JSON data

const initialState = {
  chat: {
    conversations: data.conversations,
    contacts: data.contacts
  }
};

const store = configureStore({
  reducer: {
    chat: chatReducer
  },
  preloadedState: initialState // Initialize store with initial state
});

export default store;
