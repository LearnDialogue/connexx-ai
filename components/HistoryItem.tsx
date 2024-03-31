import React from 'react';
import { Icon, IconElement, IconProps, ListItem } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { StoredMessage } from '@/constants/types/chat/message';

interface HistoryItemProps {
  item: StoredMessage;
  index: number;
}

const HistoryItem = ({ item, index }: HistoryItemProps) => {
  // chat Icon
  const ChatIcon = (props: IconProps): IconElement => (
    <Icon {...props} name='message-circle-outline' />
  );

  const message = item.messages ? item.messages[0].message : 'No messages yet';

  return (
    <Link href={`/chat/${item.id}`} asChild>
      <ListItem
        title={item.title ? item.title : message}
        description={item.time.date + ' - ' + item.time.time}
        style={styles.container}
        accessoryLeft={ChatIcon}
      />
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    borderRadius: 2,
  },
});

export default HistoryItem;
