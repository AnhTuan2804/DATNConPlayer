import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber } from './../../../theme/variable/Validate';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class InfoComponent extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(initialize('infoUser', this.props.initialValues));
    }

    render() {
        submit = values => {
            this.props.onUpdateInfo(values);
        }
        const { handleSubmit } = this.props;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <Field name="email" input={{ value: this.props.email, editable: false, }} textIP="Email" label={'Email'} component={renderField} />
                            <Field name="fullname" keyboardType="default" textIP="Tên" label={'Họ tên'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="phone" keyboardType="default" textIP="Số điện thoại" label={'Số điện thoại'} component={renderField}
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
                            }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </Content >
            </Container >
        );
    }
};

const InfoForm = reduxForm({
    form: 'infoUser',
})(InfoComponent);

export default InfoForm;