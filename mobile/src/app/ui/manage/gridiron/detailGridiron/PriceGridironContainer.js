import { connect } from 'react-redux';
import { createPriceOnTime, delPriceOnTime } from '../../../../actions/GridironActions';
import CreatePriceForm from './PriceGridironComponent';

export default connect(
  state => {
    let homeReducers = state.homeReducers ? state.homeReducers : {}
    let listTime = homeReducers.listTime || []
    listTime.forEach(item => {
      item['name'] = `${item.time_start}h - ${item.time_end}h`
    });
    let gridironReducers = state.gridironReducers || {};
    let infoGridiron = state.gridironReducers.infoGridiron || {};
    return {
      isLoading: gridironReducers.isLoading,
      gridiron_id: infoGridiron.id,
      listSize: homeReducers.listSize || [],
      listTime: listTime || [],
      price_on_times: infoGridiron.price_on_times || [],
    }
  },
  dispatch => {
    return {
      onCreatePriceOnTime: (value) => {
        dispatch(createPriceOnTime(value))
      },
      onDelPriceOnTime: (value) => {
        dispatch(delPriceOnTime(value))
      }
    }
  }
)(CreatePriceForm);
