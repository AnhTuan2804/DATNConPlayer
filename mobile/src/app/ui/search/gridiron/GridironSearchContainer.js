import { connect } from 'react-redux';
import GridironSearchComponent from './GridironSearchComponent';

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
)(GridironSearchComponent);