import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Routes from './src/routes/navigator/nav';
import store from './src/config/store';

import { Provider } from 'react-redux';




export default () => (
      <Provider store={store}>
    
          <Routes onNavigationStateChange={null} />
       
      </Provider>
);