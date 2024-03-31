import React, { useState, useEffect } from 'react';
import { Link, Tabs } from 'expo-router';
import {
  BottomNavigation,
  BottomNavigationTab,
  Button,
  IconProps,
  Layout,
  Text,
} from '@ui-kitten/components';
import CustomeIcon from '@/utilities/icons/custome-icons';
import i18n from '@/utilities/localizations/i18n';

export default function TabLayout() {
  const [language, setLanguage] = useState(i18n.locale); // State variable to store the current language

  useEffect(() => {
    // Listen for language changes and update the state
    const handleChangeLanguage = () => {
      setLanguage(i18n.locale);
    };

    i18n.onChange(handleChangeLanguage);
  }, []);

  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
        headerShown: false,
      }}
      initialRouteName='index'
    >
      {routes.map((route: any, index: number) => {
        return (
          <Tabs.Screen
            options={{
              tabBarLabel: ({ color }) => (
                <Text category='h6' style={{ color }}>
                  {i18n.t(`tabs.${route.name}`)}
                </Text>
              ),
            }}
            key={index}
            name={route.route}
          />
        );
      })}
    </Tabs>
  );
}

// Tabs array for the bottom tab bar (tabs) items
const routes = [
  // home
  { name: 'home', icon: 'message-circle-outline', route: 'index' },

  // history
  { name: 'history', icon: 'clock-outline', route: 'history' },

  // settings
  { name: 'settings', icon: 'settings-outline', route: 'settings' },
];

// BottomTabBar component for the bottom tab bar (tabs)
const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    // appearance="noIndicator" // no indicator line at bottom of tab bar items (tabs)
    indicatorStyle={{ height: 1 }}
    // indicatorStyle={{ backgroundColor: 'red', display: 'none' }}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    {/* separate them */}
    {routes.map((route: any, index: number) => {
      return (
        <BottomNavigationTab
          key={index}
          title={i18n.t(`tabs.${route.name}`)}
          icon={(props: IconProps) => {
            return (
              <CustomeIcon
                size={props.style?.width}
                name={route.icon}
                pack={route.pack}
                color={props.style.tintColor}
              />
            );
          }}
        />
      );
    })}
  </BottomNavigation>
);
