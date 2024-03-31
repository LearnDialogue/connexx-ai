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

const Goals = () => {
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
          title='Step 2 of 8'
          onPress={() => navigation.navigate('SelectHeight')}
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
            Choose main goal
          </Text>
          <TouchableOpacity
            onPress={() => handleSelectOption('Lose weight')}
            style={[
              styles.goalsContainer,
              { borderColor: kittenTheme['color-primary-500'] },
              selectedOption === 'Lose weight' && {
                backgroundColor: kittenTheme['color-primary-500'],
                borderColor: kittenTheme['color-primary-500'],
              },
            ]}
          >
            <Text style={styles.goalsIcon}>👩‍⚖️</Text>
            <Text
              style={[
                styles.goalsTitle,
                {
                  color: kittenTheme['color-basic-100'],
                },
              ]}
            >
              Lose weight
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectOption('Keep fit')}
            style={[
              styles.goalsContainer,
              { borderColor: kittenTheme['color-primary-500'] },
              selectedOption === 'Keep fit' && {
                backgroundColor: kittenTheme['color-primary-500'],
                borderColor: kittenTheme['color-primary-500'],
              },
            ]}
          >
            <Text style={styles.goalsIcon}>🍀</Text>
            <Text
              style={[
                styles.goalsTitle,
                {
                  color: kittenTheme['color-basic-100'],
                },
              ]}
            >
              Keep fit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectOption('Get stronger')}
            style={[
              styles.goalsContainer,
              { borderColor: kittenTheme['color-primary-500'] },
              selectedOption === 'Get stronger' && {
                backgroundColor: kittenTheme['color-primary-500'],
                borderColor: kittenTheme['color-primary-500'],
              },
            ]}
          >
            <Text style={styles.goalsIcon}>💪</Text>
            <Text
              style={[
                styles.goalsTitle,
                {
                  color: kittenTheme['color-basic-100'],
                },
              ]}
            >
              Get stronger
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectOption('Gain muscle mass')}
            style={[
              styles.goalsContainer,
              { borderColor: kittenTheme['color-primary-500'] },
              selectedOption === 'Gain muscle mass' && {
                backgroundColor: kittenTheme['color-primary-500'],
                borderColor: kittenTheme['color-primary-500'],
              },
            ]}
          >
            <Text style={styles.goalsIcon}>🏋️</Text>
            <Text
              style={[
                styles.goalsTitle,
                {
                  color: kittenTheme['color-basic-100'],
                },
              ]}
            >
              Gain muscle mass
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Button
            filled
            style={{ width: width - 32 }}
            onPress={() => navigation.navigate('SelectHeight')}
          >
            Start Training
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
  goalsIcon: {
    fontSize: 30,
  },
  goalsTitle: {
    fontSize: 16,
    marginLeft: 18,
  },
  goalsContainer: {
    width: width - 32,
    height: 84,
    borderRadius: 8,
    borderWidth: 1,
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

export default Goals;
