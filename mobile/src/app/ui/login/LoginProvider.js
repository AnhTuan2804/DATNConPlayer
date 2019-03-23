import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './../../store/store';
import LoginContainer from './LoginContainer';

export default  class LoginProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <LoginContainer/>                
            </Provider>
        );
    }
};  