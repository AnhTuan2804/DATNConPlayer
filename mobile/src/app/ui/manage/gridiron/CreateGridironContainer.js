import { connect } from 'react-redux';
import { createTeam } from '../../../actions/TeamActions';
import { createGridiron } from '../../../actions/GridironActions';
import CreateGridironForm from './CreateGridironComponent';
// import { isupdateInfo } from '../../actiosns/SettingActions';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    console.log(homeReducers);

    return {
      isLoading: false,
      listLevel: homeReducers.listLevel || [],
      listArea: homeReducers.listArea || [],
      listCareer: homeReducers.listCareer || [],
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
