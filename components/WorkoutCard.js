import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ui-kitten/components';

const WorkoutCard = ({ name, level, duration, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={image} resizeMode='cover' style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.level}>{level}</Text>
          <View style={styles.view} />
          <Text style={styles.duration}>{duration} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

WorkoutCard.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: 231,
    height: 208,
    flexDirection: 'column',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 154,
    borderRadius: 12,
  },
  name: {
    fontSize: 15.4,
    marginVertical: 4,
  },
  level: {
    fontSize: 12,
  },
  view: {
    height: 4,
    width: 4,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  duration: {
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default WorkoutCard;
