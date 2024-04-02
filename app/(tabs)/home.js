import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Categories, exercises, popularWorkouts } from '../../data';
import { useNavigation } from 'expo-router';
import { Layout, Text } from '@ui-kitten/components';
import { width } from '../../constants/size';
import { useAppContext } from '@/utilities/context/app-context';
import { auth } from '@/firebase';
import icons from '../../constants/icons';
import images from '../../constants/images';
import SubHeader from '../../components/SubHeader';
import CategoryCard from '../../components/CategoryCard';
import WorkoutCard from '../../components/WorkoutCard';
import ExerciseCard from '../../components/ExerciseCard';

const Home = () => {
  const { kittenTheme } = useAppContext();
  const navigation = useNavigation();

  /**
   * Render Header
   */
  const renderHeader = () => {
    return (
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: kittenTheme['background-basic-color-2'],
          },
        ]}
      >
        <Text style={styles.headerTitle}>
          Hi, {auth.currentUser?.displayName || 'User'}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('home')}
          style={[
            styles.headerIconContainer,
            {
              borderColor: kittenTheme['color-primary-500'],
            },
          ]}
        >
          <Image
            source={icons.bell}
            resizeMode='contain'
            style={[
              styles.bellIcon,
              {
                tintColor: kittenTheme['color-primary-500'],
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  /**
   * Render Search Bar
   */
  const renderSearchBar = () => {
    return (
      <View
        style={[
          styles.searchContainer,
          {
            borderColor: kittenTheme['color-basic-600'],
          },
        ]}
      >
        <Ionicons
          name='search-outline'
          size={24}
          color={kittenTheme['color-basic-600']}
        />
        <TextInput
          placeholder='Search something'
          style={[
            styles.inputSearch,
            {
              color: kittenTheme['color-basic-600'],
            },
          ]}
          placeholderTextColor={kittenTheme['color-basic-600']}
        />
      </View>
    );
  };
  /**
   * Render banner
   */
  const renderBanner = () => {
    return (
      <View
        style={[
          styles.bannerContainer,
          {
            backgroundColor: kittenTheme['background-basic-color-1'],
          },
        ]}
      >
        <View style={styles.leftContainer}>
          <Text
            style={[
              styles.bannerTitle,
              {
                color: kittenTheme['color-primary-500'],
              },
            ]}
          >
            Full Body Toning Workout
          </Text>
          <Text
            style={[
              styles.bannerSubtitle,
              {
                color: kittenTheme['color-basic-600'],
              },
            ]}
          >
            Includes circuits to work every muscle
          </Text>
          <TouchableOpacity
            style={[
              styles.startBtn,
              {
                backgroundColor: kittenTheme['color-primary-500'],
              },
            ]}
          >
            <Text
              style={[
                styles.startBtnText,
                {
                  color: kittenTheme['text-basic-color'],
                },
              ]}
            >
              Start Training
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <Image
            source={images.banner}
            resizeMode='contain'
            style={styles.bannerImage}
          />
        </View>
      </View>
    );
  };

  /**
   * Render all fitness categories
   */
  const renderCategories = () => {
    return (
      <View>
        <SubHeader
          title='Category'
          onPress={() => navigation.navigate('home')}
        />
        <Layout level='2'>
          <FlatList
            data={Categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryCard
                name={item.name}
                icon={item.icon}
                onPress={() => console.log(item)}
              />
            )}
          />
        </Layout>
      </View>
    );
  };

  /**
   * Render Popular Workout
   */

  const renderPopularWorkouts = () => {
    return (
      <View>
        <SubHeader
          title='Popular Workouts'
          onPress={() => console.log('Popular Workouts')}
        />
        <Text style={styles.subHeaderTitle}>Workouts: 80</Text>
        <Layout level='2' style={{ marginTop: 12 }}>
          <FlatList
            data={popularWorkouts}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <WorkoutCard
                name={item.name}
                duration={item.duration}
                level={item.level}
                image={item.image}
                onPress={() => navigation.navigate('home')}
              />
            )}
          />
        </Layout>
      </View>
    );
  };

  /**
   * Render Exercises
   */

  const renderExercises = () => {
    return (
      <Layout level='2' style={{ marginTop: 12 }}>
        <SubHeader
          title='Exercises'
          onPress={() => navigation.navigate('home')}
        />
        <Text style={styles.subHeaderTitle}>Exercises: 210</Text>

        <Layout level='2' style={{ marginTop: 12 }}>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ExerciseCard
                name={item.name}
                duration={item.duration}
                image={item.image}
                onPress={() => console.log(item)}
              />
            )}
          />
        </Layout>
      </Layout>
    );
  };
  return (
    <Layout
      level='1'
      style={[
        styles.area,
        {
          backgroundColor: kittenTheme['background-basic-color-2'],
        },
      ]}
    >
      <View style={styles.container}>
        {renderHeader()}
        {renderSearchBar()}
        <FlatList
          data={[
            { key: 'banner' },
            { key: 'categories' },
            { key: 'popularWorkouts' },
            { key: 'exercises' },
          ]}
          renderItem={({ item }) => {
            switch (item.key) {
              case 'banner':
                return renderBanner();
              case 'categories':
                return renderCategories();
              case 'popularWorkouts':
                return renderPopularWorkouts();
              case 'exercises':
                return renderExercises();
              default:
                return null;
            }
          }}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 16,
  },
  headerContainer: {
    width: width - 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bellIcon: {
    height: 24,
    width: 24,
  },
  headerIconContainer: {
    height: 38.5,
    width: 38.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7.7,
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 26,
  },
  searchContainer: {
    width: width - 32,
    height: 46.2,
    borderRadius: 7.7,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  inputSearch: {
    fontSize: 12,
    marginLeft: 8,
  },
  bannerContainer: {
    width: width - 32,
    height: 220,
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  leftContainer: {
    marginVertical: 18,
    marginLeft: 18,
  },
  rightContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 19.25,
    width: 194,
  },
  bannerSubtitle: {
    fontSize: 14,
    width: 167,
    marginVertical: 18,
  },
  startBtn: {
    width: 134,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    fontSize: 12,
  },
  bannerImage: {
    width: 170,
    height: 198,
    bottom: -25,
    right: 42,
  },
  subHeaderTitle: {
    fontSize: 12,
  },
});
export default Home;
