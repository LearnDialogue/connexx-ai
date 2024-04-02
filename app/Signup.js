import {
  View,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { validateInput } from '../utilities/actions/formActions';
import { reducer } from '../utilities/reducers/formReducers';
import icons from '../constants/icons';
import SocialButton from '../components/SocialButton';
import { useNavigation } from 'expo-router';
import { Button, Input, Text, CheckBox } from '@ui-kitten/components';
import { width } from '../constants/size';
import { useAppContext } from '@/utilities/context/app-context';
import { useDispatch } from '@/redux/store';
import { signUpUser, actions } from '@/redux/slices/user';

const initialState = {
  inputValues: {
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
  },
  inputValidities: {
    fullName: false,
    phoneNumber: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const Signup = () => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
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
    // set phone number
    dispatch(actions.setPhoneNumber(formState.inputValues['phoneNumber']));
    // set full name
    dispatch(actions.setFullName(formState.inputValues['fullName']));
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

  const handleSignUp = () => {
    dispatch(signUpUser());
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
          {formState.inputValidities['email']}
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
          {formState.inputValidities['password']}
        </Text>
      </View>
    );
  };

  const renderPhoneNumberCaption = () => {
    if (!formState.inputValidities['phoneNumber']) {
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
          {formState.inputValidities['phoneNumber']}
        </Text>
      </View>
    );
  };

  const renderFullNameCaption = () => {
    if (!formState.inputValidities['fullName']) {
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
          {formState.inputValidities['fullName']}
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
        <Text style={styles.title}>Sign Up</Text>

        <Input
          id='fullName'
          onChangeText={(value) => inputChangedHandler('fullName', value)}
          errorText={formState.inputValidities['fullName']}
          placeholder='Full Name'
          style={{
            marginBottom: 12,
            color: kittenTheme['color-primary-500'],
            borderColor: kittenTheme['color-primary-500'],
          }}
          placeholderTextColor={kittenTheme['color-primary-100']}
          value={formState.inputValues['fullName']}
          caption={renderFullNameCaption}
        />
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
          value={formState.inputValues['email']}
          caption={renderEmailCaption}
          autoCapitalize='none'
        />
        <Input
          id='phoneNumber'
          onChangeText={(value) => inputChangedHandler('phoneNumber', value)}
          errorText={formState.inputValidities['phoneNumber']}
          placeholder='Phone Number'
          style={{
            marginBottom: 12,
            color: kittenTheme['color-primary-500'],
            borderColor: kittenTheme['color-primary-500'],
          }}
          placeholderTextColor={kittenTheme['color-primary-100']}
          value={formState.inputValues['phoneNumber']}
          keyboardType='phone-pad'
          caption={renderPhoneNumberCaption}
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
        <View style={styles.checkBoxContainer}>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.privacy}>
                By continuing you accept our Privacy Policy
              </Text>
            </View>
          </View>
        </View>
        <Button
          filled
          onPress={handleSignUp}
          style={{
            marginVertical: 6,
            width: width - 32,
          }}
          disabled={!formState.formIsValid}
        >
          Sign Up
        </Button>
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
        <Text style={styles.bottomLeft}>Already have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
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
            Sign In
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
    marginBottom: 22,
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
    marginVertical: 26,
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

export default Signup;
