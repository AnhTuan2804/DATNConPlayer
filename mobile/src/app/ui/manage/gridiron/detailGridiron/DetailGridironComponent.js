// import { Provider } from 'react-redux';
// import store from '../../store/store';
import React, { Component } from 'react';
import { View, Dimensions, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { TabView, TabBar, SceneMap, } from 'react-native-tab-view';
import { reset, } from 'redux-form';
import UpdateGridironContainer from './UpdateGridironContainer';
import SubGridironContainer from './SubGridironContainer';
import PriceGridironContainer from './PriceGridironContainer';

export default class DetailGridironComponent extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        index: 0,
        routes: [
            { key: 'infoGridiron', title: "Gridiron imformation" },
            { key: 'sub', title: "Sub gridiron" },
            { key: 'price', title: "Price gridiron" },
        ],
    };

    _renderHeader = (props) => {
        return <TabBar {...props}
            style={{ backgroundColor: 'transparent', }}
            renderLabel={this._renderLabel}
            indicatorStyle={{ backgroundColor: '#50c2b4' }}
            scrollEnabled={true}
            onTabPress={() => reset('changePassword')}
        />
    };

    _renderLabel = ({ route }) => (
        <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', color: '#373736', textAlign: 'center', flex: 1 }}>{route.title}</Text>
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, flexDirection: 'column', backgroundColor: '#ffffff' }}>
                    <TabView
                        navigationState={this.state}
                        // renderScene={SceneMap({
                        //     sub: SubGridironContainer,
                        //     infoGridiron: UpdateGridironContainer,
                        // })}
                        renderScene={({ route }) => {
                            switch (route.key) {
                                case 'infoGridiron':
                                    return <UpdateGridironContainer itemGridiron={this.props.itemGridiron} />;
                                case 'sub':
                                    return <SubGridironContainer />;
                                case 'price':
                                    return <PriceGridironContainer />;
                            }
                        }}
                        renderTabBar={this._renderHeader}
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width, height: 100 }}
                    />
                </View>
            </View>
        );
    }
}