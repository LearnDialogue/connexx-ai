import { StyleSheet, View } from 'react-native';

import {
  Button,
  Divider,
  Icon,
  IconProps,
  Layout,
  Text,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useNavigation } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import CustomeIcon from '@/utilities/icons/custome-icons';
import { StatusBar } from 'expo-status-bar';
import { useAppContext } from '@/utilities/context/app-context';
import { useTheme } from '@/utilities/context/theme-context';
import i18n from '@/utilities/localizations/i18n';

export default function AuthScreen() {
  // gettting the theme from the context
  const { theme } = useTheme();
  const { kittenTheme } = useAppContext();
  const navigation = useNavigation();

  // google and facebook icons
  const GoogleIcon = (props: IconProps) => <Icon {...props} name='google' />;

  const FacebookIcon = (props: IconProps) => (
    <Icon {...props} name='facebook' />
  );

  const ChatGPTIcon = (props: IconProps) => <Icon {...props} name='link' />;

  // handle navigation to the app
  const handleNavigateToApp = () => {
    navigation.reset({
      index: 0,
      // @ts-ignore
      routes: [{ name: 'Gender' }],
    });
  };

  return (
    <Layout
      level='2'
      style={{
        flex: 1,
      }}
    >
      <Screen
        options={{
          headerShown: false,
        }}
      />
      <Layout level='2' style={styles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <CustomeIcon
            name='robot-happy-outline'
            pack='material-community-icons'
            size={100}
            color={kittenTheme['color-primary-default']}
          />
          <Text category='h3' style={styles.text}>
            ConneXX
          </Text>
          <Text category='p1' style={styles.text}>
            {i18n.t('start.title')}
          </Text>
          <Text category='p2' style={styles.text}>
            {i18n.t('start.subtitle')}
          </Text>
        </View>

        <View style={{ width: '100%', gap: 8 }}>
          <Button
            accessoryLeft={GoogleIcon}
            appearance='outline'
            status='basic'
          >
            {i18n.t('start.buttons.google-sign-in')}
          </Button>

          <Button accessoryLeft={FacebookIcon} appearance='outline'>
            {i18n.t('start.buttons.facebook-sign-in')}
          </Button>
        </View>
        <Button onPress={handleNavigateToApp}>
          {i18n.t('start.buttons.get-started')}
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 33,
    flexDirection: 'column',
    gap: 22,
  },
  text: {
    textAlign: 'center',
  },
});
