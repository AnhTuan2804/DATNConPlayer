import React from 'react';
import { View, Text } from 'react-native';
import { Input } from 'native-base';
import Constants from './Constants';
import _ from 'lodash';

//Validation
export const required = value => value ? undefined : 'Trường bắt buộc';
export const required_trim = value => value && _.startsWith(value, ' ') || _.endsWith(value, ' ') ? Constants.DONT_SPACE : undefined;
export const have_point_end = value => value && _.endsWith(value, '.') ? Constants.DONT_DOT : undefined;
export const maxLength40 = value => value && value.length > 40 ? Constants.PASS_MAXLENGTH : undefined;
export const minLength6 = value => value && value.length < 6 ? Constants.PASS_MINLENGTH : undefined;
export const number = value => value && isNaN(Number(value)) ? '数字である必要があります' : undefined;
export const minValue = min => value => value && value < min ? `最低でも ${min}` : undefined;
export const minValue18 = minValue(18);
export const confirmPassword = (value, values) => (value, values) && value === values.password ? undefined : Constants.PASS_CONF_NOTMATCH;
export const isValidEmail = value => value && !/^(?!.*?\.\.)\w[a-zA-Z0-9+\.]+@[a-zA-Z0-9]{2,15}\.?[a-zA-Z]{2,10}\.{0,1}[a-zA-Z]{2,3}$/i.test(value) ? Constants.EMAIL_VALID : undefined;
export const isValidEmailOrNumber = value => value && !/^((?!.*?\.\.)\w[a-zA-Z0-9+\.]+@[a-zA-Z0-9]{2,15}\.?[a-zA-Z]{2,10}\.{0,1}[a-zA-Z]{2,3}|[0-9]{1,12})$/i.test(value) ? Constants.EMAIL_NUMBER_VALID : undefined;
export const isAuthenticationNumber = value => value && !/^[0-9]{6,6}$/i.test(value) ? "6桁の数字のシーケンスでなければなりません" : undefined;
export const inputAmount = value => value && !/^\d*((\.|\,)\d{1,8})?$/i.test(value) ? "それは数字のシーケンスでなければならない" : undefined;
export const max_withdraw_btc = value => value && value <= Constants.MAX_AMOUNT_WITHDRAW_BTC ? undefined : `最高でも${Constants.MAX_AMOUNT_WITHDRAW_BTC}`;
export const min_withdraw_btc = value => value && value >= Constants.MIN_AMOUNT_WITHDRAW_BTC ? undefined : `最低でも${Constants.MIN_AMOUNT_WITHDRAW_BTC}`;
export const max_withdraw_jpy = value => value && value <= Constants.MAX_AMOUNT_WITHDRAW_JPY ? undefined : `最高でも${Constants.MAX_AMOUNT_WITHDRAW_JPY}`;
export const min_withdraw_jpy = value => value && value >= Constants.MIN_AMOUNT_WITHDRAW_JPY ? undefined : `最低でも${Constants.MIN_AMOUNT_WITHDRAW_JPY}`;


//Field for Redux-form 
export const renderField = ({ label, keyboardType, textIP, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (<View style={{ flexDirection: 'column', height: 80 }}>
        <View style={{ flexDirection: 'column', height: 60 }}>
            <Text style={{ fontSize: 35 / Constants.RATE_SIZE, color: '#288e86', marginLeft: 25, }}>{label}</Text>
            <Input style={{
                fontSize: 26.04 / Constants.RATE_SIZE,
                borderWidth: 0.6,
                backgroundColor: '#a4e5ff',
                height: 20,
                marginLeft: 25,
                marginRight: 25,
                padding: 5,
                borderRadius: 6,
                borderColor: '#a4e5ff'

            }}
                keyboardType={keyboardType} onChangeText={onChange} {...restInput}
                placeholderTextColor='#67c5fd'
                placeholder={textIP}
            >
            </Input>
        </View>
        {touched && ((error && <Text style={{ color: 'red', marginLeft: 25, marginTop: 2, fontSize: 21.58 / Constants.RATE_SIZE }}>{error}</Text>) ||
            (warning && <Text style={{ color: 'orange', marginLeft: 25 }}>{warning}</Text>))}
    </View>);
};

export const renderFieldForPass = ({ label, keyboardType, textIP, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (<View style={{ flexDirection: 'column', height: 80 }}>
        <View style={{ flexDirection: 'column', height: 60 }}>
            <Text style={{ fontSize: 35 / Constants.RATE_SIZE, color: '#288e86', marginLeft: 25, }}>{label}</Text>
            <Input style={{
                fontSize: 26.04 / Constants.RATE_SIZE,
                borderWidth: 0.6,
                backgroundColor: '#a4e5ff',
                height: 20,
                marginLeft: 25,
                marginRight: 25,
                padding: 5,
                borderRadius: 6,
                borderColor: '#a4e5ff'

            }}
                secureTextEntry
                keyboardType={keyboardType} onChangeText={onChange} {...restInput}
                placeholderTextColor='#67c5fd'
                placeholder={textIP}
            >
            </Input>
        </View>
        {touched && ((error && <Text style={{ color: 'red', marginLeft: 25, marginTop: 2, fontSize: 21.58 / Constants.RATE_SIZE }}>{error}</Text>) ||
            (warning && <Text style={{ color: 'orange', marginLeft: 25 }}>{warning}</Text>))}
    </View>);
};

export const renderFieldForAmountRight = ({ keyboardType, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View style={{ flex: 4 }}>
            <Input style={{
                height: 60,
                fontSize: 56 / Constants.RATE_SIZE,
                backgroundColor: '#a3e5ff',
                borderRadius: 6,
                textAlign: 'right'
            }}
                keyboardType={keyboardType} onChangeText={onChange} {...restInput}
            />
            {touched && ((error && <Text style={{ color: 'red', marginLeft: 5, marginTop: 2, fontSize: 21.58 / Constants.RATE_SIZE }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange', marginLeft: 25 }}>{warning}</Text>))}
        </View>);
};

export const renderFieldForAmountLeft = ({ keyboardType, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View style={{ flex: 4 }}>
            <Input style={{
                height: 60,
                fontSize: 56 / Constants.RATE_SIZE,
                backgroundColor: '#a3e5ff',
                borderRadius: 6,
                textAlign: 'left'
            }}
                keyboardType={keyboardType} onChangeText={onChange} {...restInput}
            />
            {touched && ((error && <Text style={{ color: 'red', marginLeft: 5, marginTop: 2, fontSize: 21.58 / Constants.RATE_SIZE }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange', marginLeft: 25 }}>{warning}</Text>))}
        </View>);
};

export const renderFieldAuthentication = ({ keyboardType, textIP, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View>
            <Input style={{
                height: 50,
                backgroundColor: '#ffffff',
                borderColor: '#6e6e6e',
                fontSize: 35 / Constants.RATE_SIZE,
                borderWidth: 1,
                borderRadius: 6,
            }}
                keyboardType={keyboardType} onChangeText={onChange} {...restInput}
                placeholder={textIP}
            />
            {touched && ((error && <Text style={{ color: 'red', marginLeft: 5, marginTop: 2, fontSize: 21.58 / Constants.RATE_SIZE }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange', marginLeft: 25 }}>{warning}</Text>))}
        </View>);
};
