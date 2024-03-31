import storedMessages from '../../../assets/data/messages.json'



export interface Message {
    id: string,
    message: string,
    role: string,
    time?: Time,
}

export interface Time {
    date: string;
    time: string;
}

export interface Chat {
    id: string,
    messages: Message[],
}

export interface ChatState {
    chats: Chat[],
}

const initialMessages: Message[] = [
    { id: "1", message: 'Hello', role: "user" },
    { id: "2", message: 'Hi', role: "assistant" },
]

export interface StoredMessage {
    messages: Message[],
    id: string,
    title?: string,
    length?: number,
    time: Time,
}

const initialStoredMessages: StoredMessage[] = storedMessages;



export {
    initialMessages,
    initialStoredMessages
}
