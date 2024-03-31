import { ThemeType } from '@ui-kitten/components';
import { StoredMessage } from '../chat/message';

// Create the initial state for the context provider
const initialState = {
  appData: {
    language: {
      name: 'English',
      code: 'en',
    },
  },
  setAppData: () => {},
  kittenTheme: {} as ThemeType,
  chatHistory: [],
  changeLanguage: () => {},
  setChatHistory: () => {},
};

// Create the props interface for appData
type AppDataType = {
  language: LanguageType;
  coins?: {
    amount: number;
  };
  history?: {
    chat?: StoredMessage[];
  };
};

// Create the props interface for language
type LanguageType = {
  name: string;
  code: string;
};

// Create the props interface
interface AppContextProps {
  appData: AppDataType;
  setAppData: (data: any) => void;
  kittenTheme: ThemeType;
  changeLanguage: (language: LanguageType) => void;
  chatHistory: any[];
  setChatHistory: (data: any) => void;
}

export { AppContextProps, initialState, AppDataType, LanguageType };
