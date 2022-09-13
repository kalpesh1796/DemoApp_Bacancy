/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostList from './src/screens/posts/PostList';
import PostDetails from './src/screens/posts/PostDetails';

import { navigationRef } from "./src/context/NavigationContext";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PostList" component={PostList} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
