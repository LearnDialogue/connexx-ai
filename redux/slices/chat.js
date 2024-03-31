import getTime from '@/utilities/functions/chat/get-time';
import { sendMessage } from '@/utilities/gpt/chatGPT';
import Storage from '@/utilities/storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

// utils
// @ts-ignore
import { v4 as uuid } from 'uuid';

const initialState = {
  isLoading: true,
  error: null,
  success: null,
  messages: [],
  message: '',
  conversationId: '',
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = false;
    },

    // SET CONVERSATION ID
    setConversationId(state, action) {
      state.conversationId = action.payload;
    },

    // GET MESSAGE SUCCESS
    getMessageSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.messages.push(action.payload);
    },

    // ADD MESSAGE
    addMessage(state, action) {
      state.messages.push(action.payload);
    },

    // SET MESSAGE
    setMessage(state, action) {
      state.message = action.payload;
    },

    // SET MESSAGES
    setMessages(state, action) {
      state.messages = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // RESET STATE
    resetState(state) {
      state.isLoading = true;
      state.error = false;
      state.messages = [];
      state.message = '';
      state.conversationId = '';
    },
  },
});

// Reducer
export default slice.reducer;
export const { actions } = slice;

// Actions
export function askGPT() {
  return async (dispatch, getState) => {
    const { message, messages } = getState().chat;

    dispatch(actions.startLoading());
    try {
      const messagesForContext = messages.map((message) => ({
        role: message.role,
        content: message.message,
      }));
      const response = await sendMessage(message, messagesForContext);
      const responseTime = getTime();
      const newMessage = {
        id: uuid(),
        message: response,
        role: 'assistant',
        time: responseTime,
      };
      dispatch(actions.getMessageSuccess(newMessage));
    } catch (error) {
      console.log(error);
      dispatch(actions.hasError(error));
    }
  };
}

export function storeConversationToAsyncStorage() {
  return async (dispatch, getState) => {
    const { messages, conversationId } = getState().chat;
    const storedMessages = (await Storage.getObjectData('chat-history')) || [];
    // chat history is like [{id: '1', time: { date: '2024-03-01', time: '12:25' }, messages: [{role: 'user', content: 'hi'}, {role: 'assistant', content: 'hello'}]}]
    let conversation = {
      id: '',
      time: { date: '', time: '' },
      messages: [],
    };

    if (!conversationId) {
      const newConversationId = uuid();
      conversation = {
        id: newConversationId,
        time: getTime(),
        messages: [],
      };
      dispatch(actions.setConversationId(newConversationId));
    } else {
      conversation = storedMessages.find(
        (conversation) => conversation.id === conversationId
      );
    }
    // sync with the current chat data
    conversation.messages = [...messages];
    // check if all messages are in format {role: 'user', message: 'hi', id: '1', time: {date: '2024-03-01', time: '12:25'}} if not convert them
    conversation.messages = conversation.messages.map((message) => {
      if (!message.id) {
        message.id = uuid();
      }
      if (!message.time) {
        message.time = getTime();
      }
      return message;
    });
    const newStoredMessages = storedMessages.filter(
      // @ts-ignore
      (conversation) => conversation.id !== conversationId
    );
    // @ts-ignore
    newStoredMessages.push(conversation);
    Storage.storeObjectData('chat-history', newStoredMessages);
  };
}
