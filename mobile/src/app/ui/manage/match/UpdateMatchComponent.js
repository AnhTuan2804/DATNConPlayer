import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, Picker } from 'react-native';
import { Container, Content } from 'native-base';
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
        this.props.dispatch(initialize(
            'updateMatch',
            {
                // time_id: this.props.infoMatch.time.id,
                // team: this.props.listTeam[0].id,
                // gridiron: this.props.listGridiron[0].id,
                // area_id: this.props.listArea[0].id,
                // level_id: this.props.listLevel[0].id,
                // career_id: this.props.listCareer[0].id,
            }
        ));
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
                date_of_match: TimeService.getTimeFormatFromTime(values.date_of_match, TimeService.YEAR_MONTH_DATE_FORMAT),
                invitation: values.invitation,
                status: "New"
            }
            this.props.onUpdateMatch(body)
        }
        const { handleSubmit } = this.props;

        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                {this._renderHeader("Create Match")}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <Field name="date_of_match" textIP="Select date" label={'Date'} component={renderDatePicker}
                            // validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="team" mode="dropdown" textIP="Select Team"
                                data={this.props.listTeam} label={'Team'} component={renderSelect}
                            />
                            <Field name="time_id" mode="dropdown" textIP="Select Time"
                                data={this.props.listTime} label={'Time'} component={renderSelect}
                            />
                            <Field name="area_id" mode="dropdown" textIP="Select Area"
                                data={this.props.listArea} label={'Area'} component={renderSelect} />
                            <Field name="level_id" mode="dropdown" textIP="Select Level"
                                data={this.props.listLevel} label={'Level'} component={renderSelect} />
                            <Field name="career_id" mode="dropdown" textIP="Select Career"
                                data={this.props.listCareer} label={'Career'} component={renderSelect} />
                            <Field name="gridiron" mode="dropdown" textIP="Select gridiron"
                                data={this.props.listGridiron} label={'Gridiron'} component={renderSelect} />
                            <Field name="invitation" keyboardType="default" textIP="Invitation Summary" label={'Invitation Summary'} component={renderFieldTextarea}
                                validate={[required, required_trim, have_point_end]}
                            />
                        </View>
                        <TouchableOpacity onPress={handleSubmit(submit)} style={{
                            backgroundColor: '#00a0e9',
                            borderRadius: 3, alignItems: 'center', marginBottom: 40,
                        }}>
                            <Text style={{
                                color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10, color: '#fafcfc',
                            }}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                </Content >
            </Container >
        );
    }
};

const UpdateMatchForm = reduxForm({
    form: 'updateMatch',
})(UpdateMatchComponent);

export default UpdateMatchForm;