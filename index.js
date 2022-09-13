/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { MenuProvider } from 'react-native-popup-menu';

import { store } from './src/redux/store';

import App from './App';
import { name as appName } from './app.json';

const ReduxApp = () => (
  <Provider store={store}>
    <MenuProvider>
      <App />
    </MenuProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
