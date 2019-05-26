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

    getLeagueData() {
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
        this.getLeagueData()
    }

    updateSearch = search => {
        this.setState({ search });
    };


    search(value) {
        let listLeagueSearch = this.state.listLeague;
        if (value.textSearch) {
            const tmp = [];
            _.forEach(listLeagueSearch, (item) => {
                if (_.toLower(item.name_of_league).indexOf(_.toLower(textSearch)) > -1 ||
                    _.toLower(item.area.name).indexOf(_.toLower(textSearch)) > -1 ||
                    _.toLower(item.career.name).indexOf(_.toLower(textSearch)) > -1 ||
                    _.toLower(item.description).indexOf(_.toLower(textSearch)) > -1 ||
                    _.toLower(item.status).indexOf(_.toLower(textSearch)) > -1 ||
                    _.toLower(item.type_league.name).indexOf(_.toLower(textSearch)) > -1) {
                    tmp.push(item);
                }
            });
            listLeagueSearch = _.cloneDeep(tmp);
        }
        if (value.area_id) {
            const tmp = _.filter(listLeagueSearch, (item) => {
                return _.toLower(item.area.id) == _.toLower(value.area_id);
            })
            listLeagueSearch = _.cloneDeep(tmp);
        }
        if (value.career_id) {
            const tmp = _.filter(listLeagueSearch, (item) => {
                return _.toLower(item.career.id) == _.toLower(value.career_id);
            })
            listLeagueSearch = _.cloneDeep(tmp);
        }
        console.log(listLeagueSearch);
        this.setState({
            listLeagueSearch: listLeagueSearch
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
                    onPress={() => Actions.detailLeauge({ itemLeague: item, is_view: true })}
                    style={{
                        padding: 10,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: "#28a745",
                        justifyContent: 'space-between', alignItems: 'center',
                        backgroundColor: '#63cbf3'
                    }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingBottom: 5
                    }}
                    >
                        <Image style={{ width: 32, height: 32, marginRight: 10, tintColor: "#fff" }} resizeMode={"contain"} source={require("../../../../assets/images/icon-league.png")} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#fff" }}>{item.name_of_league}</Text>
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
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity onPress={handleSubmit(submit)} style={{
                                backgroundColor: '#00a0e9',
                                borderRadius: 3, alignItems: 'center', marginRight: 10
                            }}>
                                <Text style={{
                                    color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                    textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10, color: '#fafcfc',
                                }}>Search</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ listLeagueSearch: null })} style={{
                                backgroundColor: '#00a0e9',
                                borderRadius: 3, alignItems: 'center', marginLeft: 10
                            }}>
                                <Text style={{
                                    color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                    textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10, color: '#fafcfc',
                                }}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.state.listLeagueSearch ?
                            this._renderListView('League', logoMatch, this.state.listLeagueSearch, 'League', this._renderItemLeague.bind(this))
                            : this._renderListView('League', logoMatch, this.state.listLeague, 'League', this._renderItemLeague.bind(this))
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
