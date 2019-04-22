import { connect } from 'react-redux';
import ManageComponent from './ManageComponent';
import { getlistTeam } from '../../actions/TeamActions';
import { getListGridiron } from '../../actions/GridironActions';

export default connect(
  state => {
    let gridiron = state.gridironReducers || {};
    let team = state.teamReducers || {};
    console.log(team);

    return {
      isLoading: team.isLoading || gridiron.isLoading || false,
      listTeam: team.listTeam || [],
      listGridiron: gridiron.lisstGridiron || []
    }
  },
  dispatch => {
    return {
      onGetListTeam: () => {
        dispatch(getlistTeam());
      },
      onGetListGridiron: () => {
        dispatch(getListGridiron());
      },
    }
  }
)(ManageComponent);