import { connect } from 'react-redux';
import _ from 'lodash';
import CreateLeaugeForm from './CreateLeaugeComponent';
import { createLeauge } from '../../actions/LeaugeActions';

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
      onCreateLeauge: (body) => {
        dispatch(createLeauge(body))
      }
    }
  }
)(CreateLeaugeForm);