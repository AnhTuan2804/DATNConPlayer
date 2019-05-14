import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';
import { isGetProfile } from '../../actions/SettingActions';
import { getListArea, getListLever, getListSize, getListTime, getListCareer, getAllListGridiron } from '../../actions/HomeActions';
import { getlistTeam } from '../../actions/TeamActions';
import { updateMatch } from '../../actions/MatchActions';

export default connect(
  state => {
    let homeReducers = state.homeReducers ? state.homeReducers : {}
    let settingReducers = state.settingReducers ? state.settingReducers : {}
    let team = state.teamReducers || {};
    return {
      isLogin: settingReducers.isLogin,
      isLoading: homeReducers.isLoading,
      listTeam: team.listTeam || [],
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