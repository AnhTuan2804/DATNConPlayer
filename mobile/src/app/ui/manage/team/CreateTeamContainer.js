import { connect } from 'react-redux';
import CreateTeamForm from './CreateTeamComponent';
// import { isupdateInfo } from '../../actiosns/SettingActions';

export default connect(
  state => {
    // let settingReducers = state.settingReducers || {} 
    return {
      isLoading :   false,
    }
  },
  dispatch => {
    return {
      // onUpdateInfo: (body) => {
      //   console.log(body);
      //   dispatch(isupdateInfo(body))
      // }
    }
  }
)(CreateTeamForm);