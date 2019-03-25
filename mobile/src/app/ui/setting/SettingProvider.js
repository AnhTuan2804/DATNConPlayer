import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import SettingContainer from './SettingContainer';

export default  class SettingProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <SettingContainer/>                
            </Provider>
        );
    }
};  