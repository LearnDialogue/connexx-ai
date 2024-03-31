import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useAppContext } from '@/utilities/context/app-context';

const StepHeader = ({ title, onPress }) => {
  const navigation = useNavigation();
  const { kittenTheme } = useAppContext();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: kittenTheme['background-basic-color-2'],
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name='arrow-back-outline'
          size={24}
          color={kittenTheme['color-primary-600']}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {
            color: kittenTheme['color-primary-100'],
          },
        ]}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            styles.skip,
            {
              color: kittenTheme['color-primary-600'],
            },
          ]}
        >
          Skip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

StepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15.4,
  },
  skip: {
    fontSize: 15.4,
  },
});

export default StepHeader;
