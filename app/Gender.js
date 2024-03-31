import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepHeader from '../components/StepHeader';
import { useNavigation } from 'expo-router';
import { Button } from '@ui-kitten/components';
import { width } from '../constants/size';
import { useAppContext } from '@/utilities/context/app-context';

const Gender = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const { kittenTheme } = useAppContext();

  const handleSelectOption = (option) => {
    setSelectedOption(option);
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
          title='Step 1 of 8'
          onPress={() => navigation.navigate('Goals')}
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
            Choose gender
          </Text>
          <TouchableOpacity
            onPress={() => handleSelectOption('woman')}
            style={[
              styles.genderContainer,
              { borderColor: kittenTheme['color-primary-500'] },
              selectedOption === 'woman' && {
                backgroundColor: kittenTheme['color-primary-500'],
                borderColor: kittenTheme['color-primary-500'],
              },
            ]}
          >
            <Text style={styles.genderIcon}>👩</Text>
            <Text
              style={[
                styles.genderTitle,
                {
                  color: kittenTheme['color-basic-100'],
                },
              ]}
            >
              Woman
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectOption('man')}
            style={[
              styles.genderContainer,
              { borderColor: kittenTheme['color-primary-500'] },
              selectedOption === 'man' && {
                backgroundColor: kittenTheme['color-primary-500'],
                borderColor: kittenTheme['color-primary-500'],
              },
            ]}
          >
            <Text style={styles.genderIcon}>👨</Text>
            <Text
              style={[
                styles.genderTitle,
                {
                  color: kittenTheme['color-basic-100'],
                },
              ]}
            >
              Man
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectOption('neutral')}
            style={[
              styles.genderContainer,
              { borderColor: kittenTheme['color-primary-500'] },
              selectedOption === 'neutral' && {
                backgroundColor: kittenTheme['color-primary-500'],
                borderColor: kittenTheme['color-primary-500'],
              },
            ]}
          >
            <Text style={styles.genderIcon}>🧓</Text>
            <Text
              style={[
                styles.genderTitle,
                {
                  color: kittenTheme['color-basic-100'],
                },
              ]}
            >
              Gender neutral
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Button
            filled
            style={{ width: width - 32 }}
            onPress={() => navigation.navigate('Goals')}
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
  genderIcon: {
    fontSize: 30,
  },
  genderTitle: {
    fontSize: 16,
    marginLeft: 18,
  },
  genderContainer: {
    width: width - 32,
    height: 84,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E9EF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    left: 16,
  },
});

export default Gender;
