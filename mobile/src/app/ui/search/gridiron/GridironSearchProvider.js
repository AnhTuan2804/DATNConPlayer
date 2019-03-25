import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../../store/store';
import GridironSearchContainer from './GridironSearchContainer';

export default  class GridironSearchProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <GridironSearchContainer/>                
            </Provider>
        );
    }
};  