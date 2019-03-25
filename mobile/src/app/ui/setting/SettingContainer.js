import { connect } from 'react-redux';
import SettingComponent from './SettingComponent';

export default connect(
  state => {
    return {
      isloadding :  false
    }
  },
  dispatch => {
    return {
    }
  }
)(SettingComponent);