import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// @ts-ignore
import { v4 as uuid } from 'uuid';
import {
  Divider,
  Icon,
  IconProps,
  Input,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useGlobalSearchParams } from 'expo-router';
import { useTheme } from '@/utilities/context/theme-context';
import { useAppContext } from '@/utilities/context/app-context';
import MessagesContainer from '@/components/MessagesContainer';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import i18n from '@/utilities/localizations/i18n';
import { Message } from '@/constants/types/chat/message';
import getTime from '@/utilities/functions/chat/get-time';
import { useDispatch, useSelector } from '@/redux/store';
import {
  actions,
  askGPT,
  storeConversationToAsyncStorage,
} from '@/redux/slices/chat';

type state = {
  chat: {
    message: string;
    messages: Message[];
    conversationId: string;
  };
};

export default function ChatScreen() {
  const { theme } = useTheme();
  const { kittenTheme } = useAppContext();
  const { message, messages, conversationId } = useSelector(
    (state: state) => state.chat
  );
  const dispatch = useDispatch();
  const { message: globalMessage, prompt, ...other } = useGlobalSearchParams();

  useEffect(() => {
    if (globalMessage) {
      const stringGlobalMessage = String(globalMessage);
      dispatch(actions.setMessage(stringGlobalMessage));
      if (!prompt) {
        SendHandler(stringGlobalMessage);
      }
    }
  }, [globalMessage]);

  useEffect(() => {
    return () => {
      dispatch(actions.resetState());
    };
  }, []);

  const BackIcon = (props: IconProps) => <Icon {...props} name='arrow-back' />;

  const BackAction = () => (
    <Link href={'./(tabs)'} asChild>
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
    const messageTime = getTime();
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

  useEffect(() => {
    if (messages.length >= 2) {
      dispatch(storeConversationToAsyncStorage() as any);
    }
  }, [messages, conversationId]);

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

  // on change text handler
  const setMessage = (message: string) => {
    dispatch(actions.setMessage(message));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: kittenTheme['background-basic-color-2'],
      }}
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        translucent={true}
        backgroundColor={kittenTheme['background-basic-color-2']}
      />
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
        <ScrollView>
          <Layout level='2' style={styles.container}>
            {messages.map((message, index) => (
              <MessagesContainer
                key={index}
                item={message}
                themeKitten={kittenTheme}
              />
            ))}
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
            autoFocus={prompt ? true : false}
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
    </SafeAreaView>
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
