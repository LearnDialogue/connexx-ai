import React from 'react';
import { Icon, IconElement, IconProps, ListItem } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StoredMessage } from '@/constants/types/chat/message';
import { useDispatch } from 'react-redux';
import { actions, deleteChatById, getAllChats } from '@/redux/slices/chat';
import { dispatch } from '@/redux/store';
import { useAppContext } from '@/utilities/context/app-context';

interface HistoryItemProps {
  item: StoredMessage;
  index: number;
}

const HistoryItem = ({ item, index }: HistoryItemProps) => {
  const { appData, setAppData, kittenTheme } = useAppContext();

  const deleteChat = async () => {
    await deleteChatById(item.id);
    await getStoredMessages();
  };

  const getStoredMessages = async () => {
    dispatch(actions.startAllChatsLoading());
    try {
      const storedMessages = await getAllChats();
      if (storedMessages) {
        setAppData({
          ...appData,
          history: { ...appData.history, chat: storedMessages },
        });
      }
    } catch (error) {
      console.log('error', error);
    }
    dispatch(actions.stopAllChatsLoading());
  };
  // chat Icon
  const ChatIcon = (props: IconProps): IconElement => (
    <Icon {...props} name='message-circle-outline' />
  );

  const DeleteIcon = (props: IconProps): IconElement => (
    <TouchableOpacity onPress={deleteChat} style={styles.deleteButton}>
      <Icon
        name='trash-2-outline'
        {...props}
        style={[props.style, { tintColor: kittenTheme['color-basic-100'] }]}
      />
    </TouchableOpacity>
  );

  const message = item.messages ? item.messages[0].message : 'No messages yet';

  return (
    <Link href={`/chat/${item.id}`} asChild>
      <ListItem
        title={item.title ? item.title : message}
        description={item.time.date + ' - ' + item.time.time}
        style={styles.container}
        accessoryLeft={ChatIcon}
        accessoryRight={DeleteIcon}
      />
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    borderRadius: 2,
  },
  deleteButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});

export default HistoryItem;
