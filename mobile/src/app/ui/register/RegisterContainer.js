import { connect } from 'react-redux';
import RegisterForm from './RegisterComponent';

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
)(RegisterForm);   