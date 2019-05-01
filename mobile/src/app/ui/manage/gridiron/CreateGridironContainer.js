import { connect } from 'react-redux';
import { createTeam } from '../../../actions/TeamActions';
import { createGridiron } from '../../../actions/GridironActions';
import CreateGridironForm from './CreateGridironComponent';
// import { isupdateInfo } from '../../actiosns/SettingActions';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    return {
      isLoading: false,
      listArea: homeReducers.listArea || [],
    }
  },
  dispatch => {
    return {
      onCreateGridiron: (body) => {
        dispatch(createGridiron(body))
      }
    }
  }
)(CreateGridironForm);
