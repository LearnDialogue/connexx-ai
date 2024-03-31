import { View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '@/utilities/context/app-context';

const DotsView = ({ progress, dotSize = 10, dotSpacing = 5, numDots = 3 }) => {
  const { kittenTheme } = useAppContext();
  const activeDotColor = kittenTheme['color-primary-300'];
  const dotColor = kittenTheme['color-primary-600'];
  const dots = [];

  for (let i = 1; i < numDots + 1; i++) {
    dots.push(
      <View
        key={i}
        style={[
          {
            borderWidth: 1,
            borderColor: 'transparent',
          },
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            marginHorizontal: dotSpacing / 2,
          },
          progress >= i
            ? {
                backgroundColor: activeDotColor,
              }
            : {
                backgroundColor: dotColor,
              },
        ]}
      />
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {dots}
    </View>
  );
};

DotsView.propTypes = {
  progress: PropTypes.number.isRequired,
  dotSize: PropTypes.number,
  dotSpacing: PropTypes.number,
  numDots: PropTypes.number,
};

export default DotsView;
