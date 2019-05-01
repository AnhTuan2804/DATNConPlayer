import React, { Component } from 'react';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber } from './../../../theme/variable/Validate';
import { View, Text, TouchableOpacity, Image, Dimensions, Linking, ImageBackground } from 'react-native';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './../common/modal/Loading'
import Constants from '../../../theme/variable/Constants';


const { height, width } = Dimensions.get('window');

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(initialize('register', {}));
    }

    componentDidUpdate() {
        const error = this.props.error;
        if (error !== undefined) {
            Toast.show({
                text: error,
                buttonText: 'OK',
                type: 'warning',
                duration: 5000,
                position: 'top'
            })
        }
    }

    render() {
        submit = values => {
            // alert(`${values.email},${values.fullName},${values.phone},${values.password}`)
            this.props.onRegister(values);
        }
        const { handleSubmit } = this.props;
        return (
            <Container style={{}}>
                <ImageBackground source={require('../../../assets/images/bagroundBong.jpg')} style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>

                    <Content contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '90%', backgroundColor: 'rgba(135,135,135, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 50 / Constants.RATE_SIZE,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: '#fff',
                                marginTop: 20
                            }}
                            >Register</Text>
                            <View style={{ width: '90%', flexDirection: 'column', }}>
                                <Field name="email" keyboardType="default" textIP="Email" component={renderField}
                                    validate={[required, required_trim, have_point_end]}
                                />
                                <Field name="fullname" keyboardType="default" textIP="Tên" component={renderField}
                                    validate={[required, required_trim, have_point_end]}
                                />
                                <Field name="phone" keyboardType="default" textIP="Số điện thoại" component={renderField}
                                    validate={[required, required_trim, have_point_end]}
                                />
                                <Field name='password' keyboardType='default' textIP="Mật khẩu" component={renderFieldForPass}
                                    validate={[required, maxLength40]}
                                />
                            </View>
                            <TouchableOpacity onPress={handleSubmit(submit)} style={{
                                backgroundColor: '#00a0e9',
                                borderRadius: 3, alignItems: 'center', marginBottom: 40
                            }}>
                                <Text style={{
                                    color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                    textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10, color: '#fafcfc',
                                }}>Đăng ký</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                {/* <Text onPress={() => Linking.openURL(Constants.LINK_TO_REGISTER)} style={{ fontSize: 28 / Constants.RATE_SIZE, color: '#fff', textAlign: 'center', margin: 10 }}>TẠO TÀI KHOẢN MỚI</Text> */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10, marginBottom: 20 }}>
                                    <Text onPress={() => Actions.loginScreen()} style={{ fontSize: 24 / Constants.RATE_SIZE, color: '#fff', textAlign: 'center' }}>Đăng nhập
                                    <Text style={{ fontSize: 36 / Constants.RATE_SIZE, color: '#fff', textAlign: 'center' }}> | </Text>
                                        <Text onPress={() => Actions.forgotPass()} style={{ fontSize: 24 / Constants.RATE_SIZE, color: '#fff', textAlign: 'center' }}>quên mật khẩu</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </Content>
                </ImageBackground>

            </Container>
        );
    }
};

const RegisterForm = reduxForm({
    form: 'register',
})(RegisterComponent);

export default RegisterForm;
