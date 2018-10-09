import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('InstaWallet', () => App);

//for block isMounted
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoreYellowBox = ['Warning: isMounted(...) is deprecated'];