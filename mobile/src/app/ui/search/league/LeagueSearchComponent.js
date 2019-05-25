import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../common/modal/Loading';
import { Field, initialize, reduxForm } from 'redux-form';
import { renderSelectSearch, renderField } from '../../../../theme/variable/Validate';
import firebase from 'firebase';
import _ from 'lodash';
import TimeService from '../../../../theme/shared/utils/TimeService';

const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class LeagueSearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLeague: [],
            listLeagueSearch: null,
            visibleModal: false,
            teamSelect: "",
            matchSelect: null
        }
        this.props.dispatch(initialize(
            'searchLeague',
            {
                date: "",
                textSearch: "",
                area_id: undefined,
                career_id: undefined,
            }
        ));
    }

    setModalVisible(visible) {
        this.setState({ visibleModal: visible });
    }

    // modalForPair() {
    //     return (
    //         <Modal
    //             transparent={true}
    //             visible={this.state.visibleModal}
    //             onRequestClose={() => {
    //                 Alert.alert('Modal has been closed.');
    //             }}>
    //             <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.2)" }}>
    //                 <View style={{ width: "90%", padding: 30, backgroundColor: "#fff", borderRadius: 5 }}>
    //                     <View style={{ flexDirection: "row", marginVertical: 10 }}>
    //                         <Text style={{ color: "green", fontSize: 17 }}>Select your's Team</Text>
    //                     </View>
    //                     {this.props.listTeam.length != 0 ?
    //                         (
    //                             <View style={{ borderColor: "black", borderWidth: 1, borderRadius: 5 }}>
    //                                 <Picker
    //                                     mode="dropdown"
    //                                     style={{ height: 40, }}
    //                                     selectedValue={this.state.teamSelect}
    //                                     onValueChange={(value, index) => {
    //                                         this.setState({ teamSelect: value })
    //                                     }}
    //                                 >
    //                                     {this.props.listTeam.length != 0 ?
    //                                         this.props.listTeam.map((item, index) => { return <Picker.Item value={item.id} label={item.name} key={index} /> })
    //                                         : <Picker.Item value={'0'} label={"Select your's Team"} key={'00000'} />
    //                                     }
    //                                 </Picker>
    //                             </View>)
    //                         :
    //                         <TouchableOpacity
    //                             style={{ justifyContent: "center", alignItems: "center" }}
    //                             onPress={() => {
    //                                 this.setModalVisible(false);
    //                                 Actions.createTeam();
    //                             }}><Text>Creat your's Team to pair this match</Text></TouchableOpacity>
    //                     }
    //                     <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20, }}>
    //                         <TouchableOpacity
    //                             style={{
    //                                 flexDirection: "row",
    //                                 marginVertical: 10, justifyContent: "center", alignItems: "center",
    //                                 backgroundColor: "#fff", borderRadius: 4, paddingVertical: 5, paddingHorizontal: 10,
    //                                 borderWidth: 1, marginRight: 20
    //                             }}
    //                             onPress={() => {
    //                                 console.log(this.state.matchSelect);

    //                                 let body = {
    //                                     date_of_match: TimeService.formatDateFromTimeUnix(this.state.matchSelect.date_of_match, 'YYYY-MM-DD'),
    //                                     status: "Waitting",
    //                                     id: this.state.matchSelect.id,
    //                                 }
    //                                 if (this.state.teamSelect == "") {
    //                                     body['team_guest'] = this.props.listTeam[0]
    //                                 } else {
    //                                     let id = this.state.teamSelect
    //                                     body['team_guest'] = _.find(this.props.listTeam, function (o) { return o.id == id; });
    //                                 }
    //                                 console.log(body);

    //                                 this.setModalVisible(false);
    //                                 this.props.onUpdateMatch(body)
    //                             }}>
    //                             <Image style={{ width: 25, height: 25, marginRight: 15 }} resizeMode="contain" source={require("../../../../assets/images/icon-match.png")} />
    //                             <Text style={{ color: "#000", fontSize: 17, fontWeight: "bold" }}>Pair</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity
    //                             style={{
    //                                 marginVertical: 10, justifyContent: "center", alignItems: "center",
    //                                 backgroundColor: "blue", borderRadius: 4, paddingVertical: 5, paddingHorizontal: 10
    //                             }}
    //                             onPress={() => {
    //                                 this.setModalVisible(false);
    //                             }}>
    //                             <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>Close</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //             </View>
    //         </Modal>
    //     );
    // }


    readUserData() {
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

    componentWillMount() {
        this.readUserData()
    }

    updateSearch = search => {
        this.setState({ search });
    };


    search(value) {
        let listMatchSearch = this.state.listMatch;
        if (value.date) {
            const tmp = _.filter(listMatchSearch, (item) => {
                return item.date_of_match == date;
            })
            listMatchSearch = _.cloneDeep(tmp);
        }
        if (value.textSearch) {
            const tmp = [];
            _.forEach(listMatchSearch, (item) => {
                if (_.toLower(item.team.name).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.user.fullname).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.gridiron.name).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.gridiron.address).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.area.name).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.level.name).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.career.name).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.invitation).indexOf(_.toLower(value.textSearch)) > -1) {
                    tmp.push(item);
                }
            });
            listMatchSearch = _.cloneDeep(tmp);
        }
        if (value.area_id) {
            const tmp = _.filter(listMatchSearch, (item) => {
                return _.toLower(item.area.id) == _.toLower(value.area_id);
            })
            listMatchSearch = _.cloneDeep(tmp);
        }
        if (value.career_id) {
            const tmp = _.filter(listMatchSearch, (item) => {
                return _.toLower(item.career.id) == _.toLower(value.career_id);
            })
            listMatchSearch = _.cloneDeep(tmp);
        }
        console.log(listMatchSearch);
        this.setState({
            listLeagueSearch: listMatchSearch
        })
    }

    _renderListView = (titleHeader, urlImageHeader, dataForlist, clickMorePage, renderSmallItem) => {
        return (
            <View style={{ marginVertical: 10, backgroundColor: '#fff', borderRadius: 6 }}>
                {/* header tran dau */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: '#c1c1c1', marginHorizontal: 10, marginBottom: 10, paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 32, height: 32, marginRight: 10 }} resizeMode='contain' source={urlImageHeader} />
                        <Text style={{ fontSize: 20, color: '#43a047', fontWeight: 'bold' }}>
                            {titleHeader}
                        </Text>
                    </View>
                </View>
                {/* header tran dau */}
                <View style={{ flex: 1, }}>
                    {dataForlist.length != 0 ?
                        <FlatList
                            style={{
                                flex: 1,
                                paddingVertical: 10,
                                opacity: 0.5,
                            }}
                            data={dataForlist}
                            renderItem={({ item, index }) => renderSmallItem({ item, index })}
                            keyExtractor={(item, index) => { return `${item.id}` }}
                        >
                        </FlatList> :
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text>Don't have any {titleHeader}</Text>
                        </View>
                    }

                </View>
            </View>
        );
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
                        <Image style={{ width: 32, height: 32, marginRight: 10, }} resizeMode={"contain"} source={require("../../../../assets/images/icon-league.png")} />
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
        let logoMatch = require('../../../../assets/images/icon-match.png');
        submit = values => {
            console.log(values);
            this.search(values)
        }
        const { handleSubmit } = this.props;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <Field name="textSearch" keyboardType="default" textIP="" label={'Search'} component={renderField} />
                            <View style={{ width: '100%', flexDirection: 'row', }}>
                                <View style={{ width: '50%', flexDirection: 'column', }}>
                                    <Field name="area_id" mode="dropdown" textIP="Select Area"
                                        data={this.props.listArea} label={'Area'} component={renderSelectSearch} />
                                </View>
                                <View style={{ width: '50%', flexDirection: 'column', }}>
                                    <Field name="career_id" mode="dropdown" textIP="Select Career"
                                        data={this.props.listCareer} label={'Career'} component={renderSelectSearch} />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleSubmit(submit)} style={{
                            backgroundColor: '#00a0e9',
                            borderRadius: 3, alignItems: 'center', marginBottom: 40,
                        }}>
                            <Text style={{
                                color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10, color: '#fafcfc',
                            }}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.listLeagueSearch ?
                            this._renderListView('League', logoMatch, this.state.listLeagueSearch, 'Match', this._renderItemLeague.bind(this))
                            : this._renderListView('League', logoMatch, this.state.listLeague, 'Match', this._renderItemLeague.bind(this))
                    }
                </Content >
            </Container >
        );
    }
};

const LeagueSearchForm = reduxForm({
    form: 'searchLeague',
})(LeagueSearchComponent);

export default LeagueSearchForm;

// export default LeagueSearchComponent;
