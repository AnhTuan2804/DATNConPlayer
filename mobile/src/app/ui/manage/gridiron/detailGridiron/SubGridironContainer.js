import { connect } from 'react-redux';
import { createSubGridiron, delSubGridiron, createPriceOnTime, delPriceOnTime } from '../../../../actions/GridironActions';
import CreateSubForm from './SubGridironComponent';

export default connect(
  state => {
    let homeReducers = state.homeReducers ? state.homeReducers : {}
    let gridironReducers = state.gridironReducers || {};
    let infoGridiron = state.gridironReducers.infoGridiron || {};
    return {
      isLoading: gridironReducers.isLoading,
      gridiron_id: infoGridiron.id,
      listSize: homeReducers.listSize || [],
      listTime: homeReducers.listTime || [],
      price_on_times: infoGridiron.price_on_times || [],
      sub_gridirons: infoGridiron.sub_gridirons || []
    }
  },
  dispatch => {
    return {
      onDelSub: (value) => {
        dispatch(delSubGridiron(value))
      },
      onCreateSub: (value) => {
        dispatch(createSubGridiron(value))
      },
      onCreatePriceOnTime: (value) => {
        dispatch(createPriceOnTime(value))
      },
      onDelPriceOnTime: (value) => {
        dispatch(delPriceOnTime(value))
      }
    }
  }
)(CreateSubForm);
