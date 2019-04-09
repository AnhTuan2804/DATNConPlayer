import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform } from 'react-native';
import { Container, Content, Icon, Item } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { FlatList } from 'react-native-gesture-handler';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class ManageComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <View style={{
                            marginHorizontal: 10,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            borderBottomWidth: 1
                        }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                justifyContent: 'center', alignItems: 'flex-start',

                            }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Quản lý đội bóng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flex: 1,
                                margin: 20,
                                paddingVertical: 10,
                                justifyContent: 'center', alignItems: 'center',
                                borderWidth: 1, flexDirection: 'row',
                                borderRadius: 10,
                            }}>
                                <Icon style={{ fontSize: 16, color: '#333' }} name="plus-circle" type="FontAwesome" />
                                <Text>Thêm đội bóng</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={[1, 2, 3]}
                                showsHorizontalScrollIndicator = {false}
                                horizontal={true}
                                keyExtractor={(item, index) => { return `aaaaaaaaaaaaa${item}` }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ flex: 1, width: width * 7 / 10, margin: 10, borderRadius: 5, borderWidth: 1 }}>
                                            <Text>Team {item}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <Text>San Bong cua ban</Text>
                    </View>
                </Content >
            </Container >
        );
    }
};

export default ManageComponent;
