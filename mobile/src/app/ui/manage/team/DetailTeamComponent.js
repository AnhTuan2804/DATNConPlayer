import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, Picker } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Constants from '../../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../common/modal/Loading';
import Utils from '../../../../theme/shared/utils/Utils';
import { Field, initialize, reduxForm } from 'redux-form';
import { required, renderField, maxLength40, renderFieldForPass, required_trim, have_point_end, isValidEmailOrNumber, renderSelect, renderFieldTextarea, confirm_min_age, confirm_max_age, number } from '../../../../theme/variable/Validate';
import { FlatList, TextInput } from 'react-native-gesture-handler';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class DetailTeamComponent extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(initialize(
            'updateTeam',
            {
                name: this.props.itemTeam.name,
                area_id: this.props.itemTeam.area_id,
                level_id: this.props.itemTeam.level_id,
                career_id: this.props.itemTeam.career_id,
                picture: this.props.itemTeam.picture,
                age_min: `${this.props.itemTeam.age_min}`,
                age_max: `${this.props.itemTeam.age_max}`,
                description: this.props.itemTeam.description,
            }
        ));

        this.state = {
            member: ''
        }
    }

    componentDidMount() {
        this.props.onGetDetailTeam(this.props.itemTeam.id)
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

    _renderFormAddMember(id_team) {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <TextInput
                    style={{
                        flex: 1,
                        borderWidth: 0.6,
                        backgroundColor: '#a4e5ff',
                        padding: 5,
                        borderRadius: 6,
                        borderColor: '#a4e5ff'

                    }}
                    keyboardType={"default"}
                    onChangeText={(text) => this.setState({ member: text })}
                    placeholderTextColor='#67c5fd'
                    placeholder={'Email or phone number'}
                />
                <TouchableOpacity
                    disabled={this.state.member == ""}
                    onPress={() => {
                        let body = {
                            member: this.state.member,
                            team_id: id_team
                        }
                        this.props.onAddMember(body);
                        this.setState({ member: "" })
                    }}
                    style={{
                        backgroundColor: '#00a0e9',
                        borderRadius: 3, alignItems: 'center',
                        padding: 5,
                    }}
                >
                    <Icon style={{ color: 'white' }} name="adduser" type="AntDesign" />
                </TouchableOpacity>
            </View>
        )
    }

    _renderFormUpdate() {
        submit = values => {
            let body = values;
            body['id'] = this.props.itemTeam.id;
            this.props.onUpdateTeam(body);
        }
        const { handleSubmit } = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <View style={{ width: '100%', flexDirection: 'column', }}>
                    <Field name="name" keyboardType="default" textIP="Name"
                        input={{ editable: false, value: this.props.itemTeam.name }} label={'Name'} component={renderField}
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
                            <Field name="age_min" keyboardType="default" style={{ width: '100%', flexDirection: 'column' }} textIP="10" label={'Age min'} component={renderField}
                                validate={[required, number, required_trim, have_point_end, confirm_min_age]}
                            />
                        </View>
                        <View style={{ width: '50%', flexDirection: 'column', }}>
                            <Field name="age_max" keyboardType="default" textIP="20" label={'Age max'} component={renderField}
                                validate={[required, number, required_trim, have_point_end, confirm_max_age]}
                            />
                        </View>
                    </View>
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
                    }}>Cập nhật</Text>
                </TouchableOpacity>

                {this._renderHeader("List member")}
                <View style={{ width: '90%', flexDirection: 'column', marginHorizontal: '5%', marginBottom: 20 }}>
                    {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>List member: </Text> */}
                    {
                        this._renderFormAddMember(this.props.itemTeam.id)
                    }
                    {
                        this.props.listMember.length != 0 ?
                            <View >
                                <FlatList
                                    data={this.props.listMember}
                                    extraData={this.props}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => { return `${item.id}` }}
                                    renderItem={({ item, index }) => this._renderItem({ item, index }, this.props.isedit)}
                                />
                            </View> :
                            <Text>Team don't have member</Text>
                    }
                </View>
            </View>
        )
    }

    _renderItem({ item, index }, isedit) {
        return (
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10, alignItems: 'center' }}>
                <Image style={{ width: 32, height: 32, marginRight: 10 }} resizeMode='contain' source={require("../../../../assets/images/soccer-player.png")} />
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text>{item.user.fullname}</Text>
                    {item.is_captain ? <Text>(C)</Text> : null}
                </View>
                {
                    isedit && !item.is_captain ?
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    'Confirm delete member',
                                    `Are you sure delete  ${item.user.fullname} member?`,
                                    [
                                        // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'OK', onPress: () => {
                                                let body = {
                                                    id: item.id,
                                                    team_id: item.team_id
                                                }
                                                this.props.onDelMember(body)
                                            }
                                        },
                                    ],
                                );
                            }}
                        >
                            <Icon style={{ color: 'red' }} name="deleteuser" type="AntDesign" />
                        </TouchableOpacity>
                        : null
                }
            </View>
        )
    }

    _renderViewTeam() {
        return (
            <View style={{ width: '100%', flexDirection: 'column', paddingTop: 10 }}>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', paddingVertical: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Area: </Text>
                    <Text>{this.props.itemTeam.area.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', paddingVertical: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Level: </Text>
                    <Text>{this.props.itemTeam.level.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', paddingVertical: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Career: </Text>
                    <Text>{this.props.itemTeam.career.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Age min: </Text>
                    <Text style={{ paddingRight: 30 }}>{`${this.props.itemTeam.age_min}`}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Age max: </Text>
                    <Text>{`${this.props.itemTeam.age_max}`}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', paddingVertical: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Introduce Summary: </Text>
                    <Text>{this.props.itemTeam.description}</Text>
                </View>

                <View style={{ flexDirection: 'column', marginHorizontal: 10, paddingVertical: 4 }}>
                    {this._renderHeader("List member")}
                    {
                        this.props.listMember.length != 0 ?
                            <View >
                                <FlatList
                                    data={this.props.listMember}
                                    extraData={this.props}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => { return `${item.id}` }}
                                    renderItem={({ item, index }) => this._renderItem({ item, index }, this.props.isedit)}
                                />
                            </View> :
                            <Text>Team don't have member</Text>
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                {Loading(this.props.isLoading)}
                {this._renderHeader(this.props.itemTeam.name)}
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View>
                        {
                            this.props.isedit ?
                                this._renderFormUpdate() :
                                this._renderViewTeam()
                        }
                    </View>
                </Content >
            </Container >
        );
    }
};

const UpdateTeamForm = reduxForm({
    form: 'updateTeam',
})(DetailTeamComponent);

export default UpdateTeamForm;