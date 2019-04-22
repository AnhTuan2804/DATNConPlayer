import React from 'react';
import { View, Text, Picker } from 'react-native';
import { Input, Textarea } from 'native-base';
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
export const confirm_max_age = (value, values) => (value, values) && value >= values.age_min ? undefined : Constants.PASS_CONF_NOTMATCH;
export const confirm_min_age = (value, values) => (value, values) && value <= values.age_max ? undefined : Constants.PASS_CONF_NOTMATCH;
export const confirmPassword = (value, values) => (value, values) && value === values.password ? undefined : Constants.PASS_CONF_NOTMATCH;
export const isValidEmail = value => value && !/^(?!.*?\.\.)\w[a-zA-Z0-9+\.]+@[a-zA-Z0-9]{2,15}\.?[a-zA-Z]{2,10}\.{0,1}[a-zA-Z]{2,3}$/i.test(value) ? Constants.EMAIL_VALID : undefined;
export const isValidEmailOrNumber = value => value && !/^((?!.*?\.\.)\w[a-zA-Z0-9+\.]+@[a-zA-Z0-9]{2,15}\.?[a-zA-Z]{2,10}\.{0,1}[a-zA-Z]{2,3}|[0-9]{1,12})$/i.test(value) ? Constants.EMAIL_NUMBER_VALID : undefined;
export const isAuthenticationNumber = value => value && !/^[0-9]{6,6}$/i.test(value) ? "6桁の数字のシーケンスでなければなりません" : undefined;
export const inputAmount = value => value && !/^\d*((\.|\,)\d{1,8})?$/i.test(value) ? "それは数字のシーケンスでなければならない" : undefined;


//Field for Redux-form 

export const renderSelect = ({ input, label, data, children, textIP, ...custom }) => (
    <View style={{ flexDirection: 'column', height: 80 }}>
        <View style={{ flexDirection: 'column', height: 60 }}>
            <Text style={{ fontSize: 35 / Constants.RATE_SIZE, color: '#288e86', marginLeft: 25, }}>{label}</Text>
            <View style={{
                fontSize: 26.04 / Constants.RATE_SIZE,
                borderWidth: 0.6,
                backgroundColor: '#a4e5ff',
                marginLeft: 25,
                marginRight: 25,
                borderRadius: 6,
                borderColor: '#a4e5ff'
            }}>
                <Picker
                    style={{ height: 40 }}
                    {...input}
                    selectedValue={input.value}
                    onValueChange={(value, index) => input.onChange(value)} children={children}
                    {...custom}
                >
                    {data.length != 0 ?
                        data.map((item, index) => { return <Picker.Item value={item.id} label={item.name} key={index} /> })
                        : <Picker.Item value={'0'} label={textIP} key={'00000'} />
                    }
                </Picker>
            </View>
        </View>
    </View>
);

export const renderField = ({ label, keyboardType, textIP, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View style={{ flexDirection: 'column', height: 80 }}>
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


export const renderFieldTextarea = ({ label, keyboardType, textIP, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View style={{ flexDirection: 'column', marginBottom: 10 }}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 35 / Constants.RATE_SIZE, color: '#288e86', marginLeft: 25, }}>{label}</Text>
                <Textarea style={{
                    fontSize: 26.04 / Constants.RATE_SIZE,
                    borderWidth: 0.6,
                    backgroundColor: '#a4e5ff',
                    marginLeft: 25,
                    marginRight: 25,
                    padding: 5,
                    borderRadius: 6,
                    borderColor: '#a4e5ff'

                }}
                    rowSpan={5}
                    keyboardType={keyboardType} onChangeText={onChange} {...restInput}
                    placeholderTextColor='#67c5fd'
                    placeholder={textIP}
                >
                </Textarea>
            </View>
            {touched && ((error && <Text style={{ color: 'red', marginLeft: 25, marginTop: 2, fontSize: 21.58 / Constants.RATE_SIZE }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange', marginLeft: 25 }}>{warning}</Text>))}
        </View>);
};