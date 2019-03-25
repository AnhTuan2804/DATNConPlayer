import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Header, Left, Body, Title, Right, Icon } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class HeaderView extends Component {
    constructor(props) {
        super(props);
    }

    backHandler() {
        if (Actions.currentScene == 'DetailBankItemScreen') {
            Actions.ExchangeMoneyYenScreen();
        }
        else if (Actions.currentScene == 'DetailItemScreen') {
            Actions.BitcoinWithdrawScreen();
        }
        else if (Actions.currentScene == 'itemSuccess') {
            Actions.Success();
        }
        else if (Actions.currentScene == 'ItemBTC') {
            Actions.ListBTC();
        }
        else if (Actions.currentScene == 'ItemJPY') {
            Actions.ListJPY();
        }
        else if (Actions.currentScene == 'itemUnSuccess') {
            Actions.UnSuccess();
        }
        else if (Actions.currentScene == 'Success' || Actions.currentScene == 'UnSuccess') {
            Actions.ChoiseHistory();
        }
        else if (Actions.currentScene == 'Payment' || Actions.currentScene == 'ChoiseHistory' || Actions.currentScene == 'Calculation') {
            Actions.TOP();
        }
        else if (Actions.currentScene == 'BitcoinWithdrawScreen' || Actions.currentScene == 'WithdrawSuccessScreen') {
            Actions.Payment();
        }
        else if (Actions.currentScene == 'ExchangeMoneyYenScreen' || Actions.currentScene == 'ExchangeSuccessScreen') {
            Actions.Payment();
        }
        else if (Actions.currentScene == 'ListBTC' || Actions.currentScene == 'ListJPY') {
            Actions.Payment();
        }
        else {
            Actions.pop({ type: ActionConst.REFRESH });
        }
    }

    render() {
        return (
            <Header
                style={{ marginTop: Platform.OS === "ios" ? 19 : 0, backgroundColor: '#263999' }}>
                <Left style={{ flex: 1 }}>
                    {this.props.isBack ?
                        <TouchableOpacity onPress={() => { this.backHandler() }}>
                            <Icon type='Ionicons' name='arrow-round-back' style={styles.back} />
                        </TouchableOpacity>
                        : null
                    }
                </Left>
                <Body style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.logoEnable ?
                        <Image style={styles.logo} resizeMode='contain' source={require('../../../../assets/image/logo_coinspay.png')} />
                        : null
                    }
                </Body>
                <Right style={{ flex: 1 }} />
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        color: 'white',
        height: 30,
        width: 13,
        marginLeft: 10,
        ...Platform.select({
            ios: {
                marginBottom: 15,
            },
        }),
    },
    menu: {
        height: 50,
        width: 50,
    },
    logo: {
        ...Platform.select({
            ios: {
                width: 130,
                height: 50,
                marginBottom: 10,
            },
            android: {
                width: 130,
                height: 50,
            },
        }),
    },
    backdrop: {
        position: 'absolute',
        height: 65
    }
});
