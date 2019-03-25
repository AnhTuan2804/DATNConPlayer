import { connect } from 'react-redux';
import SearchComponent from './SearchComponent';

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
)(SearchComponent);