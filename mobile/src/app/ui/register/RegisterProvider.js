import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './../../store/store';
import RegisterContainer from './RegisterContainer';

export default  class RegisterProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <RegisterContainer/>                
            </Provider>
        );
    }
};  