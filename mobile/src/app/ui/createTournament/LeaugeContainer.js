import { connect } from 'react-redux';
import LeaugeComponent from './LeaugeComponent';

export default connect(
  state => {
    let setting = state.settingReducers || {};
    return {
      isloadding: false,
      isLogin: setting.isLogin,
    }
  },
  dispatch => {
    return {
    }
  }
)(LeaugeComponent);