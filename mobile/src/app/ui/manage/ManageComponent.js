import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, ImageBackground, Modal, TouchableHighlight } from 'react-native';
import { Container, Content, Icon, Item } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { FlatList } from 'react-native-gesture-handler';
import HeaderManage from './common/HeaderItem';
import HeaderItem from './common/HeaderItem';
import firebase from 'firebase';
import _ from 'lodash';
import TimeService from '../../../theme/shared/utils/TimeService';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class ManageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMatch: []
        }

    }

    readUserData() {
        let seft = this
        firebase.database().ref('/match').orderByChild("user/email").equalTo(Constants.EMAIL_ADDRESS).on('value', function (snapshot) {
            let listItem = []
            _.forEach(snapshot.val(), (value, key) => {
                value['id'] = key
                listItem.push(value)
            });
            if (listItem.length) {
                seft.setState({
                    listMatch: listItem
                })
            }
        });
    }

    componentDidMount() {
        this.readUserData()
        if (this.props.isLogin) {
            this.props.onGetListTeam()
            this.props.onGetListGridiron()
        }
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
                {HeaderItem(item.name)}
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
                            onPress={() => Actions.updateTeam({ isedit: item.team_users[0].is_captain ? true : false, itemTeam: item })}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>View</Text>
                        </TouchableOpacity>
                        {
                            item.team_users[0].is_captain ?
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 30,
                                        backgroundColor: "#17a2b8",
                                        borderRadius: 5
                                    }}
                                    onPress={() => {
                                        Alert.alert(
                                            'Confirm delete team',
                                            `Are you sure delete  ${item.name} team?`,
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                { text: 'OK', onPress: () => this.props.onDelTeam(item.id) },
                                            ],
                                        );
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
                                </TouchableOpacity> : null
                        }

                    </ImageBackground>
                </View>
            </View>
        )
    }

    _renderItemGridiron = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flex: 1, width: width * 7 / 10, margin: 10, borderRadius: 5, borderWidth: 1 }}>
                {HeaderItem(item.name)}
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
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 30,
                            backgroundColor: "#17a2b8",
                            borderRadius: 5
                        }}
                        onPress={() => Actions.detailGridiron({ itemGridiron: item })}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 30,
                            backgroundColor: "#17a2b8",
                            borderRadius: 5
                        }}
                        onPress={() => {
                            Alert.alert(
                                'Confirm delete gridiron',
                                `Are you sure delete  ${item.name} gridiron?`,
                                [
                                    // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    { text: 'OK', onPress: () => this.props.onDelGridiron(item.id) },
                                ],
                            );
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    _renderItemMatch = ({ item, index }) => {
        let bgColor = ""
        let isdisabled;
        switch (item.status) {
            case "New":
                bgColor = 'green';
                isdisabled = false;
                break;
            case "Waitting":
                bgColor = '#fdb833'
                isdisabled = false;
                break;
            case "Pair success":
                bgColor = 'blue'
                isdisabled = true;
                break;
            default:
                bgColor = 'red'
                isdisabled = true;
                break;
        }

        return (
            <TouchableOpacity
                disabled={isdisabled}
                style={{ flex: 1, width: width * 7 / 10, margin: 10, borderRadius: 5, borderWidth: 1 }}
                onPress={() => Actions.updateMatch({ infoMatch: item })}
            >
                <View style={{
                    margin: 10,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: "#28a745",
                    justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    >
                        <Icon style={{ fontSize: 16 }} name={'user-friends'} type={'FontAwesome5'} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.team.name}</Text>
                    </View>
                    <Text style={{
                        fontSize: 14, fontWeight: 'bold', backgroundColor: bgColor, padding: 5, marginBottom: 5, color: '#fff'
                    }}>{item.status}</Text>
                </View>
                <View style={{
                    flex: 1,
                    marginHorizontal: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Leader: </Text>
                        <Text style={{ color: 'black', flex: 1 }}>{item.user.fullname}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Time: </Text>
                        <Text style={{ color: 'black', flex: 1 }}>{item.time.time_start}h:{item.time.time_end}h {TimeService.formatDateFromTimeUnix(item.date_of_match, 'DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Career: </Text>
                        <Text style={{ color: 'black' }}> {item.career.name}</Text>
                    </View>
                    {item.gridiron ?
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: "center"
                        }}>
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>Gridiron: </Text>
                            <Text style={{ color: 'black', flex: 1 }}> {item.gridiron.name}</Text>
                        </View>
                        : null
                    }
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Address: </Text>
                        <Text style={{ color: 'black', flex: 1 }}> {item.gridiron ? item.gridiron.address : item.area.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        if (this.props.isLogin) {
            return (
                <Container style={{ backgroundColor: 'white' }}>
                    <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                        <View style={{
                            height: height / 2.25,
                            borderBottomWidth: 2,
                            borderBottomColor: "#28a745"
                        }}>
                            {this._renderHeaderManage('Manage Team', 'Create Team', () => Actions.createTeam())}
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
                            height: height / 2.5,
                            borderTopWidth: 2,
                            borderTopColor: "#28a745",
                        }}>
                            {this._renderHeaderManage('Manage Gridiron', 'Create Gridiron', () => Actions.createGridiron())}
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
                        <View style={{
                            height: height / 2.5,
                            borderTopWidth: 2,
                            borderTopColor: "#28a745",
                        }}>
                            {this._renderHeaderManage('Manage Match', 'Create Match', () => Actions.createMatch())}
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={this.state.listMatch}
                                    extraData={this.state}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    keyExtractor={(item, index) => { return `${item.id}` }}
                                    renderItem={this._renderItemMatch}
                                />
                            </View>
                        </View>
                    </Content >
                </Container >
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
};

export default ManageComponent;
