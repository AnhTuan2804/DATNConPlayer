import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, BackHandler, Alert, TouchableOpacity, Platform, Picker, Modal, FlatList } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Constants from '../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../common/modal/Loading';
import TimeService from '../../../../theme/shared/utils/TimeService';
import firebase from 'firebase';
import _ from 'lodash';

const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;

function FieldInfo(props) {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: "flex-start",
            paddingBottom: 5
        }}>
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, }}>{props.label}: </Text>
            <Text style={{ color: 'black', flex: 1, fontSize: 16 }}>{props.value}</Text>
        </View>
    )
}



class DetailLeaugeViewComponent extends Component {
    isUpdateState = false

    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            itemLeague: this.props.itemLeague,
            id: this.props.itemLeague.id,
            showStandings: false,
            showListTeam: false,
            activeRound: 0,
            showRounds: false,
            currenMatch: null,
            teamSelect: ""
        }
    }

    componentWillMount() {
        this.getdetailLeague()
    }


    componentDidMount() {
        this.isUpdateState = true
    }

    componentWillUnmount() {
        this.isUpdateState = true
    }

    getdetailLeague() {
        const seft = this
        firebase.database().ref(`/league/${this.state.id}`).on('value', function (snapshot) {
            if (snapshot.val()) {
                console.log(seft.isUpdateState);
                if (seft.isUpdateState) {
                    seft.setState({
                        itemLeague: snapshot.val()
                    })
                }
            }
        });
    }

    _renderHeader = (title) => {
        return (
            <View
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
                    <Image style={{ width: 40, height: 40, marginRight: 10, }} resizeMode={"contain"} source={require("../../../../assets/images/icon-league.png")} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                </View>
            </View>
        )
    }

    setModalVisible(visible) {
        this.setState({ visibleModal: visible });
    }

    _renderLeagueInfo() {
        return (
            <View style={{ margin: 10 }}>
                <View style={{
                    flex: 1,
                    marginHorizontal: 10,
                }}>
                    <FieldInfo label={"Managers"} value={this.state.itemLeague.user.fullname} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center",
                        paddingBottom: 5
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>Status: </Text>
                        <Text style={{ fontWeight: 'bold', color: "red", fontSize: 14 }}>{this.state.itemLeague.status}</Text>
                    </View>
                    <FieldInfo label={"Registry expiry date"} value={TimeService.formatDateFromTimeUnix(this.state.itemLeague.date_expiry_register, 'DD/MM/YYYY')} />
                    <FieldInfo label={"Number of teams registered"}
                        value={
                            this.state.itemLeague.list_team ?
                                `${this.state.itemLeague.list_team.length}/${this.state.itemLeague.number_of_teams}`
                                : `0/${this.state.itemLeague.number_of_teams}`} />
                    <FieldInfo label={"Type of competition"} value={this.state.itemLeague.type_league.name} />
                    <FieldInfo label={"Area"} value={this.state.itemLeague.area.name} />
                    <FieldInfo label={"Summary about league"} value={this.state.itemLeague.description} />
                </View>
            </View>)
    }

    _renderLeagueStandings() {
        let listStandings = this.state.itemLeague.list_team_tmp
        listStandings = _.reverse(_.sortBy(listStandings, ['point', 'goal_diffrence', 'for']));
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showStandings: !this.state.showStandings })}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    >
                        <Image style={{ width: 40, height: 32, marginRight: 10, }} resizeMode={"contain"} source={require("../../../../assets/images/icon-standings.png")} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1 }}>League Standings</Text>
                    </View>
                    <Text style={{ paddingRight: 10 }}>{this.state.showStandings ? "Hiden" : "Show"}</Text>
                </TouchableOpacity>
                {this.state.showStandings ?
                    <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                        <FlatList
                            data={listStandings}
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => { return `item_team${index}` }}
                            ListHeaderComponent={() => {
                                return (
                                    <View style={{ flexDirection: "row", paddingVertical: 5, borderBottomWidth: 1 }}>
                                        <Text style={{ color: "#30429d", flex: 1 }}>No.</Text>
                                        <Text style={{ color: "#30429d", flex: 5 }}>Team</Text>
                                        <Text style={{ color: "#30429d", flex: 1.5, textAlign: "center" }}>Played</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>W</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>L</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>GF</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>GA</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>GD</Text>
                                        <Text style={{ color: "#30429d", flex: 1.5, textAlign: "center" }}>Points</Text>
                                    </View>
                                )
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flexDirection: "row", paddingVertical: 10, borderBottomWidth: 1 }}>
                                        <Text style={{ color: "#30429d", flex: 1 }}>{index + 1}.</Text>
                                        <Text style={{ color: "#30429d", flex: 5 }}>{item.team.name}</Text>
                                        <Text style={{ color: "#30429d", flex: 1.5, textAlign: "center" }}>{item.played}</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>{item.won}</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>{item.lost}</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>{item.for}</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>{item.against}</Text>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: "center" }}>{item.goal_diffrence}</Text>
                                        <Text style={{ color: "#30429d", flex: 1.5, textAlign: "center" }}>{item.point}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View> : null}
            </View>
        )
    }

    _renderTeamRegisterLeague() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showListTeam: !this.state.showListTeam })}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    >
                        <Image style={{ width: 40, height: 32, marginRight: 10, }} resizeMode={"contain"} source={require("../../../../assets/images/icon-standings.png")} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1 }}>List teams</Text>
                    </View>
                    <Text style={{ paddingRight: 10 }}>{this.state.showListTeam ? "Hiden" : "Show"}</Text>
                </TouchableOpacity>
                {this.state.showListTeam ?
                    <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                        <FlatList
                            data={this.state.itemLeague.list_team || []}
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => { return `item_team${index}` }}
                            ListHeaderComponent={() => {
                                return (
                                    <View style={{ flexDirection: "row", paddingVertical: 5, borderBottomWidth: 1 }}>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: 'center' }}>No.</Text>
                                        <Text style={{ color: "#30429d", flex: 5 }}>Team</Text>
                                    </View>
                                )
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flexDirection: "row", paddingVertical: 10, borderBottomWidth: 1 }}>
                                        <Text style={{ color: "#30429d", flex: 1, textAlign: 'center' }}>{index + 1}.</Text>
                                        <View style={{ flexDirection: "row", flex: 5 }}>
                                            <Text style={{ color: "#30429d", flex: 1 }}>{item.team.name}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View> : null}
            </View>
        )
    }

    _renderLeagueRound() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showRounds: !this.state.showRounds })}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 10
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    >
                        <Image style={{ width: 40, height: 32, marginRight: 10, }} resizeMode={"contain"}
                            source={require("../../../../assets/images/icon-round-league.png")} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1 }}>League Round</Text>
                    </View>
                    <Text style={{ paddingRight: 10 }}>{this.state.showRounds ? "Hiden" : "Show"}</Text>
                </TouchableOpacity>
                {
                    this.state.showRounds ?
                        (<View>
                            <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                                <FlatList
                                    data={this.state.itemLeague.rounds}
                                    extraData={this.state}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => { return `${index}dsfhcxnmrfhudik` }}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        activeRound: index
                                                    })
                                                }}
                                                activeOpacity={0.9}
                                                style={{
                                                    padding: 10, backgroundColor: this.state.activeRound == index ? "#666" : "#f1f1f1",
                                                    marginHorizontal: 5, marginVertical: 10,
                                                    borderRadius: 5
                                                }}>
                                                <Text style={{ fontSize: 16, color: this.state.activeRound == index ? "#fff" : "#000", fontWeight: "bold" }}>Round {index + 1}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                            <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                                <FlatList
                                    data={this.state.itemLeague.rounds[this.state.activeRound]}
                                    extraData={this.state}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => { return `${index}hfdcxzasoiuzxkgr` }}
                                    renderItem={({ item, index }) => {
                                        if (item.team2.name != "tmp_team_ababab") {
                                            return (
                                                <View>
                                                    <TouchableOpacity
                                                        disabled={this.props.itemLeague.date_expiry_register >= TimeService.getTimeUnixFromTimeFormatYMD(TimeService.getDateWithoutTime(null)) || item.is_updated_sroce}
                                                        activeOpacity={0.9}
                                                        style={{
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            padding: 10,
                                                            borderColor: "grey",
                                                            borderWidth: 1,
                                                            borderRadius: 5,
                                                            marginHorizontal: 10,
                                                            marginVertical: 5
                                                        }}>
                                                        <Text style={{ flex: 1, color: "#000", fontSize: 14, fontWeight: "bold" }}>{item.team1.name}</Text>
                                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                            <Text style={{ color: "green", fontSize: 18, fontWeight: "bold" }}>{item.team1_score || 0}</Text>
                                                            <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold", paddingHorizontal: 10 }}>-</Text>
                                                            <Text style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>{item.team2_score || 0}</Text>
                                                        </View>
                                                        <Text style={{ flex: 1, textAlign: "right", color: "#000", fontSize: 14, fontWeight: "bold" }}>{item.team2.name}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        } else {
                                            return (
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        padding: 10,
                                                        borderColor: "grey",
                                                        borderWidth: 1,
                                                        borderRadius: 5,
                                                        marginHorizontal: 10,
                                                        marginVertical: 5
                                                    }}>
                                                    <Text style={{ color: "#000", fontSize: 14, fontWeight: "bold" }}>{item.team1.name}: Relax</Text>
                                                </View>
                                            )
                                        }
                                    }}
                                />
                            </View>
                        </View>)
                        : null
                }
            </View>
        )
    }

    modalForRegister() {
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
                                }}><Text>Create your team to register this League</Text></TouchableOpacity>
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
                                    let id_team = this.state.teamSelect
                                    let team = id_team == "" ? this.props.listTeam[0] : _.find(this.props.listTeam, function (o) { return o.id == id_team; });
                                    let list_team_of_league = this.state.itemLeague.list_team
                                    if (_.findIndex(list_team_of_league, (o) => { return o.team.id == team.id }) == -1) {
                                        let body = {
                                            id: this.state.id,
                                            team: _.pick(team, ['id', 'name'])
                                        }
                                        this.props.onRegisterLeague(body)
                                    } else {
                                        Alert.alert("Error", `The ${team.name} team registered. Please select another team.`)
                                    }
                                    this.setModalVisible(false);
                                }}>
                                <Image style={{ width: 25, height: 25, marginRight: 15 }} resizeMode="contain" source={require("../../../../assets/images/icon-match.png")} />
                                <Text style={{ color: "#000", fontSize: 17, fontWeight: "bold" }}>Register</Text>
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

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                {this._renderHeader(this.props.itemLeague.name_of_league)}
                {this.modalForRegister()}
                <Content keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    {this.state.itemLeague.status == "New" ? <TouchableOpacity
                        // disabled={this.state.itemLeague.status != "New"}
                        style={{ flexDirection: "row", justifyContent: 'flex-end', alignItems: "flex-end", margin: 10 }}
                        onPress={() => this.setModalVisible(true)}
                    >
                        <Text style={{
                            padding: 10, backgroundColor: "green",
                            color: "#fff", fontSize: 14, fontWeight: "bold", borderRadius: 5
                        }}>Register</Text>
                    </TouchableOpacity> : null}
                    {this._renderLeagueInfo()}
                    {
                        this.state.itemLeague.status == "New" ?
                            this._renderTeamRegisterLeague() :
                            this._renderLeagueStandings()
                    }
                    {this._renderLeagueRound()}
                </Content  >
            </Container >
        );
    }
};

export default DetailLeaugeViewComponent;