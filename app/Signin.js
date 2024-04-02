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
import icons from '../constants/icons';
import SocialButton from '../components/SocialButton';
import { useNavigation } from 'expo-router';
import { Button, Input, Text } from '@ui-kitten/components';
import { width } from '../constants/size';
import { useAppContext } from '@/utilities/context/app-context';
import { useDispatch } from '@/redux/store';
import { signInUser, actions } from '@/redux/slices/user';

const initialState = {
  inputValues: {
    email: '',
    password: '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const Signin = () => {
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [selectedImage, setSelectedImage] = useState(null);
  const { kittenTheme } = useAppContext();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  // update redux state of user for input values
  useEffect(() => {
    // set email
    dispatch(actions.setEmail(formState.inputValues['email']));
    // set password
    dispatch(actions.setPassword(formState.inputValues['password']));
  }, [formState]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error);
    }
  }, [error]);

  // implementing apple authentication
  const appleAuthHandler = () => {
    console.log('Apple Authentication');
  };

  // implementing facebook authentication
  const facebookAuthHandler = () => {
    console.log('Facebook Authentication');
  };

  // Implementing google authentication
  const googleAuthHandler = () => {
    console.log('Google Authentication');
  };

  const handleSignIn = () => {
    dispatch(signInUser());
  };

  const renderEmailCaption = () => {
    if (!formState.inputValidities['email']) {
      return null;
    }
    return (
      <View style={styles.captionContainer}>
        <Text
          style={[
            styles.captionText,
            {
              color: kittenTheme['color-danger-500'],
            },
          ]}
        >
          should be valid email
        </Text>
      </View>
    );
  };

  const renderPasswordCaption = () => {
    if (!formState.inputValidities['password']) {
      return null;
    }
    return (
      <View style={styles.captionContainer}>
        <Text
          style={[
            styles.captionText,
            {
              color: kittenTheme['color-danger-500'],
            },
          ]}
        >
          password should be at least 6 characters
        </Text>
      </View>
    );
  };

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
        <Text style={styles.title}>Sign In</Text>
        <Input
          id='email'
          onChangeText={(value) => inputChangedHandler('email', value)}
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
          value={formState.inputValues['email']}
          caption={renderEmailCaption}
        />
        <Input
          onChangeText={(value) => inputChangedHandler('password', value)}
          errorText={formState.inputValidities['password']}
          autoCapitalize='none'
          id='password'
          placeholder='Password'
          secureTextEntry={true}
          style={{
            marginBottom: 12,
            color: kittenTheme['color-primary-500'],
            borderColor: kittenTheme['color-primary-500'],
          }}
          placeholderTextColor={kittenTheme['color-primary-100']}
          value={formState.inputValues['password']}
          caption={renderPasswordCaption}
        />
        <Button
          filled
          onPress={handleSignIn}
          disabled={!formState.formIsValid}
          style={{
            marginVertical: 6,
            width: width - 32,
          }}
        >
          Sign In
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={[
              styles.forgotPassword,
              {
                color: kittenTheme['color-primary-400'],
              },
            ]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.socialTitle}>Continue with</Text>
          <View style={styles.socialBtnContainer}>
            <SocialButton icon={icons.appleLogo} onPress={appleAuthHandler} />
            <SocialButton icon={icons.facebook} onPress={facebookAuthHandler} />
            <SocialButton icon={icons.google} onPress={googleAuthHandler} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomLeft}>Don&apos;t have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            style={[
              styles.bottomRight,
              {
                color: kittenTheme['color-primary-500'],
                fontWeight: 'bold',
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
    marginVertical: 32,
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
  socialBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default Signin;
