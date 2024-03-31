import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { useAppContext } from '@/utilities/context/app-context';

const PageContainer = (props) => {
  const { kittenTheme } = useAppContext();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: kittenTheme['background-basic-color-2'],
      }}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContainer;
