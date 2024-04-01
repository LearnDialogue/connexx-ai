import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { width } from '../constants/size';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { Text } from '@ui-kitten/components';
import { useAppContext } from '@/utilities/context/app-context';

const ExerciseCard = ({ name, duration, image, onPress }) => {
  const { kittenTheme } = useAppContext();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: kittenTheme['background-basic-color-2'],
          borderColor: kittenTheme['color-basic-600'],
        },
      ]}
    >
      <View style={styles.leftContainer}>
        <Image source={image} resizeMode='cover' style={styles.image} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text
            style={[
              styles.duration,
              {
                color: kittenTheme['color-basic-600'],
              },
            ]}
          >
            {duration}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Feather name='info' size={24} color={kittenTheme['color-basic-600']} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

ExerciseCard.propTypes = {
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 77,
    borderRadius: 7.7,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 61.6,
    width: 61.6,
    borderRadius: 7.7,
    marginRight: 12,
  },
  name: {
    fontSize: 15.4,
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
  },
});

export default ExerciseCard;
