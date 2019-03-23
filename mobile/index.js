/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/app/navigation/App.js';
import HomeComponent from './src/app/ui/home/HomeComponent.js';

AppRegistry.registerComponent(appName, () => HomeComponent);
