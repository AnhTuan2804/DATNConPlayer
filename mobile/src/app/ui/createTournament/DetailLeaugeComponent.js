import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, BackHandler, Alert, TouchableOpacity, Platform, Picker, Modal, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber, renderSelect, renderFieldTextarea, confirm_min_age, confirm_max_age, number, renderDatePicker } from '../../../theme/variable/Validate';
import TimeService from '../../../theme/shared/utils/TimeService';
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

class DetailLeaugeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleModal: false,
            itemLeague: this.props.itemLeague,
            id: this.props.itemLeague.id,
            showStandings: false,
            activeRound: 0
        }
        this.props.dispatch(initialize(
            'updateLeauge',
            {
                name_of_league: this.props.itemLeague.name_of_league,
                date_expiry_register: TimeService.formatDateFromTimeUnix(this.props.itemLeague.date_expiry_register, 'YYYY-MM-DD'),
                area_id: this.props.itemLeague.area.id,
                career_id: this.props.itemLeague.career ? this.props.itemLeague.career.id : undefined,
                description: this.props.itemLeague.description,
            }
        ));
    }

    componentWillMount() {
        this.getdetailLeague()
    }

    getdetailLeague() {
        const seft = this
        firebase.database().ref(`/league/${this.state.id}`).on('value', function (snapshot) {
            if (snapshot.val()) {
                seft.setState({
                    itemLeague: snapshot.val()
                })
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
                    <Image style={{ width: 40, height: 40, marginRight: 10, }} resizeMode={"contain"} source={require("../../../assets/images/icon-league.png")} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                </View>
            </View>
        )
    }

    setModalVisible(visible) {
        this.setState({ visibleModal: visible });
    }

    _renderModalUpdate() {
        submit = values => {
            let body = {
                name_of_league: values.name_of_league,
                area: _.find(this.props.listArea, function (o) { return o.id == values.area_id }),
                career: _.find(this.props.listCareer, function (o) { return o.id == values.career_id }),
                date_expiry_register: TimeService.getTimeFormatFromTime(values.date_expiry_register, `YYYY-MM-DD`),
                description: values.description,
                id: this.props.itemLeague.id,
            }
            this.props.onUpdateLeauge(body)
            this.setModalVisible(false)
        }
        const { handleSubmit } = this.props;
        return (
            <Modal
                transparent={true}
                visible={this.state.visibleModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.2)" }}>
                    <View style={{ backgroundColor: "#fff", width: "90%", height: "80%", borderRadius: 5 }}>
                        <View style={{
                            margin: 10,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: "#28a745"
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-start', alignItems: 'flex-start',

                            }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Update Information of league</Text>
                            </View>
                        </View>
                        <ScrollView contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 10, }}>
                            <View style={{ width: '100%', flexDirection: 'column', }}>
                                <Field name="name_of_league" keyboardType="default" textIP="" label={'Name of leauge'} component={renderField}
                                    validate={[required, required_trim, have_point_end]}
                                />
                                <Field name="date_expiry_register"
                                    textIP={TimeService.formatDateFromTimeUnix(this.props.itemLeague.date_expiry_register, 'DD/MM/YYYY')}
                                    label={'Registry expiry date'} component={renderDatePicker}
                                    defDate={new Date(TimeService.formatDateFromTimeUnix(this.props.itemLeague.date_expiry_register, 'MM/DD/YYYY'))}
                                />
                                <Field name="area_id" mode="dropdown" textIP="Select Area"
                                    data={this.props.listArea} label={'Area'} component={renderSelect}
                                />
                                <Field name="career_id" mode="dropdown" textIP="Select Career"
                                    data={this.props.listCareer} label={'Career'} component={renderSelect}
                                />
                                <Field name="description" keyboardType="default" textIP="Summary about league" label={'Summary about league'} component={renderFieldTextarea}
                                    validate={[required_trim, have_point_end]}
                                />
                            </View>
                        </ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginVertical: 20, }}>
                            <TouchableOpacity onPress={handleSubmit(submit)} style={{
                                backgroundColor: '#00a0e9',
                                borderRadius: 3, alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                    textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10,
                                }}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 3, alignItems: 'center',
                                    backgroundColor: "blue",
                                }}
                                onPress={() => {
                                    this.setModalVisible(false);
                                }}>
                                <Text style={{
                                    color: "#fff", fontSize: 42.63 / Constants.RATE_SIZE,
                                    textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10,
                                }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
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
                        <Image style={{ width: 40, height: 32, marginRight: 10, }} resizeMode={"contain"} source={require("../../../assets/images/icon-standings.png")} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1 }}>League Standings</Text>
                    </View>
                    <Text style={{ paddingRight: 10 }}>{this.state.showStandings ? "Hiden" : "Show"}</Text>
                </TouchableOpacity>
                {this.state.showStandings ?
                    <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                        <FlatList
                            data={this.state.itemLeague.list_team_tmp || this.state.itemLeague.list_team}
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => { return `${item.id}` }}
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
                                        <Text style={{ color: "#30429d", flex: 1 }}>{index}.</Text>
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

    _renderLeagueRound() {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    // onPress={() => this.setState({ showStandings: !this.state.showStandings })}
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
                            source={require("../../../assets/images/icon-round-league.png")} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1 }}>League Round</Text>
                    </View>
                    <Text style={{ paddingRight: 10 }}>{this.state.showStandings ? "Hiden" : "Show"}</Text>
                </TouchableOpacity>
                <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                    <FlatList
                        data={this.state.itemLeague.rounds}
                        extraData={this.state}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
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
                                    <Text style={{ fontSize: 16, color: this.state.activeRound == index ? "#fff" : "#000", fontWeight: "bold" }}>Round {index}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                    <FlatList
                        data={this.state.itemLeague.rounds[this.state.activeRound]}
                        extraData={this.state}
                        ListHeaderComponent={() => {
                            return (
                                <Text>Round {this.state.activeRound}</Text>
                                )
                        }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => { return `${index}hfdcxzasoiuzxkgr` }}
                        renderItem={({ item, index }) => {
                            console.log(item);
                            return (
                                <TouchableOpacity activeOpacity={0.9}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: 10,
                                        backgroundColor: "grey",
                                        marginHorizontal: 10,
                                        marginVertical: 5
                                    }}>
                                    <Text style={{ color: "#fff" }}>Match {index}</Text>
                                    <Text style={{ color: "#fff" }}>Match {index}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                {this._renderHeader(this.props.itemLeague.name_of_league)}
                {this._renderModalUpdate()}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-end", margin: 10 }}
                        onPress={() => this.setModalVisible(true)}>
                        <Text style={{
                            padding: 10, backgroundColor: "green",
                            color: "#fff", fontSize: 14, fontWeight: "bold", borderRadius: 5
                        }}>Update Information of League</Text>
                    </TouchableOpacity>
                    {this._renderLeagueInfo()}
                    {this._renderLeagueStandings()}
                    {this._renderLeagueRound()}
                </Content  >
            </Container >
        );
    }
};

const DetailLeaugeForm = reduxForm({
    form: 'updateLeauge',
})(DetailLeaugeComponent);

export default DetailLeaugeForm;