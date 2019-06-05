import { connect } from 'react-redux';
import ManageComponent from './ManageComponent';
import { getlistTeam, delTeam } from '../../actions/TeamActions';
import { getListGridiron, delGridiron } from '../../actions/GridironActions';
import _ from 'lodash';

export default connect(
  state => {
    let setting = state.settingReducers || {};
    let gridiron = state.gridironReducers || {};
    let team = state.teamReducers || {};
    let isLoading = false
    if (team.isLoading || gridiron.isLoading) {
      isLoading = true
    } else {
      isLoading = false
    }
    return {
      isLoading: isLoading,
      isLogin: setting.isLogin,
      listTeam: team.listTeam || [],
      listTeamForMatch: _.filter(team.listTeam, function (o) { return o.team_users[0].is_captain; }) || [],
      listGridiron: gridiron.listGridiron || []
    }
  },
  dispatch => {
    return {
      onGetListTeam: () => {
        dispatch(getlistTeam());
      },
      onDelTeam: (id) => {
        dispatch(delTeam(id));
      },
      onGetListGridiron: () => {
        dispatch(getListGridiron());
      },
      onDelGridiron: (id) => {
        dispatch(delGridiron(id));
      },
    }
  }
)(ManageComponent);