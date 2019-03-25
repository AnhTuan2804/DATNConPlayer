/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, PixelRatio } from 'react-native';
import { Root } from 'native-base';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { TabIcon } from './../ui/common/components/TabIcon'
import LoginProvider from '../ui/login/LoginProvider';
import RegisterProvider from '../ui/register/RegisterProvider';
import HomeProvider from '../ui/home/HomeProvider';
import CreateTournamentProvider from '../ui/createTournament/CreateTournamentProvider';
import SearchProvider from '../ui/search/SearchProvider';
import ManageProvider from '../ui/manage/ManageProvider';
import SettingProvider from '../ui/setting/SettingProvider';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};
export default class App extends Component {
  render() {
    return (
      <Root>
        <View style={mainStyles.container}>
          <Router>
            <Stack key='root'>
              <Scene key='loginScreen'
                hideNavBar={true}
                component={LoginProvider}
                initial
              />
              <Scene key='registerScreen'
                hideNavBar={true}
                component={RegisterProvider}
              />
              {/* Tabbar */}
              <Scene key='tabbar'
                showLabel={false}
                tabBarStyle={{ backgroundColor: '#fff' }}
                tabs={true}
                tabBarPosition={'bottom'}
                gestureEnabled={true}
                animationEnabled={false}
                swipeEnabled={false}
                panHandlers={null}
                disabledBackGesture={true}
                hideNavBar={true}
              >

                  {/* Home page and search */}
                  <Stack>
                    <Scene
                      key='TOP'
                      tabBarLabel={`TOP`}
                      icon={TabIcon}
                      title={'TOP'}
                      swipeEnabled={false}
                      component={HomeProvider}
                      hideNavBar={true}
                      initial
                    />
                    <Scene
                      key='Search'
                      tabBarLabel={`Search`}
                      icon={TabIcon}
                      title={'Search'}
                      swipeEnabled={false}
                      component={SearchProvider}
                      hideNavBar={true}
                    />
                  </Stack>

                  {/* Manage Page -- team, gridiron */}
                  <Scene
                    key='Manage'
                    tabBarLabel={`Manage`}
                    icon={TabIcon}
                    title={'Manage'}
                    swipeEnabled={false}
                    component={ManageProvider}
                    hideNavBar={true}
                  />

                  {/* league: create, update info */}
                  <Scene
                    key='Tournament'
                    tabBarLabel={`Tournament`}
                    icon={TabIcon}
                    title={'Tournament'}
                    swipeEnabled={false}
                    component={CreateTournamentProvider}
                    hideNavBar={true}
                  />

                  {/* Setting for user: change pass, name */}
                  <Scene
                    key='Setting'
                    tabBarLabel={`Setting`}
                    icon={TabIcon}
                    title={'Setting'}
                    swipeEnabled={false}
                    component={SettingProvider}
                    hideNavBar={true}
                  />
              </Scene>
            </Stack>
          </Router>
        </View>
      </Root>
    );
  }
}

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderTopColor: 'darkgrey',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: 'ghostwhite',
    opacity: 0.98
  },
  labelStyle: {

  }
});
