import MessagesContainer from '@/components/MessagesContainer';
import { Message, StoredMessage } from '@/constants/types/chat/message';
import { useAppContext } from '@/utilities/context/app-context';
import { useTheme } from '@/utilities/context/theme-context';
import getTime from '@/utilities/functions/chat/get-time';
import i18n from '@/utilities/localizations/i18n';
import {
  Divider,
  Icon,
  IconProps,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { Link, router, useGlobalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from '@/redux/store';
import { actions, askGPT, getAllChats, getChatById } from '@/redux/slices/chat';
// @ts-ignore
import { v4 as uuid } from 'uuid';

type state = {
  chat: {
    message: string;
    messages: Message[];
    conversationId: string;
    isLoading: boolean;
  };
};

export default function ChatHistoryScreen() {
  const { theme } = useTheme();
  const { kittenTheme } = useAppContext();
  const { message, messages, conversationId, isLoading } = useSelector(
    (state: state) => state.chat
  );
  const dispatch = useDispatch();

  const { id } = useGlobalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  }, [messages]);

  const renderStoredMessages = async () => {
    try {
      if (id) {
        const storedChat = await getChatById(id);
        dispatch(actions.setConversationId(id));

        if (storedChat && storedChat.messages.length > 0) {
          // @ts-ignore
          const { messages } = storedChat;
          dispatch(actions.setMessages(messages));
        } else {
          dispatch(actions.setMessages([]));
          router.replace('/(tabs)/');
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    renderStoredMessages();

    return () => {
      dispatch(actions.resetState());
    };
  }, []);

  const BackIcon = (props: IconProps) => <Icon {...props} name='arrow-back' />;

  const BackAction = () => (
    <Link href={'../history'} asChild>
      <TopNavigationAction icon={BackIcon} />
    </Link>
  );

  // Send icon
  const SendIcon = (props: IconProps) => (
    <Icon {...props} name='paper-plane-outline' />
  );

  // Send button
  const SendAction = (props: IconProps) => (
    <TopNavigationAction {...props} icon={SendIcon} onPress={SendHandler} />
  );
  // Send button handler
  const SendHandler = async (messageContent: string) => {
    let messageTime = getTime();
    if (messageContent.length > 0) {
      const newMessage = {
        id: uuid(),
        message: messageContent,
        role: 'user',
        time: messageTime,
      };
      dispatch(actions.setMessage(''));
      dispatch(actions.addMessage(newMessage));
      dispatch(askGPT() as any);
    } else if (message && message.length > 0) {
      const newMessage = {
        id: uuid(),
        message,
        role: 'user',
        time: messageTime,
      };
      dispatch(actions.setMessage(''));
      dispatch(actions.addMessage(newMessage));
      dispatch(askGPT() as any);
    }
  };

  // record icon
  const RecordIcon = (props: IconProps) => (
    <Icon {...props} name='mic-outline' />
  );

  // record button
  const RecordAction = () => (
    <TopNavigationAction icon={RecordIcon} onPress={RecordHandler} />
  );

  // record button handler
  const RecordHandler = () => {};

  // Attachment icon
  const AttachmentIcon = (props: IconProps) => (
    <Icon {...props} name='attach-outline' />
  );

  // Attachment button
  const AttachmentAction = (props: IconProps) => (
    <TopNavigationAction
      {...props}
      // style={{opacity: message.length < 3 ? 0.5 : 1}}
      // disabled={message.length < 3}
      icon={AttachmentIcon}
      onPress={AttachmentHandler}
    />
  );

  // Attachment button handler
  const AttachmentHandler = () => {};

  const setMessage = (message: string) => {
    dispatch(actions.setMessage(message));
  };

  return (
    <Layout
      level='2'
      style={{
        flex: 1,
        backgroundColor: kittenTheme['background-basic-color-2'],
      }}
    >
      <TopNavigation
        title={i18n.t('chat.title', { defaultValue: 'New Chat' })}
        subtitle={i18n.t('chat.subtitle', {
          defaultValue: 'ConneXX Assistant',
        })}
        alignment='center'
        accessoryLeft={BackAction}
      />
      <Divider />
      <KeyboardAvoidingView
        behavior={Platform.select({ android: undefined, ios: 'padding' })}
        keyboardVerticalOffset={Platform.select({
          android: undefined,
          ios: 0,
        })}
        enabled={true}
        style={{ flex: 1 }}
      >
        <ScrollView ref={scrollViewRef}>
          <Layout level='2' style={styles.container}>
            {messages.map((message: any, index: any) => (
              <MessagesContainer
                key={index}
                item={message}
                themeKitten={kittenTheme}
              />
            ))}
            {isLoading && (
              <MessagesContainer
                item={{
                  id: uuid(),
                  message: '...',
                  role: 'assistant',
                  time: getTime(),
                }}
                themeKitten={kittenTheme}
              />
            )}
          </Layout>
        </ScrollView>
        <Layout
          level='1'
          style={{
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <Input
            placeholder={i18n.t('chat.input.placeholder', {
              defaultValue: 'Type your message',
            })}
            multiline={true}
            value={message}
            onChangeText={setMessage}
            // make submit button as send message
            accessoryLeft={AttachmentAction}
            accessoryRight={(props) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <RecordAction {...props} />
                  <SendAction {...props} />
                </View>
              );
            }}
            style={{
              maxHeight: 100,
            }}
          />
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 9,
    flexDirection: 'column',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
