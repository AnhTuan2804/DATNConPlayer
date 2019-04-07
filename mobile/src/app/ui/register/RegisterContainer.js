import { connect } from 'react-redux';
import RegisterForm from './RegisterComponent';
import { isregister } from '../../actions/RegisterActions';

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
      onRegister: (body) => {
        dispatch(isregister(body))
      }
    }
  }
)(RegisterForm);   