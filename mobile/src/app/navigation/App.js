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
import ManageProvider from '../ui/manage/ManageProvider';
import SettingProvider from '../ui/setting/SettingProvider';
import MatchSearchProvider from '../ui/search/match/MatchSearchProvider';
import LeagueSearchProvider from '../ui/search/league/LeagueSearchProvider';
import GridironSearchProvider from '../ui/search/gridiron/GridironSearchProvider';
import Constants from '../../theme/variable/Constants';

import { AsyncStorage } from 'react-native';
import ForgotPassProvider from '../ui/forgotPass/ForgotPassProvider';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        return true
      } else {
        return false
      }
    } catch (error) {
      // Error retrieving data\
      console.log('errrrrrr rồi');
      return false;
    }
  };

  componentDidMount() {
    this.setState({
      isLogin: this._retrieveData()
    })
  }

  render() {
    // let isA123 =  this._retrieveData() || false
    return (
      <Root>
        <View style={mainStyles.container}>
          <Router>
            <Stack key='root'>
              <Scene key='loginScreen'
                hideNavBar={true}
                component={LoginProvider}
                initial={!this.state.isLogin}
              />
              <Scene key='registerScreen'
                hideNavBar={true}
                component={RegisterProvider}
              />
              <Scene key='forgotPass'
                hideNavBar={true}
                component={ForgotPassProvider}
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
                initial={this.state.isLogin}
              >

                {/* Home page and search */}
                <Stack key='home' >
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
                  {/* list ppage search */}
                  <Scene
                    key='Match'
                    tabBarLabel={`Match`}
                    icon={TabIcon}
                    title={'Match'}
                    swipeEnabled={false}
                    component={MatchSearchProvider}
                    hideNavBar={true}
                  />
                  <Scene
                    key='Gridiron'
                    tabBarLabel={`Gridiron`}
                    icon={TabIcon}
                    title={'Gridiron'}
                    swipeEnabled={false}
                    component={GridironSearchProvider}
                    hideNavBar={true}
                  />
                  <Scene
                    key='League'
                    tabBarLabel={`League`}
                    icon={TabIcon}
                    title={'League'}
                    swipeEnabled={false}
                    component={LeagueSearchProvider}
                    hideNavBar={true}
                  />
                  {/* list ppage search */}
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
