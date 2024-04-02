import { StyleSheet } from 'react-native';

import {
  Divider,
  Icon,
  IconProps,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Screen } from 'expo-router/build/views/Screen';
import i18n from '@/utilities/localizations/i18n';
import { useAppContext } from '@/utilities/context/app-context';

export default function AboutScreen() {
  const { kittenTheme } = useAppContext();
  const BackIcon = (props: IconProps) => <Icon {...props} name='arrow-back' />;

  const BackAction = () => (
    <Link href={'../'} asChild>
      <TopNavigationAction icon={BackIcon} />
    </Link>
  );

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
      <TopNavigation
        title={i18n.t('about.title')}
        subtitle={(props) => (
          <Text {...props} style={[props?.style, styles.subtitle]}>
            {i18n.t('about.subtitle')}
          </Text>
        )}
        alignment='center'
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout level='2' style={styles.container}>
        <Text category='p1'>{i18n.t('about.content')}</Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
