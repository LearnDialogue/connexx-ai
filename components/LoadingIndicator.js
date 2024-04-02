import React, { ActivityIndicator, View } from 'react-native';
import { useAppContext } from '@/utilities/context/app-context';
import PropTypes from 'prop-types';

function LoadingIndicator({
  size = 'large',
  isLoading = true,
  containerStyle = {},
  ...props
}) {
  const { kittenTheme } = useAppContext();

  if (!isLoading) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator
        size={size}
        color={kittenTheme === 'light' ? 'black' : 'white'}
        animating={isLoading}
        {...props}
      />
    </View>
  );
}

LoadingIndicator.propTypes = {
  size: PropTypes.string,
  isLoading: PropTypes.bool,
  containerStyle: PropTypes.object,
};

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
};

export default LoadingIndicator;
