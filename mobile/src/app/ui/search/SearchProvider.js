import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import SearchContainer from './SearchContainer';

export default  class SearchProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <SearchContainer/>                
            </Provider>
        );
    }
};  