import { connect } from 'react-redux';
import ChangePassForm from './ChangePassComponent';

export default connect(
  state => {
    return {
      isloadding :  false
    }
  },
  dispatch => {
    return {
      onChangePass: (body) => {
        console.log(body);
        // dispatch(isregister(body))
      }
    }
  }
)(ChangePassForm);