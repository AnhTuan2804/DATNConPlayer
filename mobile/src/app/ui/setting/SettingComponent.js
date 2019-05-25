// import { Provider } from 'react-redux';
// import store from '../../store/store';
import React, { Component } from 'react';
import { View, Dimensions, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view';
import { reset, } from 'redux-form';
import ChangepassContainer from './ChangepassContainer';
import InfoContainer from './InfoContainer';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class SettingComponent extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        index: 0,
        routes: [
            { key: 'info', title: "Update user information" },
            { key: 'password', title: "Change Password" },
        ],
    };

    _renderHeader = (props) => {
        return <TabBar {...props}
            style={{ backgroundColor: 'transparent', }}
            renderLabel={this._renderLabel}
            indicatorStyle={{ backgroundColor: '#50c2b4' }}
            scrollEnabled={false}
            onTabPress={() => reset('changePassword')}
        />
    };

    _renderLabel = ({ route }) => (
        <Text ellipsizeMode='tail' numberOfLines={1} style={{ color: '#373736', textAlign: 'center', flex: 1 }}>{route.title}</Text>
    );

    render() {
        if (this.props.isLogin) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2, flexDirection: 'column', backgroundColor: '#ffffff' }}>
                        <TabView
                            navigationState={this.state}
                            renderScene={SceneMap({
                                password: ChangepassContainer,
                                info: InfoContainer,
                            })}
                            renderTabBar={this._renderHeader}
                            onIndexChange={index => this.setState({ index })}
                            initialLayout={{ width: Dimensions.get('window').width, height: 100 }}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <ImageBackground source={require('../../../assets/images/bagroundBong.jpg')}
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent', }}>
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Please login to use this service</Text>
                        <TouchableOpacity
                            style={{ paddingVertical: 20 }}
                            onPress={() => {
                                Actions.loginScreen()
                            }}>
                            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', }} >Go To Login</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            )
        }
    }
}

export default connect(
    state => {
        let setting = state.settingReducers || {};
        return {
            isLogin: setting.isLogin
        }
    }
)(SettingComponent)
