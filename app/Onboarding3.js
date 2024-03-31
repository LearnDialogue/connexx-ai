import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { height, width } from '../constants/size';
import illustrations from '../constants/illustrations';
import { useAppContext } from '@/utilities/context/app-context';
import { Button, Text } from '@ui-kitten/components';
import PageContainer from '@/components/PageContainer';
import DotsView from '@/components/DotsView';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding3 = () => {
  const navigation = useNavigation();
  const { kittenTheme } = useAppContext();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: kittenTheme['background-basic-color-2'],
      }}
    >
      <View style={styles.container}>
        <PageContainer>
          <View style={styles.contentContainer}>
            <Image
              source={illustrations.onboarding3}
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
                  category='h4'
                  style={[
                    styles.title,
                    { color: kittenTheme['color-primary-500'] },
                  ]}
                >
                  Organized and Custom
                </Text>
                <Text
                  category='h4'
                  style={[
                    styles.subTitle,
                    { color: kittenTheme['color-primary-500'] },
                  ]}
                >
                  Workout
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
                Create and save your own custom workouts. Name your workouts,
                save them, and they&apos;ll automatically appear
              </Text>

              <View style={styles.dotsContainer}>
                <DotsView progress={3} numDots={3} />
              </View>
              <Button
                filled
                onPress={() => navigation.navigate('index')}
                style={styles.nextButton}
              >
                Sign In
              </Button>
            </View>
          </View>
        </PageContainer>
      </View>
    </SafeAreaView>
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
    height: height * 0.6,
    width: width * 0.6,
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

export default Onboarding3;
