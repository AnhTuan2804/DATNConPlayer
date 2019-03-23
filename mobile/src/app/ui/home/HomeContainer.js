import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';

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
)(HomeComponent);