import { connect } from 'react-redux';
import ForgotPassForm from './ForgotPassComponent';
import { isforgotPass } from '../../actions/ForgotPassActions';

export default connect(
  state => {
    let forgotPassReducers = state.forgotPassReducers || {};
    return {
      // userData: loginReducer.userData,
      isLoading: forgotPassReducers.isLoading || false,
      error: forgotPassReducers.error,
    }
  },
  dispatch => {
    return {
      onForgotPass: (email) => {
        dispatch(isforgotPass(email))
      }
    }
  }
)(ForgotPassForm);   