import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../common/modal/Loading';
import Utils from '../../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber } from './../../../../theme/variable/Validate';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class CreateTeamComponent extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(initialize('createTeam', {}));
    }
    render() {
        submit = values => {
            // this.props.onUpdateInfo(values);
        }
        const { handleSubmit } = this.props;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <Field name="email" keyboardType="default" textIP="Email" label={'Tên đội'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="fullName" keyboardType="default" textIP="Tên" label={'Khu vực'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="phone" keyboardType="default" textIP="Số điện thoại" label={'Trình độ'} component={renderField}
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