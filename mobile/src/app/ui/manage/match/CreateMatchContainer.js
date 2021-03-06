import { connect } from 'react-redux';
import CreateMatchForm from './CreateMatchComponent';
import _ from 'lodash';
import { createMatch } from '../../../actions/MatchActions';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    let gridiron = state.gridironReducers || {};
    let team = state.teamReducers || {};
    let listTime = homeReducers.listTime || []
    listTime.forEach(item => {
      item['name'] = `${item.time_start}h - ${item.time_end}h`
    });
    let isLoading = false
    if (team.isLoading || gridiron.isLoading) {
      isLoading = true
    } else {
      isLoading = false
    }
    let listTeam =  _.filter(team.listTeam, function(o) { return o.team_users[0].is_captain; });
    return {
      isLoading: isLoading,
      listLevel: homeReducers.listLevel || [],
      listArea: homeReducers.listArea || [],
      listCareer: homeReducers.listCareer || [],
      listTime: listTime || [],
      listTeam: listTeam || [],
      listGridiron: gridiron.listGridiron || []
    }
  },
  dispatch => {
    return {
      onCreateMatch: (body) => {
        dispatch(createMatch(body))
      }
    }
  }
)(CreateMatchForm);