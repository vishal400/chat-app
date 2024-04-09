import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversations: [],
    contacts: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            const { conversationId, message, sender } = action.payload;
            const conversationIndex = state.conversations.findIndex((conv) => {
                return conv.id == conversationId;
            });

            if (conversationIndex !== -1) {
                const updatedConversations = [ ...state.conversations ];
                updatedConversations[conversationIndex] = {
                    ...updatedConversations[conversationIndex],
                    messages: [
                        ...updatedConversations[conversationIndex].messages,
                        { text: message, sender: sender }, // Include sender information
                    ],
                };
                state.conversations = updatedConversations;
            }
        },
        addConversation: (state, action) => {
            const contactId = action.payload;
            if (
                !state.conversations.some(
                    (conv) => conv.contactId === contactId
                )
            ) {
                const newConversation = {
                    id: state.conversations.length + 1,
                    contactId,
                    contactName:
                        state.contacts.find(
                            (contact) => contact.id === contactId
                        )?.name || `Contact ${contactId}`,
                    messages: [],
                };
                state.conversations.push(newConversation);
            }
        },
    },
});

export const { sendMessage, addConversation } = chatSlice.actions;
export default chatSlice.reducer;
