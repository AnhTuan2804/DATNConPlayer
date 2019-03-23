import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import CreateTournamentContainer from './CreateTournamentContainer';

export default  class CreateTournamentProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <CreateTournamentContainer/>                
            </Provider>
        );
    }
};  