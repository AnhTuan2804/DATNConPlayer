import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ImageBackground, Alert, TouchableOpacity, Platform, FlatList } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import firebase from 'firebase';
import _ from 'lodash';
import TimeService from '../../../theme/shared/utils/TimeService';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class LeaugeComponent extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        listLeague: []
    }

    readUserData() {
        let seft = this
        firebase.database().ref('/league').orderByChild("user/email").equalTo(Constants.EMAIL_ADDRESS).on('value', function (snapshot) {
            let listItem = []
            _.forEach(snapshot.val(), (value, key) => {
                value['id'] = key
                listItem.push(value)
            });
            if (listItem.length) {
                seft.setState({
                    listLeague: listItem
                })
            }
        });
    }

    componentWillMount() {
        this.readUserData()
    }

    _renderHeaderManage = (title, titleBtnAdd, onPressAction) => {
        return (
            <View style={{
                marginTop: 20,
                marginHorizontal: 10,
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 32, height: 32, marginRight: 10 }} resizeMode='contain' source={require('../../../assets/images/icon-olympic.png')} />
                    <Text style={{ fontSize: 20, color: '#43a047', fontWeight: 'bold' }}>
                        {title}
                    </Text>
                </View>
                <View style={{
                    marginTop: 10,
                    marginRight: 10,
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}>
                    <TouchableOpacity style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
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

            </View>
        )
    }

    _renderItemLeague = ({ item, index }) => {
        return (
            <View
                style={{ margin: 10, borderRadius: 5, borderWidth: 1 }}
            >
                <TouchableOpacity
                    onPress={() => Actions.detailLeauge({ itemLeague: item })}
                    style={{
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
                        paddingBottom: 5
                    }}
                    >
                        <Image style={{ width: 32, height: 32, marginRight: 10, }} resizeMode={"contain"} source={require("../../../assets/images/icon-league.png")} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name_of_league}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    marginHorizontal: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Managers: </Text>
                        <Text style={{ color: 'black', flex: 1 }}>{item.user.fullname}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Status: </Text>
                        <Text style={{ fontWeight: 'bold', color: "red", }}>{item.status}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Registry expiry date: </Text>
                        <Text style={{ color: 'black', flex: 1 }}>{TimeService.formatDateFromTimeUnix(item.date_expiry_register, 'DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Number of teams registered: </Text>
                        <Text style={{ color: 'black' }}>  {item.list_team ? `${item.list_team.length}` : "0"}/{`${item.number_of_teams}`}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Type of competition: </Text>
                        <Text style={{ color: 'black', flex: 1 }}> {item.type_league.name}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Area: </Text>
                        <Text style={{ color: 'black', flex: 1 }}> {item.area.name}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Summary about league: </Text>
                        <Text style={{ color: 'black', flex: 1 }}> {item.description}</Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        if (this.props.isLogin) {
            return (
                <Container style={{ backgroundColor: 'white' }}>
                    <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                        {this._renderHeaderManage('Manage Leauge', 'Create Leauge', () => Actions.creactLeauge())}
                        <View style={{ flex: 1 }}>
                            {this.state.listLeague.length != 0 ?
                                <FlatList
                                    data={this.state.listLeague}
                                    extraData={this.state}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => { return `${item.id}` }}
                                    renderItem={this._renderItemLeague}
                                /> :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text>Don't have any League</Text>
                                    <Text>Create your league</Text>
                                </View>
                            }
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

export default LeaugeComponent;
