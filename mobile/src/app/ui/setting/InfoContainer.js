import { connect } from 'react-redux';
import InfoForm from './InfoComponent';
import { isupdateInfo } from '../../actions/SettingActions';

export default connect(
  state => {
    let settingReducers = state.settingReducers || {} 
    return {
      isLoading :   settingReducers.isLoading || false,
    }
  },
  dispatch => {
    return {
      onUpdateInfo: (body) => {
        console.log(body);
        dispatch(isupdateInfo(body))
      }
    }
  }
)(InfoForm);