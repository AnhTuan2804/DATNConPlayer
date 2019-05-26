import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber, minLength6, confirmPassword } from './../../../theme/variable/Validate';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class ChangepassComponent extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(initialize('ChangePassUser', {}));
    }
    render() {
        submit = values => {
            this.props.onChangePass(values);
        }
        const { handleSubmit } = this.props;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <Field name="oldPass" keyboardType="default" component={renderFieldForPass}
                                validate={[required, required_trim, have_point_end]}
                                label={'Old Password'}
                            />
                            <Field name="password" keyboardType="default" component={renderFieldForPass}
                                validate={[required, required_trim, have_point_end, maxLength40, minLength6]}
                                label={'New Password'}
                            />
                            <Field name="confirmNewPass" keyboardType="default" component={renderFieldForPass}
                                validate={[required, confirmPassword, required_trim, have_point_end, maxLength40, minLength6]}
                                label={'Confirm Password'}
                            />
                        </View>
                        <TouchableOpacity onPress={handleSubmit(submit)} style={{
                            backgroundColor: '#00a0e9',
                            borderRadius: 3, alignItems: 'center', marginBottom: 40,
                        }}>
                            <Text style={{
                                color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10, color: '#fafcfc',
                            }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </Content >
            </Container >
        );
    }
};

const ChangePassForm = reduxForm({
    form: 'ChangePassUser',
})(ChangepassComponent);

export default ChangePassForm;
