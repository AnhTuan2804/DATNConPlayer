import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import ForgotPassContainer from './ForgotPassContainer';

export default  class ForgotPassProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <ForgotPassContainer/>                
            </Provider>
        );
    }
};  