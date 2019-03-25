import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import LeagueSearchContainer from './LeagueSearchContainer';

export default  class LeagueSearchProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <LeagueSearchContainer/>                
            </Provider>
        );
    }
};  