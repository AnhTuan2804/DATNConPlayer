import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';
import { isGetProfile } from '../../actions/SettingActions';
import { getListArea, getListLever, getListSize, getListTime, getListCareer, getAllListGridiron } from '../../actions/HomeActions';
import { getlistTeam } from '../../actions/TeamActions';
import { updateMatch } from '../../actions/MatchActions';
import _ from 'lodash';

export default connect(
  state => {
    let homeReducers = state.homeReducers ? state.homeReducers : {}
    let settingReducers = state.settingReducers ? state.settingReducers : {}
    let team = state.teamReducers || {};
    let listTeam = []
    listTeam = _.filter(listTeam, (item) => {
      return item.team_users[0].is_captain == true;
    })
    return {
      isLogin: settingReducers.isLogin,
      isLoading: homeReducers.isLoading,
      listTeam: listTeam,
      listGridiron: homeReducers.listAllGridiron || [],
      // listLeague: [1, 2, 3, 4, 5, 6, 7],
    }
  },
  dispatch => {
    return {
      onGetAllGridiron: () => {
        dispatch(getAllListGridiron())
      },
      onGetProfile: () => {
        dispatch(isGetProfile(true))
      },
      onUpdateMatch: (body) => {
        dispatch(updateMatch(body, false))
      }
    }
  }
)(HomeComponent);