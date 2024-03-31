import React, { useEffect, useState } from 'react';
import Storage from '@/utilities/storage/async-storage';
import { useNavigation } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAppContext } from '@/utilities/context/app-context';

export default function index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { kittenTheme } = useAppContext();

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const value = await Storage.getData(
          'alrdeadyLaunchedxxxxsmwjqkxxsaxxaasajns'
        );
        if (value === null) {
          await Storage.storeData(
            'alrdeadyLaunchedxxxxsmwjqkxxsaxxaasajns',
            'true'
          );
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        setIsFirstLaunch(false);
      }
      setIsLoading(false); // Set loading state to false once the check is complete
    };

    checkIfFirstLaunch();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (isFirstLaunch === true) {
      // If it's the first launch, navigate to the onboarding screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding1' }],
      });
    } else {
      // If it's not the first launch, navigate to the home screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Signin' }],
      });
    }
  }, [isLoading, isFirstLaunch]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: kittenTheme['background-basic-color-2'],
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator
        size='large'
        color={kittenTheme['color-primary-500']}
      />
    </View>
  );
}
