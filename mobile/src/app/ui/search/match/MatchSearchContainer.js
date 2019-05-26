import { connect } from 'react-redux';
import MatchSearchForm from './MatchSearchComponent';
import _ from 'lodash'

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    let team = state.teamReducers || {};
    let setting = state.settingReducers || {};
    let listTeam = []
    listTeam = _.filter(team.listTeam, (item) => {
      return item.team_users[0].is_captain == true;
    })
    return {
      isLogin: setting.isLogin,
      isLoading: homeReducers.isLoading,
      listLevel: homeReducers.listLevel || [],
      listArea: homeReducers.listArea || [],
      listCareer: homeReducers.listCareer || [],
      listTeam: listTeam || [],
    }
  },
  dispatch => {
    return {
    }
  }
)(MatchSearchForm);