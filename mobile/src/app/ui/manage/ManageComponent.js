import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { Container, Content, Icon, Item } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { FlatList } from 'react-native-gesture-handler';
import HeaderManage from './common/HeaderItem';
import HeaderItem from './common/HeaderItem';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class ManageComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onGetListTeam()
        this.props.onGetListGridiron()
    }

    _renderHeaderManage = (title, titleBtnAdd, onPressAction) => {
        return (
            <View style={{
                marginHorizontal: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderBottomWidth: 1
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: 'center', alignItems: 'flex-start',

                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flex: 1,
                    margin: 20,
                    paddingVertical: 10,
                    justifyContent: 'center', alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 10,
                    backgroundColor: "#28a745"
                }}
                    onPress={onPressAction}
                >
                    <Icon style={{ fontSize: 16, color: '#fff' }} name="plus-circle" type="FontAwesome" />
                    <Text style={{ color: '#fff', fontWeight: 'bold', paddingHorizontal: 5 }}>{titleBtnAdd}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _renderItemTeam = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: width * 7 / 10, margin: 10, borderRadius: 5, borderWidth: 1 }}>
                {HeaderItem(item.team.name)}
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../../../assets/images/team-fooball.png')}
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-around",
                            width: '100%', height: '100%',
                            backgroundColor: 'transparent',
                            alignItems: "flex-end",
                            paddingBottom: 10
                        }}
                        resizeMode="contain"
                    >
                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 30,
                                backgroundColor: "#17a2b8",
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>View</Text>
                        </TouchableOpacity>
                        {
                            item.is_captain ?
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 30,
                                        backgroundColor: "#17a2b8",
                                        borderRadius: 5
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
                                </TouchableOpacity> : null
                        }

                    </ImageBackground>
                </View>
            </View>
        )
    }

    _renderItemGridiron = ({ item, index }) => {
        console.log(items);
        
        return (
            <View style={{ flex: 1, width: width * 7 / 10, margin: 10, borderRadius: 5, borderWidth: 1 }}>
                {HeaderItem('item.team.name')}    
                <ImageBackground source={require('../../../assets/images/icon-gridiron.jpg')}
                    style={{
                        flexDirection: 'row',
                        justifyContent: "space-around",
                        width: '100%', height: '100%',
                        backgroundColor: 'transparent',
                        alignItems: "flex-end",
                        paddingBottom: 10,
                        flex: 1
                    }}
                    resizeMode="contain"
                >
                </ImageBackground>
            </View>
        )
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{
                        flex: 1,
                        borderBottomWidth: 2,
                        borderBottomColor: "#28a745"
                    }}>
                        {this._renderHeaderManage('Quản lý đội bóng', 'Thêm đội bóng', () => Actions.createTeam())}
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={this.props.listTeam}
                                extraData={this.props}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                keyExtractor={(item, index) => { return `${item.id}` }}
                                renderItem={this._renderItemTeam}
                            />
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        borderTopWidth: 2,
                        borderTopColor: "#28a745",
                    }}>
                        {this._renderHeaderManage('Quản lý sân bóng', 'Thêm sân bóng', () => Actions.createTeam())}
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={this.props.listGridiron}
                                extraData={this.props}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                keyExtractor={(item, index) => { return `${item.id}` }}
                                renderItem={this._renderItemGridiron}
                            />
                        </View>
                    </View>
                </Content >
            </Container >
        );
    }
};

export default ManageComponent;
