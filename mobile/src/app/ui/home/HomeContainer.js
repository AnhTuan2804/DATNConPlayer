import { connect } from 'react-redux';
import HomeComponent from './HomeComponent';
import { isGetProfile } from '../../actions/SettingActions';
import { getListArea, getListLever, getListSize, getListTime, getListCareer } from '../../actions/HomeActions';

export default connect(
  state => {
    let homeReducers = state.homeReducers ? state.homeReducers : {}
    return {
      isLoading: homeReducers.isLoading,
      listMatch: [1, 2, 3, 4, 5],
      listGridiron: [1, 2, 3],
      listLeague: [1, 2, 3, 4, 5, 6, 7],
    }
  },
  dispatch => {
    return {
      onGetProfile: () => {
        dispatch(isGetProfile())
      },
      onGetListArea: () => {
        dispatch(getListArea())
      },
      onGetListLevel: () => {
        dispatch(getListLever())
      },
      onGetListSize: () => {
        dispatch(getListSize())
      },
      onGetListTime: () => {
        dispatch(getListTime())
      },
      onGetListCareer: () => {
        dispatch(getListCareer())
      },
    }
  }
)(HomeComponent);