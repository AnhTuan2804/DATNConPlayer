import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, Picker } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Constants from '../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../common/modal/Loading';
import Utils from '../../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber, renderSelect, renderFieldTextarea, confirm_min_age, confirm_max_age, number, renderDatePicker } from '../../../../theme/variable/Validate';
import TimeService from '../../../../theme/shared/utils/TimeService';
import _ from 'lodash';

const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class UpdateMatchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectGridirons: this.props.infoMatch.gridiron != undefined ? true : false
        }
        this.props.dispatch(initialize(
            'updateMatch',
            {
                date_of_match: TimeService.formatDateFromTimeUnix(this.props.infoMatch.date_of_match, 'DD/MM/YYYY'),
                time_id: this.props.infoMatch.time.id,
                team: this.props.infoMatch.team.id,
                gridiron: this.props.infoMatch.gridiron != undefined ? this.props.infoMatch.gridiron.id : undefined,
                area_id: this.props.infoMatch.area.id,
                level_id: this.props.infoMatch.level.id,
                career_id: this.props.infoMatch.career.id,
                status: this.props.infoMatch.status,
                invitation: this.props.infoMatch.invitation,
                id: this.props.infoMatch.id
            }
        ));
    }

    checkArea(value) {
        if (value != undefined) {
            let gridiron = _.find(this.props.listGridiron, function (o) { return o.id == value })
            this.props.change("area_id", gridiron.area_id),
                this.setState({ isSelectGridirons: true })
        }
    }

    _renderHeader = (title) => {
        return (
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                </View>
            </View>
        )
    }

    render() {
        submit = values => {
            let body = {
                area: _.find(this.props.listArea, function (o) { return o.id == values.area_id }),
                level: _.find(this.props.listLevel, function (o) { return o.id == values.level_id }),
                time: _.find(this.props.listTime, function (o) { return o.id == values.time_id }),
                team: _.find(this.props.listTeam, function (o) { return o.id == values.team }),
                gridiron: _.find(this.props.listGridiron, function (o) { return o.id == values.gridiron }),
                career: _.find(this.props.listCareer, function (o) { return o.id == values.career_id }),
                date_of_match: TimeService.getTimeFormatFromTime(values.date_of_match, 'YYYY-MM-DD'),
                invitation: values.invitation,
                status: values.status,
                id: values.id
            }
            this.props.onUpdateMatch(body)
        }
        const { handleSubmit } = this.props;

        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                {this._renderHeader("Update Match")}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    {this.props.infoMatch.status != "Waitting" ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'column', }}>
                                <Field name="date_of_match"
                                    textIP={TimeService.formatDateFromTimeUnix(this.props.infoMatch.date_of_match, 'DD/MM/YYYY')} label={'Date'} component={renderDatePicker}
                                    defDate={new Date(TimeService.formatDateFromTimeUnix(this.props.infoMatch.date_of_match, 'DD/MM/YYYY'))}
                                // validate={[required, required_trim, have_point_end]}
                                />
                                <Field name="team" mode="dropdown" textIP="Select Team"
                                    data={this.props.listTeam} label={'Team'} component={renderSelect}
                                />
                                <Field name="time_id" mode="dropdown" textIP="Select Time"
                                    data={this.props.listTime} label={'Time'} component={renderSelect}
                                />
                                <Field name="area_id" mode="dropdown" textIP="Select Area"
                                    data={this.props.listArea} label={'Area'} component={renderSelect}
                                    enabled={!this.state.isSelectGridirons}
                                />
                                <Field name="level_id" mode="dropdown" textIP="Select Level"
                                    data={this.props.listLevel} label={'Level'} component={renderSelect} />
                                <Field name="career_id" mode="dropdown" textIP="Select Career"
                                    data={this.props.listCareer} label={'Career'} component={renderSelect} />
                                <Field name="gridiron" mode="dropdown" textIP="Select gridiron"
                                    data={this.props.listGridiron} label={'Gridiron'} component={renderSelect}
                                    onChange={(value) => this.checkArea(value)}
                                />
                                <Field name="invitation" keyboardType="default" textIP="Invitation Summary" label={'Invitation Summary'} component={renderFieldTextarea}
                                    validate={[required_trim, have_point_end]}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 40, }}>
                                <TouchableOpacity onPress={handleSubmit(submit)} style={{
                                    backgroundColor: '#00a0e9',
                                    margin: 10,
                                    borderRadius: 3, alignItems: 'center',
                                }}>
                                    <Text style={{
                                        color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                        textAlign: 'center', paddingHorizontal: 10, paddingVertical: 10, color: '#fafcfc',
                                    }}>Update</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        let body = {
                                            date_of_match: TimeService.formatDateFromTimeUnix(this.props.infoMatch.date_of_match, 'YYYY-MM-DD'),
                                            status: "Cancel",
                                            id: this.props.infoMatch.id
                                        }
                                        this.props.onUpdateMatch(body)
                                    }}
                                    style={{
                                        backgroundColor: '#00a0e9',
                                        margin: 10,
                                        borderRadius: 3, alignItems: 'center',
                                    }}>
                                    <Text style={{
                                        color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                        textAlign: 'center', paddingHorizontal: 10, paddingVertical: 10, color: '#fafcfc',
                                    }}>Cancle</Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        (
                            <View
                                style={{ flex: 1, margin: 10, marginRight: 20 }}
                            >
                                <View style={{
                                    margin: 10,
                                    flexDirection: 'row',
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
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.props.infoMatch.team.name}</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: 14, fontWeight: 'bold', backgroundColor: "red", padding: 5, marginBottom: 5, color: '#fff'
                                    }}>{this.props.infoMatch.status}</Text>
                                </View>
                                <View style={{
                                    marginHorizontal: 10,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: "center"
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Leader: </Text>
                                        <Text style={{ color: 'black', flex: 1 }}>{this.props.infoMatch.user.fullname}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: "center"
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Time: </Text>
                                        <Text style={{ color: 'black', flex: 1 }}>{this.props.infoMatch.time.time_start}h:{this.props.infoMatch.time.time_end}h {TimeService.formatDateFromTimeUnix(this.props.infoMatch.date_of_match, 'DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: "center"
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Career: </Text>
                                        <Text style={{ color: 'black' }}> {this.props.infoMatch.career.name}</Text>
                                    </View>
                                    {this.props.infoMatch.gridiron ?
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: "center"
                                        }}>
                                            <Text style={{ fontWeight: 'bold', color: 'black' }}>Gridiron: </Text>
                                            <Text style={{ color: 'black', flex: 1 }}> {this.props.infoMatch.gridiron.name}</Text>
                                        </View>
                                        : null
                                    }
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: "flex-start"
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Address: </Text>
                                        <Text style={{ color: 'black', flex: 1 }}> {this.props.infoMatch.gridiron ? this.props.infoMatch.gridiron.address : this.props.infoMatch.area.name}</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        justifyContent: 'center', alignItems: 'center', marginTop: 10
                                    }}>
                                    <Image style={{ width: 50, height: 50 }} resizeMode="contain" source={require("../../../../assets/images/icon-match.png")} />
                                </View>
                                <View style={{
                                    margin: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between', alignItems: 'center',
                                }}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    >
                                        <Icon style={{ fontSize: 16 }} name={'user-friends'} type={'FontAwesome5'} />
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Guest Team: </Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.props.infoMatch.team_guest.name}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    marginHorizontal: 10,
                                    justifyContent: 'flex-end',
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: "center"
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Leader: </Text>
                                        <Text style={{ color: 'black' }}>{this.props.infoMatch.team_guest.team_users[0].user.fullname}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: "center"
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Career: </Text>
                                        <Text style={{ color: 'black' }}> {this.props.infoMatch.team_guest.career.name}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: "center"
                                    }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>Level: </Text>
                                        <Text style={{ color: 'black' }}> {this.props.infoMatch.team_guest.level.name}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: "center", alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => {
                                        let body = {
                                            date_of_match: TimeService.formatDateFromTimeUnix(this.props.infoMatch.date_of_match, 'YYYY-MM-DD'),
                                            status: "Pair success",
                                            id: this.props.infoMatch.id
                                        }
                                        this.props.onUpdateMatch(body)
                                    }} style={{
                                        backgroundColor: '#00a0e9',
                                        margin: 10,
                                        borderRadius: 3, alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                            textAlign: 'center', paddingHorizontal: 10, paddingVertical: 10, color: '#fafcfc',
                                        }}>Confirm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            let body = {
                                                date_of_match: TimeService.formatDateFromTimeUnix(this.props.infoMatch.date_of_match, 'YYYY-MM-DD'),
                                                status: "New",
                                                team_guest: "",
                                                id: this.props.infoMatch.id
                                            }
                                            this.props.onUpdateMatch(body)
                                        }}
                                        style={{
                                            backgroundColor: '#00a0e9',
                                            margin: 10,
                                            borderRadius: 3, alignItems: 'center',
                                        }}>
                                        <Text style={{
                                            color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                            textAlign: 'center', paddingHorizontal: 10, paddingVertical: 10, color: '#fafcfc',
                                        }}>Reject</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                </Content >
            </Container >
        );
    }
};

const UpdateMatchForm = reduxForm({
    form: 'updateMatch',
})(UpdateMatchComponent);

export default UpdateMatchForm;