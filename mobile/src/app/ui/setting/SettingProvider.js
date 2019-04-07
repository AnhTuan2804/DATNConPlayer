import { Provider } from 'react-redux';
import store from '../../store/store';
import SettingContainer from './SettingContainer';
import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view';
import { reset, } from 'redux-form';

export default class SettingProvider extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        index: 0,
        routes: [
            { key: 'password', title: "Change Password" },
            { key: 'info', title: "Change Info" },
        ],
    };

    _renderHeader = (props) => {
        return <TabBar {...props}
            style={{ backgroundColor: 'transparent', }}
            renderLabel={this._renderLabel}
            indicatorStyle={{ backgroundColor: '#50c2b4' }}
            scrollEnabled={true}
            // onTabPress={() => reset('changePassword')}
        />
    };

    _renderLabel = ({ route }) => (
        <Text ellipsizeMode='tail' numberOfLines={1} style={{ color: '#373736', textAlign: 'center', }}>{route.title}</Text>
    );

    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffffff' }}>
                    <TabView
                        navigationState={this.state}
                        renderScene={SceneMap({
                            password: SettingContainer,
                            info: SettingContainer,
                        })}
                        renderTabBar={this._renderHeader}
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width, height: 100 }}
                    />
                </View>
            </Provider>
        );
    }
}


