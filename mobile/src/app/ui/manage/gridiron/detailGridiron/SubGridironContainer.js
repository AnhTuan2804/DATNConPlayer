import { connect } from 'react-redux';
import { createSubGridiron, delSubGridiron, createPriceOnTime, delPriceOnTime } from '../../../../actions/GridironActions';
import SubGridironComponent from './SubGridironComponent';

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
)(SubGridironComponent);
