import { View, Modal, TouchableOpacity, Text, Alert } from 'react-native'
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

function ViewNotLogin() {
    return (
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(4, 4, 15, 0.4)" }}>
            <TouchableOpacity
                style={{
                    backgroundColor: '#fff',
                    marginHorizontal: 10,
                    justifyContent: "center",
                    alignItems: 'center',
                    marginBottom: 10,
                    paddingVertical: 10,
                    borderRadius: 10
                }}
                onPress={Actions.loginScreen()}
            >
                <Text style={{
                    color: "#FF2700",
                    fontSize: 16
                }} >Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: '#fff',
                    marginHorizontal: 10,
                    justifyContent: "center",
                    alignItems: 'center',
                    marginBottom: 10,
                    paddingVertical: 10,
                    borderRadius: 10
                }}
                onPress={Actions.TOP()}>
                <Text style={{
                    color: "#007AFF",
                    fontSize: 14
                }}>Home</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ViewNotLogin;