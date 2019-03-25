import React, { Component } from 'react'
import { Text, View, Platform } from 'react-native'
import Constants from '../../../../theme/variable/Constants';
import { Icon } from 'native-base';
export default class RenderCalculator extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <View style={{
                backgroundColor: this.props.background,
                borderRadius: 9,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 2,
                marginVertical: 2,
                flex: 1
            }}>
                {
                    this.props.icon === true ?
                        (
                            <Icon style={{
                                fontSize: 60 / Constants.RATE_SIZE,
                                textAlign: 'center',
                                color: '#46b5fc'
                            }}
                                name='backspace'
                            />
                        )
                        :
                        (
                            < Text style={{
                                fontSize: 60 / Constants.RATE_SIZE,
                                textAlign: 'center',
                                color: this.props.colorText,
                                fontFamily: 'HiraKakuPro-W3',
                                ...Platform.select({ ios: { paddingTop: 15 } })
                            }}>{this.props.text}</Text>
                        )
                }

            </View>
        )
    }
}