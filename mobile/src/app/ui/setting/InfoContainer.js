import { connect } from 'react-redux';
import InfoForm from './InfoComponent';
import { isupdateInfo, isGetProfile } from '../../actions/SettingActions';

export default connect(
  state => {
    let settingReducers = state.settingReducers || {}
    let userInfo = settingReducers.userData ? settingReducers.userData : {}
    return {
      isLoading: settingReducers.isLoading,
      email: userInfo.email ? userInfo.email : "",
      initialValues: {
        fullname: userInfo.fullname ? userInfo.fullname : "",
        phone: userInfo.phone ? `${userInfo.phone}` : "",
      }
    }
  },
  dispatch => {
    return {
      onUpdateInfo: (body) => {
        dispatch(isupdateInfo(body))
      },
      onGetProfile: () => {
        dispatch(isGetProfile())
      }
    }
  }
)(InfoForm);