import { connect } from 'react-redux';
import InfoForm from './InfoComponent';

export default connect(
  state => {
    return {
      isloadding :  false
    }
  },
  dispatch => {
    return {
      onUpdateInfo: (body) => {
        console.log(body);
        
        // dispatch(isregister(body))
      }
    }
  }
)(InfoForm);