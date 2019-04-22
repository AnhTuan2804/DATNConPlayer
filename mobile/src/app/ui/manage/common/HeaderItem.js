import { ActivityIndicator, View, Text } from 'react-native'
import React, { Component } from 'react';

export default HeaderItem = (title) => {
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
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
            </View>
        </View>
    )
}