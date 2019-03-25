import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import MatchSearchContainer from './MatchSearchContainer';

export default  class MatchSearchProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <MatchSearchContainer/>                
            </Provider>
        );
    }
};  