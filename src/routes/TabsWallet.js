import React, { Component } from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import WalletHome from './WalletHome';
import WalletMarket from './WalletMarket';
import WalletTransaction from './WalletTransaction';
import WalletAlert from '../WalletAlert/index';
import addAlert from '../WalletAlert/addAlert';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const alertScreen = createStackNavigator({

  WalletAlert: {
    screen: WalletAlert,
    navigationOptions: {
      header: () => null,
    },
  },

  addalert: {
    screen: addAlert,
    navigationOptions: {
      header: () => null,
    },
  },
});

const Rootnavigator = createBottomTabNavigator({

  Market: {
    screen: WalletMarket
  },

  Wallet: {

    screen: WalletHome
  },


  Transactions: {
    screen: WalletTransaction
  },

  Alert: {

    screen: alertScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image source={require('./Images/alert.png')}
            style={{ height: 22, width: 18 }} />
    )
    },
  }

}, {

    swipeEnabled: true,
    tabBarOptions: {

      activeTintColor: 'white',
      activeBackgroundColor: '#1f2f46',
      inactiveTintColor: 'gray',
      inactiveBackgroundColor: '#1f2f46',
      labelStyle: {

      }
    },

    initialRouteName: 'Wallet',

  });

export default Rootnavigator;