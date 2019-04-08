import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class ChangepassComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                   <Text>Cai dat</Text>
                </Content >
            </Container >
        );
    }
};

export default ChangepassComponent;
