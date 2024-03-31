import 'react-native-get-random-values';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { store, persistor } from '@/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Stack, useNavigation, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/utilities/context/theme-context';
import { AppContextProvider } from '@/utilities/context/app-context';
// @ts-ignore
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Toast Notifications Provider
import { ToastProvider } from 'react-native-toast-notifications';

import { I18nManager } from 'react-native';
import Storage from '@/utilities/storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
// import { ChatContextProvider } from '@/utilities/context/chat-context';

// When a value is missing from a language it'll fallback
// to another language with the key present.

//don't change app dir to rtl.
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export const unstable_settings = {
  // Ensure that reloading on `/index` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'SpaceMono-SemiBold': require('../assets/fonts/SpaceMono-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider offset={30}>
          <ThemeProvider>
            <AppContextProvider>
              <Stack
                initialRouteName={'index'}
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen
                  name='Onboarding1'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='Onboarding2'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='Onboarding3'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='Auth'
                  options={{ headerShown: false, presentation: 'modal' }}
                />
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='Gender' options={{ headerShown: false }} />
                <Stack.Screen name='Goals' options={{ headerShown: false }} />
                <Stack.Screen
                  name='SelectHeight'
                  options={{ headerShown: false }}
                />
                <Stack.Screen name='Signin' options={{ headerShown: false }} />
                <Stack.Screen name='Signup' options={{ headerShown: false }} />
                <Stack.Screen
                  name='ResetPassword'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='Verification'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='ForgotPassword'
                  options={{ headerShown: false }}
                />
                <Stack.Screen name='index' options={{ headerShown: false }} />
              </Stack>
            </AppContextProvider>
          </ThemeProvider>
        </ToastProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
