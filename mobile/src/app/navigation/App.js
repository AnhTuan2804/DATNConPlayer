import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, PixelRatio } from 'react-native';
import { Root } from 'native-base';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { TabIcon } from './../ui/common/components/TabIcon'
import { Provider } from 'react-redux';
import store from '../store/store';
import Constants from '../../theme/variable/Constants';
import { AsyncStorage } from 'react-native';
import LoginContainer from '../ui/login/LoginContainer';
import RegisterContainer from '../ui/register/RegisterContainer';
import ForgotPassContainer from '../ui/forgotPass/ForgotPassContainer';
import HomeContainer from '../ui/home/HomeContainer';
import MatchSearchContainer from '../ui/search/match/MatchSearchContainer';
import GridironSearchContainer from '../ui/search/gridiron/GridironSearchContainer';
import LeagueSearchContainer from '../ui/search/league/LeagueSearchContainer';
import ManageContainer from '../ui/manage/ManageContainer';
import CreateTournamentContainer from '../ui/createTournament/CreateTournamentContainer';
import CreateTeamContainer from '../ui/manage/team/CreateTeamContainer';
import SettingComponent from '../ui/setting/SettingComponent';
import LoginService from '../../theme/shared/utils/LoginService';
import CreateGridironContainer from '../ui/manage/gridiron/CreateGridironContainer';
import DetailTeamContainer from '../ui/manage/team/DetailTeamContainer';
import DetailGridironComponent from '../ui/manage/gridiron/detailGridiron/DetailGridironComponent';

export default class App extends Component {
  constructor(props) {
    super(props);
    Constants.TOKEN = LoginService.getToken()
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <View style={mainStyles.container}>
            <Router>
              <Stack key='root'>
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
                  initial
                >
                  {/* Home page and search */}
                  <Stack key='home' >
                    <Scene
                      key='TOP'
                      tabBarLabel={`TOP`}
                      icon={TabIcon}
                      title={'TOP'}
                      swipeEnabled={false}
                      component={HomeContainer}
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
                      component={MatchSearchContainer}
                      hideNavBar={true}
                    />
                    <Scene
                      key='Gridiron'
                      tabBarLabel={`Gridiron`}
                      icon={TabIcon}
                      title={'Gridiron'}
                      swipeEnabled={false}
                      component={GridironSearchContainer}
                      hideNavBar={true}
                    />
                    <Scene
                      key='League'
                      tabBarLabel={`League`}
                      icon={TabIcon}
                      title={'League'}
                      swipeEnabled={false}
                      component={LeagueSearchContainer}
                      hideNavBar={true}
                    />
                    {/* list ppage search */}
                  </Stack>

                  {/* Manage Page -- team, gridiron */}
                  <Stack key='management'>
                    <Scene
                      key='Manage'
                      tabBarLabel={`Manage`}
                      icon={TabIcon}
                      title={'Manage'}
                      swipeEnabled={false}
                      component={ManageContainer}
                      hideNavBar={true}
                      initial
                    />
                    <Scene
                      key='createTeam'
                      tabBarLabel={`createTeam`}
                      icon={TabIcon}
                      title={'createTeam'}
                      swipeEnabled={false}
                      component={CreateTeamContainer}
                      hideNavBar={true}
                    />
                    <Scene
                      key='updateTeam'
                      tabBarLabel={`createTeam`}
                      icon={TabIcon}
                      title={'updateTeam'}
                      swipeEnabled={false}
                      component={DetailTeamContainer}
                      hideNavBar={true}
                    />
                    <Scene
                      key='createGridiron'
                      tabBarLabel={`createGridiron`}
                      icon={TabIcon}
                      title={'createGridiron'}
                      swipeEnabled={false}
                      component={CreateGridironContainer}
                      hideNavBar={true}
                    />
                    <Scene
                      key='detailGridiron'
                      tabBarLabel={`detailGridiron`}
                      icon={TabIcon}
                      title={'detailGridiron'}
                      swipeEnabled={false}
                      component={DetailGridironComponent}
                      hideNavBar={true}
                    />
                  </Stack>
                  {/* Manage Page -- team, gridiron */}
                  {/* league: create, update info */}
                  <Scene
                    key='Tournament'
                    tabBarLabel={`Tournament`}
                    icon={TabIcon}
                    title={'Tournament'}
                    swipeEnabled={false}
                    component={CreateTournamentContainer}
                    hideNavBar={true}
                  />

                  {/* Setting for user: change pass, name */}
                  <Scene
                    key='Setting'
                    tabBarLabel={`Setting`}
                    icon={TabIcon}
                    title={'Setting'}
                    swipeEnabled={false}
                    component={SettingComponent}
                    hideNavBar={true}
                  />
                </Scene>
                {/* tabBar */}
                <Scene key='loginScreen'
                  hideNavBar={true}
                  component={LoginContainer}
                  // initial
                />
                <Scene key='registerScreen'
                  hideNavBar={true}
                  component={RegisterContainer}
                />
                <Scene key='forgotPass'
                  hideNavBar={true}
                  component={ForgotPassContainer}
                />
              </Stack>
            </Router>
          </View>
        </Root>
      </Provider>
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
});
