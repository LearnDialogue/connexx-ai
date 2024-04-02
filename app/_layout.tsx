import 'expo-dev-client';
import 'react-native-get-random-values';
import '@/firebase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { store, persistor } from '@/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Stack, useNavigation, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/utilities/context/theme-context';
import {
  AppContextProvider,
  useAppContext,
} from '@/utilities/context/app-context';
// @ts-ignore
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Toast Notifications Provider
import { ToastProvider } from 'react-native-toast-notifications';

import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
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
  const [isAuthStateLoaded, setIsAuthStateLoaded] = useState(false);

  // Wait for the Auth state to load before hiding the splash screen.
  useEffect(() => {
    const checkAuthState = async () => {
      await auth.authStateReady();
      setIsAuthStateLoaded(true);
    };
    checkAuthState();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !isAuthStateLoaded) {
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
              <NavigationStack />
            </AppContextProvider>
          </ThemeProvider>
        </ToastProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

function NavigationStack() {
  const { kittenTheme } = useAppContext();
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{ name: '(tabs)' }],
        });
      } else {
        navigation.reset({
          index: 0,
          // @ts-ignore
          routes: [{ name: 'Signin' }],
        });
      }
    });

    return unsubscribe;
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: kittenTheme['background-basic-color-2'],
      }}
    >
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        translucent={true}
        backgroundColor={kittenTheme['background-basic-color-2']}
      />
      <Stack initialRouteName={'index'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Onboarding1' options={{ headerShown: false }} />
        <Stack.Screen name='Onboarding2' options={{ headerShown: false }} />
        <Stack.Screen name='Onboarding3' options={{ headerShown: false }} />
        <Stack.Screen
          name='Auth'
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='Gender' options={{ headerShown: false }} />
        <Stack.Screen name='Goals' options={{ headerShown: false }} />
        <Stack.Screen name='SelectHeight' options={{ headerShown: false }} />
        <Stack.Screen name='Signin' options={{ headerShown: false }} />
        <Stack.Screen name='Signup' options={{ headerShown: false }} />
        <Stack.Screen name='ResetPassword' options={{ headerShown: false }} />
        <Stack.Screen name='Verification' options={{ headerShown: false }} />
        <Stack.Screen name='ForgotPassword' options={{ headerShown: false }} />
        <Stack.Screen name='index' options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
