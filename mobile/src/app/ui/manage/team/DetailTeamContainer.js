import { connect } from 'react-redux';
import CreateTeamForm from './CreateTeamComponent';
import { updateTeam, getdetail, delMember, addMember } from '../../../actions/TeamActions';
import UpdateTeamForm from './DetailTeamComponent';
// import { isupdateInfo } from '../../actiosns/SettingActions';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    let teamReducers = state.teamReducers
    return {
      isLoading: teamReducers.isLoading || false,
      listMember: teamReducers.infoTeam ? teamReducers.infoTeam.team_users : [],
      listLevel: homeReducers.listLevel || [],
      listArea: homeReducers.listArea || [],
      listCareer: homeReducers.listCareer || [],
    }
  },
  dispatch => {
    return {
      onGetDetailTeam: (id) => {
        dispatch(getdetail(id))
      },
      onUpdateTeam: (body) => {
        dispatch(updateTeam(body))
      },
      onDelMember: (value) => {
        dispatch(delMember(value))
      },
      onAddMember: (value) => {
        dispatch(addMember(value))
      }
    }
  }
)(UpdateTeamForm);