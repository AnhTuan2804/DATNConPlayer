import { connect } from 'react-redux';
import _ from 'lodash';
import {  updateLeauge } from '../../actions/LeaugeActions';
import DetailLeaugeForm from './DetailLeaugeComponent';

export default connect(
  state => {
    let homeReducers = state.homeReducers || {}
    let leauge = state.leagueReducers || {}
    return {
      isLoading: leauge.isLoading,
      listArea: homeReducers.listArea || [],
      listCareer: homeReducers.listCareer || [],
    }
  },
  dispatch => {
    return {
      onUpdateLeauge: (body) => {
        dispatch(updateLeauge(body))
      }
    }
  }
)(DetailLeaugeForm);