import { connect } from 'react-redux';
import GridironSearchForm from './GridironSearchComponent';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    let team = state.teamReducers || {};
    return {
      isLoading: homeReducers.isLoading,
      listArea: homeReducers.listArea || [],
      listGridiron: homeReducers.listAllGridiron || [],
    }
  },
  dispatch => {
    return {
    }
  }
)(GridironSearchForm);