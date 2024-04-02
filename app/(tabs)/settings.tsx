import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Button,
  Divider,
  Icon,
  IconProps,
  Layout,
  List,
  Text,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import SettingsItem from '@/components/SettingsItem';
import { useTheme } from '@/utilities/context/theme-context';
import { useAppContext } from '@/utilities/context/app-context';
import SettingsDivider from '@/components/SettingsDivider';
import { StatusBar } from 'expo-status-bar';
import i18n from '@/utilities/localizations/i18n';
import { auth } from '@/firebase';

export default function TabSettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { appData, kittenTheme } = useAppContext();

  const saveIcon = (props: IconProps) => (
    <Icon {...props} name='download-outline' />
  );

  const darkToggle = () => (
    <Toggle checked={theme == 'dark'} onChange={toggleTheme}></Toggle>
  );

  const languageRightAccessory = (props: IconProps) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <Text category='p2'>{i18n.t('lang-name')}</Text>
      <Icon {...props} name='chevron-right' />
    </View>
  );

  // settings items
  const SettingsItems = {
    general: [
      {
        title: i18n.t('settings.language'),
        i18n: 'language',
        route: '../language',
        icon: 'info-outline',
        accessoryRight: languageRightAccessory,
      },

      {
        title: i18n.t('settings.dark-mode'),
        i18n: 'dark-mode',
        icon: 'eye-outline',
        onPress: toggleTheme,
        accessoryRight: darkToggle,
      },
    ],
    about: [
      {
        title: i18n.t('settings.rate-us'),
        i18n: 'rate-us',
        icon: 'star-outline',
        onPress: () => {
          alert('about');
        },
      },
      {
        title: i18n.t('settings.about-app'),
        i18n: 'about-genai',
        route: '../about',
        icon: 'info-outline',
      },
      {
        title: i18n.t('settings.privacy-policy'),
        i18n: 'privacy-policy',
        route: '../privacy-policy',
        icon: 'shield-outline',
      },
      {
        title: i18n.t('settings.terms-of-service'),
        i18n: 'terms-of-service',
        route: '../terms-conditions',
        icon: 'file-text-outline',
      },
      {
        title: i18n.t('settings.contact-us'),
        i18n: 'contact-us',
        icon: 'phone-outline',
        onPress: () => {
          alert('contactUs');
        },
      },
    ],
  };

  const LogoutIcon = (props: IconProps) => (
    <Icon {...props} name='log-out-outline' />
  );

  const LogoutAction = () => {
    const handleSignout = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.error('error signing out', error);
      }
    };
    return (
      <TouchableOpacity>
        <TopNavigationAction onPress={handleSignout} icon={LogoutIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <Layout
      level='2'
      style={{
        flex: 1,
      }}
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        translucent={true}
        backgroundColor={kittenTheme['background-basic-color-2']}
      />
      <TopNavigation
        title={i18n.t('settings.title')}
        subtitle={(props) => (
          <Text {...props} style={[props?.style, styles.subtitle]}>
            {i18n.t('settings.subtitle')}
          </Text>
        )}
        alignment='center'
        accessoryRight={LogoutAction}
      />
      <Divider />
      <Layout level='2' style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingBottom: 15 }}
        >
          <Layout level='1' style={styles.section}>
            <SettingsDivider title={i18n.t('settings.general')} />
            <List
              scrollEnabled={false}
              style={styles.listConatiner}
              data={SettingsItems.general}
              renderItem={SettingsItem}
            />
          </Layout>
          <Layout level='1' style={styles.section}>
            <SettingsDivider title={i18n.t('settings.about')} />
            <List
              scrollEnabled={false}
              style={styles.listConatiner}
              data={SettingsItems.about}
              renderItem={SettingsItem}
            />
          </Layout>
        </ScrollView>
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
  listConatiner: {
    flex: 1,
    width: '100%',
  },
  upperSection: {
    padding: 10,
    paddingVertical: 22,
    borderRadius: 8,
    marginBottom: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 11,
  },
  section: {
    padding: 10,
    borderRadius: 4,
  },
});
