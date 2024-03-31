import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// slices

import userReducer from './slices/user';
import chatReducer from './slices/chat';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: 'redux-',
  whitelist: [],
  version: 1,
};

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});

export { rootPersistConfig, rootReducer };
