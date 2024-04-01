import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '@/utilities/context/app-context';
import { Text } from '@ui-kitten/components';

const CategoryCard = ({ icon, name, onPress }) => {
  const { kittenTheme } = useAppContext();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: kittenTheme['background-basic-color-2'],
          borderColor: kittenTheme['color-basic-600'],
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 77,
    height: 77,
    borderRadius: 7.7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    fontSize: 14,
    marginTop: 2,
  },
});

CategoryCard.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CategoryCard;
