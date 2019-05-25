import React, { Component } from 'react';
import { View, Text, Image, Dimensions, ScrollView, BackHandler, Alert, TouchableOpacity, Platform, Picker, Modal, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm, change } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber, renderSelect, renderFieldTextarea, confirm_min_age, confirm_max_age, number, renderDatePicker, renderFieldWithoutLable } from '../../../theme/variable/Validate';
import TimeService from '../../../theme/shared/utils/TimeService';
import firebase from 'firebase';
import { connect } from 'react-redux';
import _ from 'lodash';


class FormUpdateMatchOfLeague extends Component {
    constructor(props) {
        super(props);
        let initData = {}
        let editScore = false
        let str = this.props.item.gridiron
        console.log(this.props.item.date_of_match);
        console.log(TimeService.getTimeUnixFromTimeFormatYMD(TimeService.getDateWithoutTime(null)));
        console.log((TimeService.getTimeUnixFromTimeFormatYMD(TimeService.getDateWithoutTime(null)) == this.props.item.date_of_match &&
            Number(this.props.item.time.time_end) > (new Date()).getHours()));

        if (this.props.item.date_of_match == undefined) {
            initData = {
                gridiron_id: this.props.listGridiron[0].id,
                time_id: this.props.listTime[0].id,
            }
            editScore = false
        }
        else if ((TimeService.getTimeUnixFromTimeFormatYMD(TimeService.getDateWithoutTime(null)) == this.props.item.date_of_match &&
            Number(this.props.item.time.time_end) > (new Date()).getHours()) ||
            TimeService.getTimeUnixFromTimeFormatYMD(TimeService.getDateWithoutTime(null)) < this.props.item.date_of_match) {
            initData = {
                gridiron_id: _.find(this.props.listGridiron, function (obj) { return obj.name == str }).id,
                time_id: this.props.item.time.id,
                date_of_match: this.props.item.date_of_match,
                description: this.props.item.description
            }
            editScore = false
        }
        else {
            editScore = true
            initData = {
                description: this.props.item.description
            }
        }
        this.props.dispatch(initialize(
            'updateItemMatch',
            initData));

        this.state = {
            editScore: editScore
        }
    }

    render() {
        let { submitForm, item } = this.props
        submit = values => {

            //     "description": "",
            //     "team1_score": 2,    
            //     "team2_score": 1,
            //     "gridiron": "San Bach Khoa",
            //     "time": {
            //     "id": "96f1fba0-5fae-11e9-bd70-25ee54ef8c28",
            //     "time_end": "04",
            //     "time_start": "03",
            //     "itemName": "03 : 04"
            //     }
            // }
            let body = {}
            if (values.team1_score != undefined && values.team1_score != undefined) {
                body = {
                    description: values.description,
                    team1_score: Number(values.team1_score),
                    team2_score: Number(values.team2_score)
                }
            } else if (values.gridiron_id != undefined && values.time_id != undefined && values.date_of_match != undefined) {
                body = {
                    description: values.description,
                    gridiron: _.find(this.props.listGridiron, function (o) { return o.id == values.gridiron_id }).name,
                    time: _.find(this.props.listTime, function (o) { return o.id == values.time_id }),
                    date_of_match: TimeService.getTimeFormatFromTime(values.date_of_match, TimeService.DATE_FORMAT),
                }
            }

            if (submitForm) {
                return submitForm(body)
            }
        }
        const { handleSubmit } = this.props;
        return (

            <View style={{ backgroundColor: "#fff", width: "90%", height: "80%", borderRadius: 5 }}>
                <View style={{
                    margin: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                }}>
                    <View style={{
                        padding: 10,
                        justifyContent: 'flex-start', alignItems: 'flex-start',
                        borderBottomWidth: 1,
                        borderBottomColor: "#28a745"
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Update Information of match</Text>
                    </View>
                    <View style={{ paddingTop: 10, justifyContent: "space-around", alignItems: "center", flexDirection: "row" }}>
                        <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: 18 }}>{item.team1.name}</Text>
                        <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require('../../../assets/images/icon-match.png')} />
                        <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: 18 }}>{item.team2.name}</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '100%', flexDirection: 'column', }}>
                        {this.state.editScore ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ width: '50%', flexDirection: 'column', }}>
                                    <Field name="team1_score" keyboardType="numeric" style={{ width: '100%', flexDirection: 'column' }} textIP="0" component={renderFieldWithoutLable}
                                        validate={[required, number, required_trim, have_point_end]}
                                    />
                                </View>
                                <View style={{ width: '50%', flexDirection: 'column', }}>
                                    <Field name="team2_score" keyboardType="numeric" textIP="0" component={renderFieldWithoutLable}
                                        validate={[required, number, required_trim, have_point_end]}
                                    />
                                </View>
                            </View> : null}
                        {!this.state.editScore ?
                            <Field name="date_of_match"
                                textIP={this.props.item.date_of_match ? TimeService.formatDateFromTimeUnix(this.props.item.date_of_match, 'DD/MM/YYYY') : "Select Date"}
                                label={'Date of match'} component={renderDatePicker}
                                defDate={this.props.item.date_of_match ? new Date(TimeService.formatDateFromTimeUnix(this.props.item.date_of_match, 'MM/DD/YYYY')) : null}
                            /> :
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: "flex-start",
                                paddingBottom: 5,
                                marginLeft: 25,
                            }}>
                                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, }}>Date of match: </Text>
                                <Text style={{ color: 'black', flex: 1, fontSize: 16 }}>{TimeService.formatDateFromTimeUnix(this.props.item.date_of_match, 'DD/MM/YYYY')}</Text>
                            </View>
                        }
                        {!this.state.editScore ?
                            <Field name="time_id" mode="dropdown" textIP="Select Time"
                                data={this.props.listTime} label={'Time'} component={renderSelect}
                            /> :
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: "flex-start",
                                paddingBottom: 5,
                                marginLeft: 25,
                            }}>
                                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, }}>Time: </Text>
                                <Text style={{ color: 'black', flex: 1, fontSize: 16 }}>{this.props.item.time.name}</Text>
                            </View>}
                        {!this.state.editScore ?
                            <Field name="gridiron_id" mode="dropdown" textIP="Select gridiron"
                                data={this.props.listGridiron} label={'Gridiron'} component={renderSelect}
                            /> :
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: "flex-start",
                                paddingBottom: 5,
                                marginLeft: 25,
                            }}>
                                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, }}>Gridiron: </Text>
                                <Text style={{ color: 'black', flex: 1, fontSize: 16 }}>{this.props.item.gridiron}</Text>
                            </View>}
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
                </View>
            </View>
        )
    }
}

export const FormUpdateItemMatch = connect(
    state => {
        let homeReducers = state.homeReducers || {}
        let listTime = homeReducers.listTime || []
        listTime.forEach(item => {
            item['name'] = `${item.time_start}h - ${item.time_end}h`
        });
        return {
            listTime: listTime || [],
            listGridiron: homeReducers.listAllGridiron || [],
        }
    }
)(reduxForm({
    form: 'updateItemMatch'
})(FormUpdateMatchOfLeague))