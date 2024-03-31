import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const SocialButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={icon} resizeMode='contain' style={styles.icon} />
    </TouchableOpacity>
  );
};

SocialButton.propTypes = {
  icon: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 9,
  },
  icon: {
    height: 36,
    width: 36,
  },
});

export default SocialButton;
