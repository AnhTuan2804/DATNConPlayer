/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/app/navigation/App.js';
import ForgotPassProvider from './src/app/ui/forgotPass/ForgotPassProvider.js';
import SettingProvider from './src/app/ui/setting/SettingProvider.js';

AppRegistry.registerComponent(appName, () => SettingProvider);

