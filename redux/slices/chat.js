import getTime from '@/utilities/functions/chat/get-time';
import { sendMessage } from '@/utilities/gpt/chatGPT';
// import Storage from '@/utilities/storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { db, auth } from '@/firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

// write db functions to add/update/delete chats

const addChat = async (chat) => {
  const { currentUser } = auth;
  const chatRef = doc(db, 'chats', currentUser.uid);
  try {
    // Get existing chats data
    const chatSnapshot = await getDoc(chatRef);
    const existingChats = chatSnapshot.exists()
      ? chatSnapshot.data().chats || []
      : [];
    const { id } = chat;
    // Check if the chat already exists
    const chatIndex = existingChats.findIndex((chat) => chat.id === id);
    if (chatIndex !== -1) {
      // Update the chat if it already exists
      existingChats[chatIndex] = chat;
      await setDoc(chatRef, { chats: existingChats });
      return chat;
    } else {
      // Add the new chat to the existing chats array
      existingChats.unshift(chat);
      // Update the chats document with the updated chats array
      await setDoc(chatRef, { chats: existingChats }); // Pass an object with 'chats' property
      return chat; // Return the added chat
    }
  } catch (error) {
    console.log('Error adding chat: ', error);
    return null;
  }
};

export const deleteAllChats = async () => {
  const { currentUser } = auth;
  const chatRef = doc(db, 'chats', currentUser.uid);
  try {
    deleteDoc(chatRef);
    return true;
  } catch (error) {
    console.log('Error deleting chat: ', error);
    return false;
  }
};

export const getAllChats = async () => {
  const { currentUser } = auth;
  const chatRef = doc(db, 'chats', currentUser.uid);
  try {
    const chat = await getDoc(chatRef);
    const storedMessages = chat.exists() ? chat.data() : { chats: [] };
    return storedMessages.chats;
  } catch (error) {
    console.log('Error getting chat: ', error);
    return [];
  }
};

// get chat with id
export const getChatById = async (id) => {
  const { currentUser } = auth;
  const chatRef = doc(db, 'chats', currentUser.uid);
  try {
    const chat = await getDoc(chatRef);
    const storedMessages = chat.exists() ? chat.data() : { chats: [] };
    const chatData = storedMessages.chats.find((chat) => chat.id === id);
    return chatData;
  } catch (error) {
    console.log('Error getting chat: ', error);
    return null;
  }
};

// utils
// @ts-ignore
import { v4 as uuid } from 'uuid';

const initialState = {
  isLoading: false,
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

    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
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
      state.isLoading = false;
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
      dispatch(storeConversationToAsyncStorage());
    } catch (error) {
      console.log(error);
      dispatch(actions.hasError(error));
    }
    dispatch(actions.stopLoading());
  };
}

export function storeConversationToAsyncStorage() {
  return async (dispatch, getState) => {
    const { messages, conversationId } = getState().chat;
    // const storedMessages = (await Storage.getObjectData('chat-history')) || [];
    // get chat history from db
    const storedMessages = await getAllChats();
    // chat history is like [{id: '1', time: { date: '2024-03-01', time: '12:25' }, messages: [{role: 'user', content: 'hi'}, {role: 'assistant', content: 'hello'}]}]
    let conversation = {
      id: '',
      time: { date: '', time: '' },
      messages: [],
    };

    if (!conversationId) {
      conversation = {
        id: uuid(),
        time: getTime(),
        messages: [],
      };
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
    // Storage.storeObjectData('chat-history', newStoredMessages);

    // add/update chat to db
    await addChat(conversation);
    dispatch(actions.setConversationId(conversation.id));
  };
}
