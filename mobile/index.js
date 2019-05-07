/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/app/navigation/App.js';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);

