import { connect } from 'react-redux';
import CreateTournamentComponent from './CreateTournamentComponent';

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
)(CreateTournamentComponent);