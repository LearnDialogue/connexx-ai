import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepHeader from '../components/StepHeader';
import { useNavigation } from 'expo-router';
import { Button } from '@ui-kitten/components';
import { width } from '../constants/size';
import { useAppContext } from '@/utilities/context/app-context';

const SelectHeight = () => {
  const [selectedOption, setSelectedOption] = useState('Feet');
  const [height, setHeight] = useState('');
  const [heightValue, setHeightValue] = useState('cm');
  const navigation = useNavigation();
  const { kittenTheme } = useAppContext();

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option === 'Feet') {
      setHeightValue('Ft');
    }
    if (option === 'Centimetre') {
      setHeightValue('Cm');
    }
  };

  return (
    <SafeAreaView
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
        <StepHeader
          title='Step 4 of 8'
          onPress={() => navigation.navigate('SelectWeight')}
        />
        <ScrollView>
          <Text
            style={[
              styles.title,
              {
                color: kittenTheme['color-primary-500'],
              },
            ]}
          >
            Select height
          </Text>
          <View style={{ alignItems: 'center' }}>
            <View
              style={[
                styles.barContainer,
                {
                  backgroundColor: kittenTheme['background-basic-color-3'],
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => handleSelectOption('Feet')}
                style={[
                  styles.selectItemContainer,
                  selectedOption === 'Feet' && {
                    backgroundColor: kittenTheme['color-primary-500'],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.selectItemText,
                    { color: kittenTheme['color-basic-100'] },
                    selectedOption === 'Feet' && styles.selectedSelectItemText,
                  ]}
                >
                  Feet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelectOption('Centimetre')}
                style={[
                  styles.selectItemContainer,
                  selectedOption === 'Centimetre' && {
                    backgroundColor: kittenTheme['color-primary-500'],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.selectItemText,
                    { color: kittenTheme['color-basic-100'] },
                    selectedOption === 'Centimetre' &&
                      styles.selectedSelectItemText,
                  ]}
                >
                  Centimetre
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: kittenTheme['color-primary-500'],
                    color: kittenTheme['color-primary-500'],
                  },
                ]}
                value={height}
                onChangeText={(text) => setHeight(text)}
                keyboardType='numeric'
              />
              <Text
                style={[
                  styles.inputHeight,
                  {
                    color: kittenTheme['color-basic-100'],
                    fontWeight: 'bold',
                  },
                ]}
              >
                {heightValue}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Button
            filled
            style={{ width: width - 32 }}
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: '(tabs)' }] })
            }
          >
            Continue
          </Button>
        </View>
      </View>
    </SafeAreaView>
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
  title: {
    fontSize: 26,
    marginVertical: 32,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    left: 16,
  },
  barContainer: {
    height: 40,
    width: 260,
    borderRadius: 19.25,
    backgroundColor: '#F1F4F8',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  selectedSelectItemContainer: {
    height: 31,
    width: 116,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectItemContainer: {
    height: 31,
    width: 116,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSelectItemText: {
    fontSize: 12,
  },
  selectItemText: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  input: {
    height: 62,
    width: 94,
    borderWidth: 1,
    fontSize: 26,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputHeight: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export default SelectHeight;
