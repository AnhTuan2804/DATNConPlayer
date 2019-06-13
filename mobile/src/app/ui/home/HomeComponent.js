import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, FlatList, TextInput, Modal, Picker } from 'react-native';
import { Container, Content, Header, Item, Icon, Badge } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../ui/common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import firebase from 'firebase';
import _ from 'lodash';
import TimeService from '../../../theme/shared/utils/TimeService';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMatch: [],
            listLeague: [],
            visibleModal: false,
            teamSelect: "",
            matchSelect: null,
            listNotify: [],
            numNotify: 0
        };
    }

    setModalVisible(visible) {
        this.setState({ visibleModal: visible });
    }

    modalForPair() {
        return (
            <Modal
                transparent={true}
                visible={this.state.visibleModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.2)" }}>
                    <View style={{ width: "90%", padding: 30, backgroundColor: "#fff", borderRadius: 5 }}>
                        <View style={{ flexDirection: "row", marginVertical: 10 }}>
                            <Text style={{ color: "green", fontSize: 17 }}>Select your's Team</Text>
                        </View>
                        {this.props.listTeam.length != 0 ?
                            (
                                <View style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}>
                                    <Picker
                                        mode="dropdown"
                                        style={{ height: 40, }}
                                        selectedValue={this.state.teamSelect}
                                        onValueChange={(value, index) => {
                                            this.setState({ teamSelect: value })
                                        }}
                                    >
                                        {this.props.listTeam.length != 0 ?
                                            this.props.listTeam.map((item, index) => { return <Picker.Item value={item.id} label={item.name} key={index} /> })
                                            : <Picker.Item value={'0'} label={"Select your's Team"} key={'00000'} />
                                        }
                                    </Picker>
                                </View>)
                            :
                            <TouchableOpacity
                                style={{ justifyContent: "center", alignItems: "center" }}
                                onPress={() => {
                                    this.setModalVisible(false);
                                    Actions.createTeam();
                                }}><Text>Creat your Team to pair this match</Text></TouchableOpacity>
                        }
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20, }}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    marginVertical: 10, justifyContent: "center", alignItems: "center",
                                    backgroundColor: "#fff", borderRadius: 4, paddingVertical: 5, paddingHorizontal: 10,
                                    borderWidth: 1, marginRight: 20
                                }}
                                onPress={() => {
                                    let body = {
                                        date_of_match: TimeService.formatDateFromTimeUnix(this.state.matchSelect.date_of_match, 'YYYY-MM-DD'),
                                        status: "Waitting",
                                        id: this.state.matchSelect.id,
                                    }
                                    if (this.state.teamSelect == "") {
                                        body['team_guest'] = this.props.listTeam[0]
                                    } else {
                                        let id = this.state.teamSelect
                                        body['team_guest'] = _.find(this.props.listTeam, function (o) { return o.id == id; });
                                    }
                                    this.setModalVisible(false);
                                    this.props.onUpdateMatch(body)
                                }}>
                                <Image style={{ width: 25, height: 25, marginRight: 15 }} resizeMode="contain" source={require("../../../assets/images/icon-match.png")} />
                                <Text style={{ color: "#000", fontSize: 17, fontWeight: "bold" }}>Pair</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginVertical: 10, justifyContent: "center", alignItems: "center",
                                    backgroundColor: "blue", borderRadius: 4, paddingVertical: 5, paddingHorizontal: 10
                                }}
                                onPress={() => {
                                    this.setModalVisible(false);
                                }}>
                                <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    readMatchData() {
        let seft = this
        firebase.database().ref('/match').on('value', function (snapshot) {
            let listItem = []
            _.forEach(snapshot.val(), (value, key) => {
                value['id'] = key
                if ((value.status == "New" || value.status == "Waitting") && listItem.length < 5) {
                    listItem.push(value)
                }
            });
            if (listItem.length) {
                seft.setState({
                    listMatch: listItem
                })
            }
        });
    }

    readLeagueData() {
        let seft = this
        firebase.database().ref('/league').on('value', function (snapshot) {
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

    readNotifyData() {
        let seft = this
        firebase.database().ref('/notify').orderByChild("user_id").equalTo(Constants.USER_ID).on('value', function (snapshot) {
            let listItem = []
            _.forEach(snapshot.val(), (value, key) => {
                value['id'] = key
                listItem.push(value)
            });
            if (listItem.length) {
                seft.setState({
                    listNotify: listItem,
                    numNotify: listItem.length
                })
            }
        });
    }

    async componentDidMount() {
        this.readLeagueData()
        this.readMatchData()
        this.props.onGetAllGridiron()
        await this.props.onGetProfile()
        await this.readNotifyData()
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
                isdisabled = false;
                break;
            default:
                bgColor = 'red'
                isdisabled = true;
                break;
        }

        return (
            <View
                style={{ flex: 1, width: width * 7 / 10, margin: 10, borderRadius: 5, borderWidth: 1 }}
            >
                {this.modalForPair()}
                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true)
                        this.setState({
                            matchSelect: item
                        })
                    }}
                    disabled={!this.props.isLogin || item.status == "Waitting" || item.user.email == Constants.EMAIL_ADDRESS}
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
                    }}
                    >
                        <Icon style={{ fontSize: 16 }} name={'user-friends'} type={'FontAwesome5'} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.team.name}</Text>
                    </View>
                    <Text style={{
                        fontSize: 14, fontWeight: 'bold',
                        backgroundColor: item.status != "Waitting" && item.user.email != Constants.EMAIL_ADDRESS ? bgColor : "#fff",
                        paddingHorizontal: 15, paddingVertical: 5, marginBottom: 5, color: '#fff'
                    }}>{item.status != "Waitting" && item.user.email != Constants.EMAIL_ADDRESS ? "Pair" : null}</Text>
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
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Leader: </Text>
                        <Text style={{ color: 'black', flex: 1 }}>{item.user.fullname}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Status: </Text>
                        <Text style={{ fontWeight: 'bold', color: bgColor, }}>{item.status}</Text>
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
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Invitation Summary: </Text>
                        <Text style={{ color: 'black', flex: 1 }}> {item.invitation}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderItemGridiron = ({ item, index }) => {
        return (
            <View style={{
                flex: 1,
                width: width * 7 / 10,
                borderRadius: 5,
                borderColor: '#78b43d',
                borderWidth: 1,
                marginHorizontal: 10,
            }}>
                <View
                    style={{
                        backgroundColor: '#78b43d',
                        padding: 10,
                        marginBottom: 5,
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
                    }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Gridiron {item.name}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>Phone number: </Text>
                        <Text style={{ color: '#000', flex: 1 }}> {item.phone} </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>Area: </Text>
                        <Text style={{ color: '#000', flex: 1 }}> {item.area.name}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>Address: </Text>
                        <Text style={{ color: '#000', flex: 1 }}> {item.address}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>Description: </Text>
                        <Text style={{ color: '#000', flex: 1 }}> {item.description}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>Link_face: </Text>
                        <Text style={{ color: '#000', flex: 1 }}> {item.link_face}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderItemLeague = ({ item, index }) => {
        return (
            <View style={{
                flex: 1,
                width: width * 7 / 10,
                borderRadius: 5,
                borderColor: 'blue',
                borderWidth: 1,
                marginHorizontal: 10,
            }}>
                <TouchableOpacity
                    onPress={() => Actions.viewLeague({ itemLeague: item })}
                    style={{
                        backgroundColor: 'blue',
                        padding: 10,
                        marginBottom: 5,
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
                    }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: "bold" }}>League {item.name_of_league}</Text>
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
                        justifyContent: 'flex-start',
                        alignItems: "flex-start"
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Summary about league: </Text>
                        <Text style={{ color: 'black', paddingLeft: 10 }}>{item.description}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderListView = (titleHeader, urlImageHeader, dataForlist, clickMorePage, renderSmallItem) => {
        return (
            <View style={{ height: height / 2, marginVertical: 10, backgroundColor: '#fff', borderRadius: 6 }}>
                {/* header tran dau */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: '#c1c1c1', marginHorizontal: 10, marginBottom: 10, paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 32, height: 32, marginRight: 10 }} resizeMode='contain' source={urlImageHeader} />
                        <Text style={{ fontSize: 20, color: '#43a047', fontWeight: 'bold' }}>
                            {titleHeader}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12, paddingRight: 5 }} onPress={() => Actions.jump(clickMorePage)}>
                            see more
                        </Text>
                        <Icon style={{ fontSize: 15 }} name="angle-right" type="FontAwesome" />
                    </TouchableOpacity>
                </View>
                {/* header tran dau */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {dataForlist.length != 0 ?
                        <FlatList
                            style={{
                                flex: 1,
                                paddingVertical: 10,
                                opacity: 0.5,
                            }}
                            horizontal={true}
                            data={dataForlist}
                            renderItem={({ item, index }) => renderSmallItem({ item, index })}
                            keyExtractor={(item, index) => { return `${item.id}` }}
                        >
                        </FlatList> :
                        <Text>Don't have any {titleHeader}</Text>
                    }

                </View>
            </View>
        );
    }

    _renderHeaderSearch = () => {
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10,
            }}>
                <View style={{
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    flex: 1,
                    marginHorizontal: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 0,
                    marginVertical: 0,
                    alignItems: 'center',
                    borderRadius: 5
                }}>
                    <Icon style={{ fontSize: 20, color: '#333' }} name="search" type="FontAwesome" />
                    <TextInput style={{ flex: 1, paddingVertical: 5 }} placeholder="Tìm kiếm..." ></TextInput>
                    {/* <Icon name="ios-people" /> */}
                </View>
                <Icon style={{ marginRight: 10, color: "rgba(240,109,88,1)" }} name="notifications" type="MaterialIcons" />
                <View style={{
                    position: "absolute", top: 6, right: 6,
                    width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(240,109,88,1)',
                    justifyContent: "center", alignItems: "center"
                }}>
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>{this.state.numNotify}</Text>
                </View>
            </View>
        );
    }



    render() {
        const { listGridiron } = this.props
        let logoMatch = require('../../../assets/images/icon-match.png');
        let logoGridiron = require('../../../assets/images/icon-pitch.png');
        let logoLeague = require('../../../assets/images/icon-olympic.png');
        const { search } = this.state;
        return (
            <Container style={{ backgroundColor: '#ccc' }}>
                {Loading(this.props.isLoading)}
                {/* header Search */}
                {this._renderHeaderSearch()}
                {/* header Search */}
                <Content keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    {/* list tran dau */}
                    {this._renderListView('Match', logoMatch, this.state.listMatch, 'Match', this._renderItemMatch.bind(this))}
                    {/* list tran dau */}

                    {/* list san bong */}
                    {this._renderListView('Gridiron', logoGridiron, listGridiron, 'Gridiron', this._renderItemGridiron.bind(this))}

                    {/* list san bong */}

                    {/* list giai dau */}
                    {this._renderListView('League', logoLeague, this.state.listLeague, 'League', this._renderItemLeague.bind(this))}

                    {/* list giai dau */}

                </Content >
            </Container >
        );
    }
};

export default HomeComponent;
