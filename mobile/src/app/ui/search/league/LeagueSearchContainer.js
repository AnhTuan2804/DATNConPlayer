import { connect } from 'react-redux';
import LeagueSearchComponent from './LeagueSearchComponent';

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
)(LeagueSearchComponent);