import { connect } from 'react-redux';
import CreateTeamForm from './CreateTeamComponent';
import { createTeam } from '../../../actions/TeamActions';
// import { isupdateInfo } from '../../actiosns/SettingActions';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    return {
      isLoading: false,
      listLevel: homeReducers.listLevel || [],
      listArea: homeReducers.listArea || [],
      listCareer: homeReducers.listCareer || [],
    }
  },
  dispatch => {
    return {
      onCreateTeam: (body) => {
        dispatch(createTeam(body))
      }
    }
  }
)(CreateTeamForm);