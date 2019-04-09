/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/app/navigation/App.js';
// import ManageComponent from './src/app/ui/manage/ManageComponent.js';
import CreateTeamContainer from './src/app/ui/manage/team/CreateTeamContainer.js';
import ManageProvider from './src/app/ui/manage/ManageProvider.js';

AppRegistry.registerComponent(appName, () => App);

