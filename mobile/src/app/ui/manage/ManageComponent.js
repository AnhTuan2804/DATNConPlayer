import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';


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
                    <Text>Quan ly</Text>
                    <View style={{ flex: 1, marginHorizontal: 10, backgroundColor: "#ccc", justifyContent: "flex-start", }}>
                       <Text>Doi bong cua ban</Text>
                        <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: 'row' }} >
                            <View style={{ height: 50, flex: 0.5, backgroundColor: "red" }}>
                                <Text>Them doi bong</Text>
                            </View>
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
