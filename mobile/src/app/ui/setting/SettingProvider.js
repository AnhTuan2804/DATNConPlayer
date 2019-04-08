import { Provider } from 'react-redux';
import store from '../../store/store';
import SettingContainer from './InfoContainer';
import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view';
import { reset, } from 'redux-form';
import ChangepassContainer from './ChangepassContainer';
import InfoContainer from './InfoContainer';

export default class SettingProvider extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        index: 0,
        routes: [
            { key: 'info', title: "Cập nhật thông tin" },
            { key: 'password', title: "Đổi mật khẩu" },
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
        <Text ellipsizeMode='tail' numberOfLines={1} style={{ color: '#373736', textAlign: 'center',flex: 1 }}>{route.title}</Text>
    );

    render() {
        return (
            <Provider store={store}>
            <View style = {{flex: 0.5, backgroundColor: '#cecece'}}>

</View>
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
            </Provider>
        );
    }
}


