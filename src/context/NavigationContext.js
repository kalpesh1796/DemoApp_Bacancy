import React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigateTo = (name = '', params = {}) => {
  navigationRef.current?.navigate(name, params);
};

export const goBack = () => {
  navigationRef.current?.dispatch(StackActions.pop());
};
