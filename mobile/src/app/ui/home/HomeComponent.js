import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, FlatList, TextInput } from 'react-native';
import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../ui/common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { SearchBar } from 'react-native-elements';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    _renderItemMatch = ({ item, index }) => {
        return (
            <View style={{
                flex: 1,
                width: width * 8 / 10,
                borderRadius: 5,
                backgroundColor: 'red',
                marginHorizontal: 10,
            }}>
                <Text style={{ color: 'white' }}>Match{item}</Text>
            </View>
        );
    }

    _renderItemGridiron = ({ item, index }) => {
        return (
            <View style={{
                flex: 1,
                width: width * 7 / 10,
                borderRadius: 5,
                backgroundColor: 'green',
                marginHorizontal: 10,
            }}>
                <Text style={{ color: 'white' }}>Gridiron{item}</Text>
            </View>
        );
    }

    _renderItemLeague = ({ item, index }) => {
        return (
            <View style={{
                flex: 1,
                width: width * 7/ 10,
                borderRadius: 5,
                backgroundColor: 'blue',
                marginHorizontal: 10,
            }}>
                <Text style={{ color: 'white' }}>League{item}</Text>
            </View>
        );
    }

    _renderListView = (titleHeader, urlImageHeader, dataForlist, clickMorePage, renderSmallItem) => {
        return (
            <View style={{ height: height / 3, marginVertical: 10, backgroundColor: '#fff', borderRadius: 6 }}>
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
                            xem thêm
                        </Text>
                        <Icon style={{ fontSize: 15 }} name="angle-right" type="FontAwesome" />
                    </TouchableOpacity>
                </View>
                {/* header tran dau */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{
                            flex: 1,
                            paddingVertical: 10,
                            opacity: 0.5,
                        }}
                        horizontal={true}
                        data={dataForlist}
                        renderItem={({ item, index }) => renderSmallItem({ item, index })}
                        keyExtractor={(item, index) => `dfghjhgf${index}`}
                    >
                    </FlatList>
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
                    <Icon style={{ fontSize: 16, color: '#333' }} name="search" type="FontAwesome" />
                    <TextInput style={{ flex: 1, paddingVertical: 5 }} placeholder="Tìm kiếm..." ></TextInput>
                    {/* <Icon name="ios-people" /> */}
                </View>
                <Icon style={{ marginRight: 10, color: "rgba(240,109,88,1)" }} name="notifications" type="MaterialIcons" />
            </View>
        );
    }

    render() {
        const { listMatch, listGridiron, listLeague } = this.props
        let logoMatch = require('../../../assets/images/icon-match.png');
        let logoGridiron = require('../../../assets/images/icon-pitch.png');
        let logoLeague = require('../../../assets/images/icon-olympic.png');

        const { search } = this.state;
        return (
            <Container style={{ backgroundColor: '#ccc' }}>
                {/* header Search */}
                {this._renderHeaderSearch()}
                {/* header Search */}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    {/* list tran dau */}
                    {this._renderListView('Trận đấu', logoMatch, listMatch, 'Match', this._renderItemMatch.bind(this))}
                    {/* list tran dau */}

                    {/* list san bong */}
                    {this._renderListView('Sân bóng', logoGridiron, listGridiron, 'Gridiron', this._renderItemGridiron.bind(this))}

                    {/* list san bong */}

                    {/* list giai dau */}
                    {this._renderListView('Giải đấu', logoLeague, listLeague, 'League', this._renderItemLeague.bind(this))}

                    {/* list giai dau */}

                </Content >
            </Container >
        );
    }
};

export default HomeComponent;
