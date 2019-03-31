import { ActivityIndicator, View } from 'react-native'
import React, { Component } from 'react';

function Loading(isVisible) {
    console.log(isVisible);
    
    if (isVisible) {
        return (
            <View style={{
                left: 0, right: 0, bottom: 0, top: 0,
                position: 'absolute', zIndex: 1,
                justifyContent: 'center', alignItems: 'center',
            }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', backgroundColor: 'gray', opacity: 0.3 }}></View>
                <ActivityIndicator style={{ left: 0, right: 0, bottom: 0, top: 0, zIndex: 10, position: 'absolute' }} size="large" color="#00ff00" />
            </View>
        )
    } else {
        null
    }
}
export default Loading;