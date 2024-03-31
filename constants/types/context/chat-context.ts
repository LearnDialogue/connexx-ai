// Create the initial state for the context provider
const initialState = {
  chatData: {
    messages: <any>[],
  },
  setChatData: () => {},
  setMessages: () => {},
  setMessage: () => {},
  askGPT: () => {},
  reset: () => {},
  setConversationId: () => {},
};

// Create the props interface for chatData
type ChatDataType = {
  messages: any[];
  message?: string;
};

// Create the props interface
interface ChatContextProps {
  chatData: ChatDataType;
  setChatData: (data: any) => void;
  setMessages: (messages: any) => void;
  setMessage: (message: any) => void;
  askGPT: (message: any) => void;
  reset: () => void;
  setConversationId: (id: string) => void;
}

export { ChatContextProps, initialState, ChatDataType };
