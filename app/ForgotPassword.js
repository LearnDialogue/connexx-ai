import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { validateInput } from '../utilities/actions/formActions';
import { reducer } from '../utilities/reducers/formReducers';
import { useNavigation } from 'expo-router';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { width } from '../constants/size';
import { useAppContext } from '@/utilities/context/app-context';

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? 'example@gmail.com' : '',
  },
  inputValidities: {
    email: false,
  },
  formIsValid: false,
};

const ForgotPassword = () => {
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
    <Layout
      level='2'
      style={[
        styles.area,
        {
          backgroundColor: kittenTheme['background-basic-color-2'],
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: kittenTheme['background-basic-color-2'],
          },
        ]}
      >
        <ScrollView contentContainerStyle={styles.center}>
          <Text style={styles.title}>Forgot Password</Text>
          <Input
            id='email'
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['email']}
            placeholder='Email'
            keyboardType='email-address'
            style={{
              marginBottom: 12,
              color: kittenTheme['color-primary-500'],
              borderColor: kittenTheme['color-primary-500'],
            }}
            placeholderTextColor={kittenTheme['color-primary-100']}
            autoCapitalize='none'
          />
          <Button
            filled
            onPress={() => navigation.navigate('Verification')}
            style={{
              marginVertical: 6,
              width: width - 32,
            }}
          >
            Continue
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.forgotPassword}>Remenber Password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
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
  socialTitle: {
    fontSize: 19.25,
    textAlign: 'center',
    marginVertical: 32,
  },
  forgotPassword: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 12,
  },
});

export default ForgotPassword;
