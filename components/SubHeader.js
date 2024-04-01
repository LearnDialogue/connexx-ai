import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { width } from '../constants/size';
import PropTypes from 'prop-types';
import { useAppContext } from '@/utilities/context/app-context';
import { Text } from '@ui-kitten/components';

const SubHeader = ({ title, onPress }) => {
  const { kittenTheme } = useAppContext();

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            styles.viewAll,
            {
              color: kittenTheme['color-primary-500'],
            },
          ]}
        >
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: width - 32,
    marginVertical: 12,
  },
  title: {
    fontSize: 19.25,
  },
  viewAll: {
    fontSize: 14.4,
  },
});

export default SubHeader;
