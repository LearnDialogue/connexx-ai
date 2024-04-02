import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateInput } from '../utilities/actions/formActions';
import { reducer } from '../utilities/reducers/formReducers';
import { useNavigation } from 'expo-router';
import { Button, Input, Text } from '@ui-kitten/components';
import { width } from '../constants/size';
import { useAppContext } from '@/utilities/context/app-context';

const isTestMode = true;

const initialState = {
  inputValues: {
    newPassword: isTestMode ? '**********' : '',
    confirmNewPassword: isTestMode ? '**********' : '',
  },
  inputValidities: {
    newPassword: false,
    confirmNewPassword: false,
  },
  formIsValid: false,
};

const ResetPassword = () => {
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [selectedImage, setSelectedImage] = useState(null);
  const { kittenTheme } = useAppContext();
  const navigation = useNavigation();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error);
    }
  }, [error]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: kittenTheme['background-basic-color-2'],
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.center}>
        <Text style={styles.title}>Reset Password</Text>
        <Input
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['newPassword']}
          autoCapitalize='none'
          id='newPassword'
          placeholder='New Password'
          secureTextEntry={true}
          style={{
            marginBottom: 12,
            color: kittenTheme['color-primary-500'],
            borderColor: kittenTheme['color-primary-500'],
          }}
          placeholderTextColor={kittenTheme['color-primary-100']}
        />
        <Input
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['confirmNewPassword']}
          autoCapitalize='none'
          id='confirmNewPassword'
          placeholder='Confirm New Password'
          secureTextEntry={true}
          style={{
            marginBottom: 12,
            color: kittenTheme['color-primary-500'],
            borderColor: kittenTheme['color-primary-500'],
          }}
          placeholderTextColor={kittenTheme['color-primary-100']}
        />
        <Button
          filled
          onPress={() => navigation.navigate('Signin')}
          style={{
            marginVertical: 6,
            width: width - 32,
          }}
        >
          Reset
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Sigin')}>
          <Text style={styles.forgotPassword}>Remenber Password?</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomLeft}>Don&apos;t have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            style={[
              styles.bottomRight,
              {
                color: kittenTheme['color-primary-500'],
              },
            ]}
          >
            {' '}
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginVertical: 22,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },
  checkbox: {
    marginRight: 8,
    height: 16,
    width: 16,
    borderRadius: 999,
  },
  privacy: {
    fontSize: 12,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    position: 'absolute',
    bottom: 12,
    right: 0,
    left: 0,
  },
  bottomLeft: {
    fontSize: 14,
  },
  bottomRight: {
    fontSize: 16,
  },
  forgotPassword: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 12,
  },
});

export default ResetPassword;
