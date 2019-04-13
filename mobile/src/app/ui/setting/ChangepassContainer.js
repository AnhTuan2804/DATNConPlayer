import { connect } from 'react-redux';
import ChangePassForm from './ChangePassComponent';
import { ischangePass } from '../../actions/SettingActions';

export default connect(
  state => {
    let settingReducers = state.settingReducers || {} 
    return {
      isLoading :   settingReducers.isLoading || false,
    }
  },
  dispatch => {
    return {
      onChangePass: (body) => {
        dispatch(ischangePass(body))
      }
    }
  }
)(ChangePassForm);