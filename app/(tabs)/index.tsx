import { ScrollView, StyleSheet, View } from 'react-native';

import {
  BottomNavigationTab,
  Button,
  Card,
  Icon,
  IconProps,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/utilities/context/theme-context';
import { useAppContext } from '@/utilities/context/app-context';
import { StatusBar } from 'expo-status-bar';
import i18n from '@/utilities/localizations/i18n';
import { Link, router } from 'expo-router';
import React from 'react';
import CustomeIcon from '@/utilities/icons/custome-icons';
import HomeSection from '@/components/HomeSection';

export default function TabChatScreen() {
  const { theme } = useTheme();
  const { kittenTheme } = useAppContext();

  const [message, setMessage] = React.useState<string>('');

  const homeElements = [
    {
      name: 'Start a new chat (Multi)',
      icon: 'message-circle-outline',
    },
    {
      name: 'Text Chat',
      icon: 'text-outline',
    },
  ];

  // Send icon
  const SendIcon = (props: IconProps) => (
    <Icon {...props} name='paper-plane-outline' />
  );

  // Send button
  const SendAction = (props: IconProps) => (
    <TopNavigationAction
      {...props}
      icon={SendIcon}
      // onPress={() => router.push(`/chat?message=${message}`, { message: message })}
      onPress={() =>
        router.navigate({ pathname: 'chat', params: { message: message } })
      }
    />
  );

  const renderLeftAccessory = () => {
    return (
      <View
        style={{
          marginRight: 8,
          alignItems: 'center',
          flexDirection: 'row',
          gap: 11,
          justifyContent: 'center',
        }}
      >
        <CustomeIcon
          name='robot-happy-outline'
          pack='material-community-icons'
          size={28}
          color={kittenTheme['color-primary-default']}
        />
        <Text category='h5' status='primary'>
          ConneXX
        </Text>
      </View>
    );
  };

  const prompts = [...i18n.t('home.prompts')];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: kittenTheme['background-basic-color-2'],
      }}
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={kittenTheme['background-basic-color-2']}
      />
      <TopNavigation
        // title={i18n.t('home.title')}
        // subtitle={i18n.t('home.subtitle')}
        title={renderLeftAccessory}
        alignment='center'
        // accessoryLeft={renderLeftAccessory}
      />
      <Layout level='2' style={styles.container}>
        {/* <Text category='h1'>Tab Home</Text> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 22 }}
        >
          <Text category='h4'>
            {i18n.t('home.greeting', { defaultValue: 'Hello' })?.toString()}
            <Text category='h3' status='primary'>
              Sunny
            </Text>
          </Text>
          <Text category='h5' appearance='hint'>
            {i18n.t('home.question', {
              defaultValue: 'How can I help you today?',
            })}
          </Text>

          {prompts.map((item: any, index: any) => {
            return (
              <HomeSection
                kittenTheme={kittenTheme}
                key={index}
                icon={() => (
                  <CustomeIcon
                    name={item.icon}
                    size={22}
                    color={kittenTheme['background-alternative-color-1']}
                  />
                )}
                title={item.title}
                messages={item.messages}
              />
            );
          })}

          {/* Start new chat button */}
          <Link href='/chat/' asChild>
            <Button
              appearance='ghost'
              status='primary'
              size='large'
              style={styles.button}
            >
              {i18n.t('home.buttons.new-chat', {
                defaultValue: 'Start new chat',
              })}
            </Button>
          </Link>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 5,
    paddingHorizontal: 9,
    flexDirection: 'column',
    // gap: 22,
  },
  button: {
    marginVertical: 30,
  },
});
