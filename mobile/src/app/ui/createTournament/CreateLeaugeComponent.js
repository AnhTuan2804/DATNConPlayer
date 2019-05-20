import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, Picker } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber, renderSelect, renderFieldTextarea, confirm_min_age, confirm_max_age, number, renderDatePicker } from '../../../theme/variable/Validate';
import TimeService from '../../../theme/shared/utils/TimeService';
import _ from 'lodash';

const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class CreateLeaugeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelectGridiron: false
        }
        this.props.dispatch(initialize(
            'createLeauge',
            {
                name_of_league: "Đá vui thôi",
                date_expiry_register: new Date(),
                number_of_teams: `10`,
                area_id: this.props.listArea[0].id,
                career_id: undefined,
                type_league_id: Constants.TYPE_LEAUGE[0].id,
                description: "",
                status: "New",
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
                name_of_league: values.name_of_league,
                number_of_teams: Number(values.number_of_teams),
                type_league: _.find(Constants.TYPE_LEAUGE, function (o) { return o.id == values.type_league_id }),
                area: _.find(this.props.listArea, function (o) { return o.id == values.area_id }),
                career: _.find(this.props.listCareer, function (o) { return o.id == values.career_id }),
                date_expiry_register: TimeService.getTimeFormatFromTime(values.date_expiry_register, `YYYY-MM-DD`),
                description: values.description,
                status: "New"
            }
            this.props.onCreateLeauge(body)
        }
        const { handleSubmit } = this.props;

        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                {this._renderHeader("Create Leauge")}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <Field name="name_of_league" keyboardType="default" textIP="" label={'Name of leauge'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                              <Field name="number_of_teams" keyboardType="numeric" textIP="" label={'Number of teams'} component={renderField}
                                validate={[required, required_trim, have_point_end, number]}
                            />
                            <Field name="date_expiry_register" textIP="Select date" label={'Registry expiry date'} component={renderDatePicker}
                                validate={[required]}
                            />
                            <Field name="type_league_id" mode="dropdown" textIP="Select type"
                                data={Constants.TYPE_LEAUGE} label={'Type of competition'} component={renderSelect}
                            />
                            <Field name="area_id" mode="dropdown" textIP="Select Area"
                                data={this.props.listArea} label={'Area'} component={renderSelect}
                            />
                            <Field name="career_id" mode="dropdown" textIP="Select Career"
                                data={this.props.listCareer} label={'Career'} component={renderSelect} />
                            <Field name="description" keyboardType="default" textIP="Summary about league" label={'Summary about league'} component={renderFieldTextarea}
                                validate={[required_trim, have_point_end]}
                            />
                        </View>
                        <TouchableOpacity onPress={handleSubmit(submit)} style={{
                            backgroundColor: '#00a0e9',
                            borderRadius: 3, alignItems: 'center', marginBottom: 40,
                        }}>
                            <Text style={{
                                color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10, color: '#fafcfc',
                            }}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </Content >
            </Container >
        );
    }
};

const CreateLeaugeForm = reduxForm({
    form: 'createLeauge',
})(CreateLeaugeComponent);

export default CreateLeaugeForm;