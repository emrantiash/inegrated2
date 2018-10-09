import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,ScrollView,DrawerView,TouchableOpacity,Divider,Button,AppRegistry} from 'react-native';
import Home from '../../screens/Home'
import CurrencyList from '../../screens/CurrencyList'
import favScreen from '../../screens/favScreen'
import Chart from '../../components/Chart/Chart'
import ChartSingle from '../../components/Chart/ChartSingle'
import ExchangeRate from '../ExchangeRate'
import Alert from '../Alert'
import About from '../../AboutUs/index'
import Settings from '../Settings';
import Currency from '../Currency';
import Wallet from '../Wallet';
import AddAccount from '../Addaccount';

import { createDrawerNavigator, DrawerItems, createStackNavigator, DrawerActions  } from 'react-navigation' ;

import {connect} from 'react-redux' ;

class nav extends Component {
  render() {
   // alert(this.props.language);
//    if(this.props.language ==="ENGLISH" )
//    {
//     return (
//       <Myapp />
//     );
//   }
//   else
//   {
//   return (
//     <Myapp2 />
//   );

// }
    switch(this.props.language){

       case "RUSSIAN" :
        return (
                <Myapp2 />
              );
       case  "ENGLISH" :
              return (
                      <Myapp />
                    );
      default : 
      return (
        <Myapp />
      );
    }


  }
}

const CustomDrawerContentComponent = (props) =>
  (
    <ScrollView style={{ backgroundColor: "#121B2A" }}>
      <Image style={{ flex: 1, position: 'absolute', top: 0 }} source={require('../Images/banner.png')} />
      <View style={{ flexDirection: 'column', paddingTop: 100 }}>
        <Image style={styles.logo}
          source={require('../Images/logo.png')} />
        <Text style={styles.Text}>IFX Currency Converter</Text>
        <Text style={styles.text}>Instaforex</Text>
      </View>
      <View style={{ paddingTop: 18 }}>
        <DrawerItems {...props} 
         onItemPress = {
          ({ route, focused }) =>       
          {    
            props.onItemPress({ route, focused });
            props.navigation.closeDrawer('DrawerClose');
            console.log(this.props);
          }
         }
        />
      </View>
    </ScrollView>
  )


const HomeScreen = createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          header: () => null,
        },
      },
      ChartSingle: {
        screen: ChartSingle,
        navigationOptions: {
          header: () => null,
        },
      },
      CurrencyList: {
        screen: CurrencyList,
        navigationOptions: {
        title: 'Currency list',
        headerTitleStyle: {
            width: '70%',
            textAlign: 'center',
        },
        },
      },
      favScreen: {
        screen: favScreen,
        navigationOptions: {
        title: 'Favourite Currency',
      //   headerStyle: {
      //     backgroundColor: '#323941',
      // },
        headerTitleStyle: {
            width: '70%',
            textAlign: 'center',
        },
        },
      },
      
    },
    {
      mode: 'modal'
    },
  );


const Myapp = createDrawerNavigator({

  // AddAccount : {

  //     screen : AddAccount
  // },
  Converter: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Currency Converter',
      drawerIcon: (
        <Image source={require('../Images/arrows.png')}
            style={{ height: 22, width: 22 }} />
    )
    },
  },
  Currency: {
    screen: Currency,
    navigationOptions: {
      title: 'Browse All Currencies'
    }
  },
  // ExchangeRate: {
  //   screen: ExchangeRate
  // },
  Chart: {
    screen: Chart
  },
  // Alert: {
  //   screen: Alert
  // },
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      title: 'Wallet'
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings'
    }
  },
  
  About: {
    screen: About
  }
 
}, {
    initialRouteName: 'Converter',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: 'transparent',
    contentOptions: {
      activeTintColor: '#f2f2f2',
      inactiveTintColor: '#ffffff',
      activeBackgroundColor: '#222d3f',
      inactiveBackgroundColor: '#121B2A',
    },
  }
)

const Myapp2 = createDrawerNavigator({
  Converter: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Конвертер валют',
      drawerIcon: (
        <Image source={require('../Images/converter.png')}
            style={{ height: 22, width: 22 }} />
    )
    },
  },
  Currency: {
    screen: Currency,
    navigationOptions: {
      title: 'Просмотр всех валют'
    }
  },
  // ExchangeRate: {
  //   screen: ExchangeRate
  // },
  Chart: {
    screen: Chart,
    navigationOptions: {
      title: 'диаграмма'
    }
  },
  // Alert: {
  //   screen: Alert
  // },
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      title: 'Бумажник'
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'настройки'
    }
  },
  About: {
    screen: About,
    navigationOptions : {
      title : 'о'
    }
  }
 
}, {
    initialRouteName: 'Converter',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: 'transparent',
    contentOptions: {
      activeTintColor: '#f2f2f2',
      inactiveTintColor: '#ffffff',
      activeBackgroundColor: '#222d3f',
      inactiveBackgroundColor: '#121B2A',
    },
  }
)

function mapStateToProps(state){
  return({
     language : state.settingReducer.currentLanguage 

  })
}


export default connect(mapStateToProps)(nav)
const styles = StyleSheet.create({
  logo: {
    width: 68,
    height: 69,
    position: 'absolute',
    top: 90,
  },
  Text: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    paddingLeft: 70
  },
  text: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    paddingLeft: 70
  },
  hairline: {
    backgroundColor: '#101825',
    marginTop: 130,
    height: 2,
    width: 300
  },
  touchableOpacity: {
    flex: 1,
    flexDirection: 'row',
  },
  aboutPng: {
    height: 22,
    width: 22,
    margin: 13,
    marginLeft: 15
  },
  aboutButton: {
    flex: 2,
    paddingTop: 13,
    paddingLeft: 10,
    fontSize: 15,
    color: 'white'
  },
  settingsPng: {
    height: 22,
    width: 22,
    margin: 13,
  },
  settingsButton: {
    flex: 2,
    paddingTop: 12,
    paddingLeft: 10,
    fontSize: 15,
    color: 'white'
  },
});


