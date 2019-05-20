import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, Picker } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../common/modal/Loading';
import Utils from '../../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber, renderSelect, renderFieldTextarea, confirm_min_age, confirm_max_age, number } from './../../../../theme/variable/Validate';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class CreateTeamComponent extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(initialize(
            'createTeam',
            {
                area_id: this.props.listArea[0].id,
                level_id: this.props.listLevel[0].id,
                career_id: this.props.listCareer[0].id,
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
            this.props.onCreateTeam(values);
        }
        const { handleSubmit } = this.props;

        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                {this._renderHeader("Create Team")}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <Field name="name" keyboardType="default" textIP="Email" label={'Tên đội'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="area_id" mode="dropdown" textIP="Select Area" data={this.props.listArea} label={'Area'} component={renderSelect} />
                            <Field name="level_id" mode="dropdown" textIP="Select Level" data={this.props.listLevel} label={'Level'} component={renderSelect} />
                            <Field name="career_id" mode="dropdown" textIP="Select Career" data={this.props.listCareer} label={'Career'} component={renderSelect} />
                            <Field name="picture" keyboardType="default" textIP="Tên" label={'Picture'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ width: '50%', flexDirection: 'column', }}>
                                    <Field name="age_min" keyboardType="default" style={{ width: '100%', flexDirection: 'column' }} textIP="10" label={'Tuổi nhỏ nhất'} component={renderField}
                                        validate={[required, number, required_trim, have_point_end, confirm_min_age]}
                                    />
                                </View>
                                <View style={{ width: '50%', flexDirection: 'column', }}>
                                    <Field name="age_max" keyboardType="default" textIP="20" label={'Tuổi lớn nhất'} component={renderField}
                                        validate={[required, number, required_trim, have_point_end, confirm_max_age]}
                                    />
                                </View>
                            </View>
                            <Field name="description" keyboardType="default" textIP="Giới thiệu" label={'Giới thiệu'} component={renderFieldTextarea}
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

const CreateTeamForm = reduxForm({
    form: 'createTeam',
})(CreateTeamComponent);

export default CreateTeamForm;