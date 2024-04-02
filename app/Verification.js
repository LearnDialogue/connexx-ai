import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Button, Layout, Text } from '@ui-kitten/components';
import { width } from '../constants/size';
import { useAppContext } from '@/utilities/context/app-context';
import OTPTextInput from 'react-native-otp-textinput';

const Verification = () => {
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { kittenTheme } = useAppContext();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error);
    }
  }, [error]);

  // Render Resend Code Modal
  const renderResendCodeModal = () => {
    return (
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: kittenTheme['background-basic-color-1'],
              },
            ]}
          >
            <View
              style={[
                styles.modalSubContainer,
                {
                  backgroundColor: kittenTheme['background-basic-color-2'],
                },
              ]}
            >
              <Text style={styles.modalTitle}>
                Have you not received the Verification Code?
              </Text>
              <View style={styles.modalMiddleContainer}>
                <Text style={styles.modalMiddleTitle}>
                  An authentication code has been sent to
                </Text>
                <Text
                  style={[
                    styles.modalMiddleTitleBold,
                    {
                      color: kittenTheme['color-primary-500'],
                    },
                  ]}
                >
                  dhamasunny98@gmail.com
                </Text>
              </View>
              <View style={styles.modalBottomContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={[
                    styles.btnCancel,
                    {
                      borderColor: kittenTheme['color-primary-500'],
                    },
                  ]}
                >
                  <Text style={styles.btnCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={[
                    styles.btnOkay,
                    {
                      backgroundColor: kittenTheme['color-primary-500'],
                    },
                  ]}
                >
                  <Text style={styles.btnOkayText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

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
          <Text style={styles.title}>Verification</Text>
          <View style={styles.formContainer}>
            <Text category='s1' style={styles.subtitle}>
              An authentication code has been sent to
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: kittenTheme['color-primary-500'],
                },
              ]}
            >
              dhamasunny98@gmail.com
            </Text>
            <View style={{ marginVertical: 22 }}>
              <OTPTextInput
                textInputStyle={[
                  styles.OTPStyle,
                  {
                    borderColor: kittenTheme['color-primary-500'],
                    backgroundColor: kittenTheme['background-basic-color-1'],
                    color: kittenTheme['color-primary-500'],
                  },
                ]}
                inputCount={4}
                tintColor={kittenTheme['color-primary-500']}
                offTintColor={kittenTheme['color-primary-500']}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.subtitle}>I didn&apos;t receive code.</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text
                  style={[
                    styles.boldTitle,
                    {
                      color: kittenTheme['color-primary-500'],
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  {' '}
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            filled
            onPress={() => navigation.navigate('ResetPassword')}
            style={{ marginVertical: 6 }}
          >
            Continue
          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.forgotPassword}>Remember Password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {renderResendCodeModal()}
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
  formContainer: {
    borderRadius: 20,
    marginVertical: 32,
    padding: 22,
  },
  boldTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  OTPStyle: {
    borderRadius: 8,
    height: 58,
    width: 58,
    borderBottomWidth: 0.4,
    borderWidth: 0.4,
  },
  time: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubContainer: {
    height: 300,
    width: width * 0.86,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalMiddleContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  modalMiddleTitle: {
    fontSize: 14,
    marginVertical: 8,
    textAlign: 'center',
  },
  modalMiddleTitleBold: {
    fontSize: 16,
  },
  modalBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  btnCancel: {
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  btnCancelText: {
    fontSize: 16,
  },
  btnOkay: {
    height: 40,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnOkayText: {
    fontSize: 16,
  },
});

export default Verification;
