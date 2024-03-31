import { StyleSheet, View } from 'react-native';

import {
  Divider,
  Icon,
  IconProps,
  Input,
  Layout,
  List,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/utilities/context/theme-context';
import { useAppContext } from '@/utilities/context/app-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '@/utilities/localizations/i18n';
import { useEffect, useState } from 'react';
import HistoryItem from '@/components/HistoryItem';
import initialSearchState from '@/constants/types/history/search-state';
import { initialStoredMessages } from '@/constants/types/chat/message';
import Storage from '@/utilities/storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function TabHistoryScreen() {
  const { theme } = useTheme();
  const { kittenTheme, appData, setAppData } = useAppContext();
  const isFocused = useIsFocused();

  // search icon
  const SearchIcon = (props: IconProps) => (
    <Icon {...props} name='search-outline' />
  );

  // search state
  const [search, setSearch] = useState(initialSearchState);

  const getStoredMessages = async () => {
    try {
      const storedMessages = await Storage.getObjectData('chat-history');
      if (storedMessages) {
        setAppData({
          ...appData,
          history: { ...appData.history, chat: storedMessages },
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const clearHistory = async () => {
    try {
      await Storage.storeObjectData('chat-history', []);
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: kittenTheme['background-basic-color-2'],
      }}
    >
      <Layout level='2' style={{ flex: 1 }}>
        <StatusBar
          style={theme === 'light' ? 'dark' : 'light'}
          backgroundColor={kittenTheme['background-basic-color-2']}
        />
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
            style={{ marginVertical: 10 }}
            placeholder={i18n.t('history.inputs.search', {
              defaultValue: 'Search',
            })}
            accessoryRight={SearchIcon}
          />
          {/* Button to reload history */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <Text
              style={{ color: kittenTheme['color-primary-500'] }}
              onPress={getStoredMessages}
            >
              {i18n.t('history.reload')}
            </Text>
            <Text
              style={{ color: kittenTheme['color-primary-500'] }}
              onPress={clearHistory}
            >
              {i18n.t('history.clear')}
            </Text>
          </View>
          {appData.history &&
          appData.history.chat &&
          appData.history.chat.length > 0 ? (
            <List
              scrollEnabled
              style={styles.listConatiner}
              data={appData.history.chat}
              renderItem={HistoryItem}
            />
          ) : null}
        </Layout>
      </Layout>
    </SafeAreaView>
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
