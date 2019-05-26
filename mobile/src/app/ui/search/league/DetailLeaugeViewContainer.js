import { connect } from 'react-redux';
import _ from 'lodash';
import { removeTeamLeague, registerLeague } from '../../../actions/LeaugeActions';
import DetailLeaugeViewComponent from './DetailLeaugeViewComponent';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    let leauge = state.leagueReducers || {}
    let team = state.teamReducers || {}
    let listTeam = []
    listTeam = _.filter(team.listTeam, (item) => {
      return item.team_users[0].is_captain == true;
    })
    return {
      isLoading: leauge.isLoading,
      listArea: homeReducers.listArea || [],
      listTeam: listTeam || [],
      listCareer: homeReducers.listCareer || [],
    }
  },
  dispatch => {
    return {
      onRegisterLeague: (body) => {
        dispatch(registerLeague(body))
      }
    }
  }
)(DetailLeaugeViewComponent);