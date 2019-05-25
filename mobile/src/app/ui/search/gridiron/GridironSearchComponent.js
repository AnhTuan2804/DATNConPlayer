import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Field, initialize, reduxForm } from 'redux-form';
import { Container, Content } from 'native-base';
import Constants from '../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../common/modal/Loading';
import Utils from '../../../../theme/shared/utils/Utils';
import { SearchBar, Icon } from 'react-native-elements';
import { renderField, renderSelectSearch } from '../../../../theme/variable/Validate';
import _ from 'lodash';

const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class GridironSearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            listSearch: null,
        };
        this.props.dispatch(initialize(
            'searchGridiron',
            {
                textSearch: "",
                area_id: undefined,
            }
        ));
    }

    _renderItemGridiron = ({ item, index }) => {
        return (
            <View style={{
                // flex: 1,
                // width: width * 7 / 10,
                borderRadius: 5,
                backgroundColor: 'rgb(34,139,34)',
                margin: 10,
                paddingVertical: 10,
            }}>
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
                    }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Gridiron {item.name}</Text>
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

    search(value) {
        let listSearch = this.props.listGridiron;
        if (value.textSearch) {
            const tmp = [];
            _.forEach(listSearch, (item) => {
                if (_.toLower(item.name).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.phone).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.description).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.address).indexOf(_.toLower(value.textSearch)) > -1 ||
                    _.toLower(item.area.name).indexOf(_.toLower(value.textSearch)) > -1) {
                    tmp.push(item);
                }
            });
            listSearch = _.cloneDeep(tmp);
        }
        if (value.area_id) {
            const tmp = _.filter(listSearch, (item) => {
                return _.toLower(item.area.id) == _.toLower(value.area_id);
            })
            listSearch = _.cloneDeep(tmp);
        }
        console.log(listSearch);
        this.setState({
            listSearch: listSearch
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

    render() {
        const { listGridiron } = this.props
        let logoGridiron = require('../../../../assets/images/icon-pitch.png');
        const { search } = this.state;
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
                            <Field name="area_id" mode="dropdown" textIP="Select Area"
                                onChange={(value) => this.search({ area_id: value })}
                                data={this.props.listArea} label={'Area'} component={renderSelectSearch} />
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
                        this.state.listSearch ?
                            this._renderListView('Gridiron', logoGridiron, this.state.listSearch, 'Gridiron', this._renderItemGridiron.bind(this))
                            :
                            this._renderListView('Gridiron', logoGridiron, listGridiron, 'Gridiron', this._renderItemGridiron.bind(this))
                    }
                </Content >
            </Container >
        );
    }
};

// export default GridironSearchComponent;

const GridironSearchForm = reduxForm({
    form: 'searchGridiron',
})(GridironSearchComponent);

export default GridironSearchForm;