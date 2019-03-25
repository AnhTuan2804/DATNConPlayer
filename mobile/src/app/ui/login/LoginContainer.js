import { connect } from 'react-redux';
import LoginForm from './LoginComponent';

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
      onLogin: (userID, password) => {
        dispatch(islogin(userID, password))
      }
    }
  }
)(LoginForm);   