import { connect } from 'react-redux';
import MatchSearchComponent from './MatchSearchComponent';

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
)(MatchSearchComponent);