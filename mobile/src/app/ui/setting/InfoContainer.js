import { connect } from 'react-redux';
import InfoComponent from './InfoComponent';

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
)(InfoComponent);