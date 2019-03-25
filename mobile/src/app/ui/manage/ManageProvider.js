import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import ManageContainer from './ManageContainer';

export default  class ManageProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <ManageContainer/>                
            </Provider>
        );
    }
};  