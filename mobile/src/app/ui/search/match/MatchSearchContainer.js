import { connect } from 'react-redux';
import MatchSearchForm from './MatchSearchComponent';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    let team = state.teamReducers || {};
    return {
      isLoading: homeReducers.isLoading,
      listLevel: homeReducers.listLevel || [],
      listArea: homeReducers.listArea || [],
      listCareer: homeReducers.listCareer || [],
      listTeam: team.listTeam || [],
    }
  },
  dispatch => {
    return {
    }
  }
)(MatchSearchForm);