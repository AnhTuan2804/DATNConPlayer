import { connect } from 'react-redux';
import { updateGridiron, getDetailGridiron } from '../../../../actions/GridironActions';
import UpdateGridironForm from './UpdateGridironComponent';

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
      onUpdateGridiron: (body) => {
        dispatch(updateGridiron(body))
      },
      onGetDetailGridiron: (id) => {
        dispatch(getDetailGridiron(id))
      },
    }
  }
)(UpdateGridironForm);
