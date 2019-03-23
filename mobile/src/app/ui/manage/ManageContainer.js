import { connect } from 'react-redux';
import ManageComponent from './ManageComponent';

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
)(ManageComponent);