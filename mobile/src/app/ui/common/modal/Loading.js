import React from 'react';
import { ActivityIndicator, View, Image } from 'react-native';
import Modal from 'react-native-modal';
const Loading = () => (
    <Modal backdropOpacity={0.1} isVisible={true} >
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            flexDirection: 'column',
        }}>
            {/* <ActivityIndicator size="large" color="#46b4fb" /> */}
            <Image resizeMode='contain' style={{ width: 50, height: 50 }} source={require('../../../../assets/image/Loading002.gif')} />
        </View>
    </Modal >
);

export default Loading;
