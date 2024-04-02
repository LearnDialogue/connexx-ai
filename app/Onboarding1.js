import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import PageContainer from '@/components/PageContainer';
import DotsView from '@/components/DotsView';
import { useAppContext } from '@/utilities/context/app-context';
import illustrations from '../constants/illustrations';
import { height, width } from '../constants/size';
import { useNavigation } from 'expo-router';

const Onboarding1 = () => {
  const navigation = useNavigation();
  const { kittenTheme } = useAppContext();

  return (
    <View style={styles.container}>
      <PageContainer>
        <View style={styles.contentContainer}>
          <Image
            source={illustrations.onboarding1}
            resizeMode='contain'
            style={styles.illustration}
          />
          <View
            style={[
              styles.buttonContainer,
              { backgroundColor: kittenTheme['background-basic-color-1'] },
            ]}
          >
            <View style={styles.titleContainer}>
              <Text
                category='h3'
                style={[
                  styles.title,
                  { color: kittenTheme['color-primary-500'] },
                ]}
              >
                Welcome to
              </Text>
              <Text
                category='h3'
                style={[
                  styles.subTitle,
                  { color: kittenTheme['color-primary-500'] },
                ]}
              >
                ConneXX
              </Text>
            </View>

            <Text
              category='p2'
              style={[
                styles.description,
                {
                  color: kittenTheme['color-basic-600'],
                },
              ]}
            >
              ConneXX has workouts on demand that you can find based on how much
              time you have
            </Text>

            <View style={styles.dotsContainer}>
              <DotsView progress={1} numDots={3} />
            </View>
            <Button
              filled
              onPress={() => navigation.navigate('Onboarding2')}
              style={styles.nextButton}
            >
              Next
            </Button>
            <Button
              onPress={() => navigation.navigate('index')}
              style={[
                styles.skipButton,
                {
                  borderColor: kittenTheme['color-primary-500'],
                  color: kittenTheme['color-primary-500'],
                },
              ]}
            >
              Skip
            </Button>
          </View>
        </View>
      </PageContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  illustration: {
    position: 'absolute',
    bottom: 250,
    height: height * 0.7,
    width: width * 0.7,
  },
  ornament: {
    position: 'absolute',
    bottom: 430,
    zIndex: -99,
  },
  titleContainer: {
    marginVertical: 18,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    marginTop: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
  },
  dotsContainer: {
    marginBottom: 20,
    marginTop: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 22,
    height: 400,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  nextButton: {
    width: width - 44,
    marginTop: 22,
    marginBottom: 8,
  },
  skipButton: {
    width: width - 44,
    backgroundColor: 'transparent',
    marginBottom: 22,
  },
});

export default Onboarding1;
