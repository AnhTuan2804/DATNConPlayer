import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';

export default connect(
  state => {
    return {
      isloadding: false,
      listMatch: [1, 2, 3, 4, 5],
      listGridiron: [1, 2, 3],
      listLeague: [1, 2, 3, 4, 5, 6, 7],
    }
  },
  dispatch => {
    return {
    }
  }
)(HomeComponent);