import { connect } from 'react-redux';
import LoginForm from './LoginComponent';
import { islogin } from '../../actions/LoginActions';

export default connect(
  state => {
    let loginReducer = state.loginReducer || {};
    return {
      userData: loginReducer.userData,
      isLoading: loginReducer.isLoading,
      error: loginReducer.error,
    }
  },
  dispatch => {
    return {
      onLogin: (email, password) => {
        dispatch(islogin(email, password))
      }
    }
  }
)(LoginForm);   