import { RefreshControl, StyleSheet, View } from 'react-native';

import {
  Button,
  Divider,
  Icon,
  IconProps,
  Input,
  Layout,
  List,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import { useTheme } from '@/utilities/context/theme-context';
import { useAppContext } from '@/utilities/context/app-context';
import i18n from '@/utilities/localizations/i18n';
import { useEffect, useState } from 'react';
import HistoryItem from '@/components/HistoryItem';
import initialSearchState from '@/constants/types/history/search-state';
// import Storage from '@/utilities/storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { auth, db } from '@/firebase';
import { actions, deleteAllChats, getAllChats } from '@/redux/slices/chat';
import { useDispatch, useSelector } from '@/redux/store';

export default function TabHistoryScreen() {
  const { theme } = useTheme();
  const { kittenTheme, appData, setAppData } = useAppContext();
  // @ts-ignore
  const { isAllChatsLoading } = useSelector((state) => state.chat);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // search icon
  const SearchIcon = (props: IconProps) => (
    <Icon {...props} name='search-outline' />
  );

  // search state
  const [search, setSearch] = useState(initialSearchState);

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

  const clearHistory = async () => {
    try {
      await deleteAllChats();
      setAppData({
        ...appData,
        history: { ...appData.history, chat: [] },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getStoredMessages();
    }
  }, [isFocused]);

  return (
    <Layout level='2' style={{ flex: 1 }}>
      <TopNavigation
        title={i18n.t('history.title')}
        subtitle={(props) => (
          <Text {...props} style={[props?.style, styles.subtitle]}>
            {i18n.t('history.subtitle')}
          </Text>
        )}
        alignment='center'
      />
      <Divider />
      <Layout level='2' style={styles.container}>
        {/* Search Input */}
        <Input
          value={search.query}
          onChangeText={(nextValue) =>
            setSearch({ ...search, query: nextValue })
          }
          style={{ marginTop: 10 }}
          placeholder={i18n.t('history.inputs.search', {
            defaultValue: 'Search',
          })}
          accessoryRight={SearchIcon}
        />
        {appData?.history?.chat?.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            {i18n.t('history.noChats', {
              defaultValue: 'No chats available',
            })}
          </Text>
        )}
        <List
          refreshControl={
            <RefreshControl
              refreshing={isAllChatsLoading}
              onRefresh={getStoredMessages}
              colors={[kittenTheme['color-primary-500']]}
              tintColor={kittenTheme['color-primary-500']}
            />
          }
          scrollEnabled
          style={styles.listConatiner}
          data={appData?.history?.chat}
          renderItem={({ item, index }) => (
            <HistoryItem item={item} index={index} />
          )}
        />
        {/* if not chats present show text message */}

        {/* delete all button */}
        {appData?.history?.chat?.length !== 0 && (
          <Button
            appearance='ghost'
            status='danger'
            size='large'
            onPress={clearHistory}
            style={{ marginTop: 10 }}
          >
            {i18n.t('history.buttons.clear', {
              defaultValue: 'Clear history',
            })}
          </Button>
        )}
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 9,
    flexDirection: 'column',
    gap: 22,
  },
  subtitle: {
    fontSize: 11,
    width: '70%',
  },
  listConatiner: {
    flex: 1,
    width: '100%',
  },
});
