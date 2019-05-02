import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, FlatList } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Constants from '../../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../../common/modal/Loading';
import Utils from '../../../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import {
    required, renderField, maxLength40,
    renderFieldForPass, required_trim, have_point_end,
    isValidEmailOrNumber, renderSelect, renderFieldTextarea,
    confirm_min_age, confirm_max_age, number, checklistName
} from '../../../../../theme/variable/Validate';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class PriceGridironComponent extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(initialize(
            'createPrice', {
                size_gridiron_id: this.props.listSize[0].id,
                time_id: this.props.listTime[0].id,
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

    _renderItem({ item, index }) {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, padding: 10, alignItems: "center", }}>
                <Text style={{ color: "black", paddingRight: 10 }}>{index}.</Text>
                <Text style={{ color: "black", paddingRight: 10 }}>{`${item.time.time_start}h - ${item.time.time_end}h`}</Text>
                <Text style={{ color: "black", }}>{item.size_gridiron.name}</Text>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text style={{ color: "black" }}>{item.price}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            'Confirm delete member',
                            `Are you sure delete  ${item.size_gridiron.name} price?`,
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK', onPress: () => {
                                        let body = {
                                            id: item.id,
                                            gridiron_id: this.props.gridiron_id
                                        }
                                        this.props.onDelPriceOnTime(body)
                                    }
                                },
                            ],
                        );
                    }}
                >
                    <Icon style={{ color: 'red', fontSize: 16 }} name="delete" type="AntDesign" />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        submit = values => {
            let body = values;
            body['gridiron_id'] = this.props.gridiron_id
            console.log(body);

            this.props.onCreatePriceOnTime(body);
        }
        const { handleSubmit } = this.props;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{ flex: 1, paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '100%', flexDirection: 'column', }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ width: '50%', flexDirection: 'column', }}>
                                    <Field name="size_gridiron_id" mode="dropdown" textIP="Select Size"
                                        data={this.props.listSize} label={'Type of Sub Gridiron'} component={renderSelect}
                                    />
                                </View>
                                <View style={{ width: '50%', flexDirection: 'column', }}>
                                    <Field name="time_id" mode="dropdown" textIP="Select Time"
                                        data={this.props.listTime} label={'Time'} component={renderSelect}
                                    />
                                </View>
                            </View>
                            <Field name="price" keyboardType="numeric" textIP="300000" label={'Price'} component={renderField}
                                validate={[required, required_trim, have_point_end, number]}
                            />
                        </View>
                        <TouchableOpacity onPress={handleSubmit(submit)} 
                        style={{
                            backgroundColor: '#00a0e9',
                            borderRadius: 3, alignItems: 'center',
                            marginTop: 10
                        }}>
                            <Text style={{
                                color: 'white', fontSize: 42.63 / Constants.RATE_SIZE,
                                textAlign: 'center', paddingHorizontal: 30, paddingVertical: 10, color: '#fafcfc',
                            }}>Create</Text>
                        </TouchableOpacity>
                        {this._renderHeader("List price on time sub gridiron")}
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            {this.props.price_on_times.length != 0 ?
                                <FlatList
                                    data={this.props.price_on_times}
                                    extraData={this.props}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => { return `${item.id}` }}
                                    renderItem={({ item, index }) => this._renderItem({ item, index })}
                                />
                                : <Text>Gridiron don't have any sub gridiron</Text>
                            }
                        </View>
                    </View>
                </Content >
            </Container >
        );
    }
};

const CreatePriceForm = reduxForm({
    form: 'createPrice',
})(PriceGridironComponent);

export default CreatePriceForm;