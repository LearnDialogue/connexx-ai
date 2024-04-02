import { ScrollView, StyleSheet, View } from 'react-native';

import {
  Button,
  Icon,
  IconProps,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useAppContext } from '@/utilities/context/app-context';
import i18n from '@/utilities/localizations/i18n';
import { Link, router } from 'expo-router';
import React from 'react';
import CustomeIcon from '@/utilities/icons/custome-icons';
import HomeSection from '@/components/HomeSection';
import { auth } from '@/firebase';

export default function TabChatScreen() {
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

  const prompts = [...i18n.t('home.prompts')];

  return (
    <Layout level='1' style={{ flex: 1 }}>
      <TopNavigation
        title={i18n.t('home.title')}
        subtitle={i18n.t('home.subtitle')}
        alignment='center'
        // accessoryLeft={renderLeftAccessory}
      />
      <Layout level='2' style={styles.container}>
        {/* <Text category='h1'>Tab Home</Text> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 22 }}
        >
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
    </Layout>
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
