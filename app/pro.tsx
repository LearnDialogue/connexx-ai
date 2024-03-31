import { ScrollView, StyleSheet, View } from 'react-native';

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
import CustomeIcon from '@/utilities/icons/custome-icons';
import { useAppContext } from '@/utilities/context/app-context';
import FeatureLine from '@/components/FeatureLine';
import { useState } from 'react';
import { PlansTypes } from '@/constants/types/pro/plans';
import i18n from '@/utilities/localizations/i18n';
import { FeaturesList } from '@/constants/types/pro/features';

export default function ProScreen() {
  const { kittenTheme } = useAppContext();
  const [selectedPlan, setSelectedPlan] = useState<PlansTypes>('monthly');

  function handlePlanPress(period: PlansTypes) {
    setSelectedPlan(period);
  }

  const BackIcon = (props: IconProps) => <Icon {...props} name='arrow-back' />;

  const BackAction = () => (
    <Link href={'../'} asChild>
      <TopNavigationAction icon={BackIcon} />
    </Link>
  );

  const UpperLogo = () => {
    return (
      <View
        style={{
          marginRight: 8,
          alignItems: 'center',
          gap: 11,
          marginVertical: 22,
          justifyContent: 'center',
        }}
      >
        <CustomeIcon
          name='robot-happy-outline'
          pack='material-community-icons'
          size={99}
          color={kittenTheme['color-primary-default']}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
          }}
        >
          <Text category='h1'>ConneXX</Text>
          <Text
            category='h5'
            status='primary'
            style={{
              backgroundColor: kittenTheme['color-primary-300'],
              paddingHorizontal: 11,
              borderRadius: 10,
            }}
          >
            PRO
          </Text>
        </View>
      </View>
    );
  };

  const features = i18n.t('pro.features.list') as FeaturesList;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={i18n.t('pro.title')}
        subtitle={(props) => (
          <Text {...props} style={[props?.style, styles.subtitle]}>
            {i18n.t('pro.subtitle')}
          </Text>
        )}
        alignment='center'
        accessoryLeft={BackAction}
      />
      {/* <Divider /> */}
      <Layout level='2' style={styles.container}>
        <ScrollView>
          <UpperLogo />
          <Layout style={styles.features}>
            {features.map((feature, index) => (
              <FeatureLine key={index} title={feature} />
            ))}
          </Layout>
        </ScrollView>
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
  features: {
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 4,
  },
  plans: {
    padding: 15,
    borderRadius: 4,
  },
});
