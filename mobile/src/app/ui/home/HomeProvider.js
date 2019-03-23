import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './../../store/store';
import HomeContainer from './HomeContainer';

export default  class HomeProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <HomeContainer/>                
            </Provider>
        );
    }
};  