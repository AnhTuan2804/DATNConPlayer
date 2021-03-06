import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, Picker } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../../common/modal/Loading';
import Utils from '../../../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import {
    required,
    renderField,
    maxLength40,
    renderFieldForPass,
    required_trim, have_point_end,
    isValidEmailOrNumber, renderSelect,
    renderFieldTextarea, confirm_min_age, confirm_max_age, number
} from '../../../../../theme/variable/Validate';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class UpdateGridironComponent extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(initialize(
            'updateGridiron',
            {
                "name": this.props.itemGridiron.name,
                "area_id": this.props.itemGridiron.area_id,
                "link_face": this.props.itemGridiron.link_face,
                "picture": this.props.itemGridiron.picture,
                "phone": this.props.itemGridiron.phone,
                "address": this.props.itemGridiron.address,
                "description": this.props.itemGridiron.description,
                "id": this.props.itemGridiron.id
            }
        ));
    }

    componentDidMount() {
        this.props.onGetDetailGridiron(this.props.itemGridiron.id)
    }


    render() {
        submit = values => {
            this.props.onUpdateGridiron(values);
        }
        const { handleSubmit } = this.props;

        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <Field name="name" keyboardType="default" textIP="Gridiron name" label={'Name'} component={renderField}
                                input={{ editable: false, value: this.props.itemGridiron.name }}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="area_id" mode="dropdown" textIP="Select Area"
                                data={this.props.listArea} label={'Area'} component={renderSelect} />
                            <Field name="link_face" keyboardType="default" textIP="Facebook link" label={'Facebook link'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="picture" keyboardType="default" textIP="Tên" label={'Picture'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="phone" keyboardType="default"
                                style={{ width: '100%', flexDirection: 'column' }} textIP="0967856756"
                                label={'Phone number'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="address" keyboardType="default" textIP="199 Ho Tung Mau, Hoa Minh, Lien Chieu, Da Nang"
                                label={'Address'} component={renderField}
                                validate={[required, required_trim, have_point_end]}
                            />
                            <Field name="description" keyboardType="default" textIP="Introduce Summary" label={'Introduce Summary'} component={renderFieldTextarea}
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

const UpdateGridironForm = reduxForm({
    form: 'updateGridiron',
})(UpdateGridironComponent);

export default UpdateGridironForm;