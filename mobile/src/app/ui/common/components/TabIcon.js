import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';

//Create a dedicated class that will manage the tabBar icon
export const TabIcon = ({ title, focused }) => {
    let image;
    let label;
    let labelColor;
    let imageColor;
    switch (title) {
        case 'TOP':
            image = require('../../../../assets/images/ball.png');
            label = 'TOP';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'Match':
            image = require('../../../../assets/images/ball.png');
            label = 'Match';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'Gridiron':
            image = require('../../../../assets/images/ball.png');
            label = 'Gridiron';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'League':
            image = require('../../../../assets/images/ball.png');
            label = 'League';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'Manage':
            image = require('../../../../assets/images/manage.png');
            label = 'Manage';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'createTeam':
            image = require('../../../../assets/images/manage.png');
            label = 'Manage';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'createMatch':
            image = require('../../../../assets/images/manage.png');
            label = 'Manage';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'updateMatch':
            image = require('../../../../assets/images/manage.png');
            label = 'Manage';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'updateTeam':
            image = require('../../../../assets/images/manage.png');
            label = 'Manage';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'createGridiron':
            image = require('../../../../assets/images/manage.png');
            label = 'Manage';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'detailGridiron':
            image = require('../../../../assets/images/manage.png');
            label = 'Manage';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'Tournament':
            image = require('../../../../assets/images/league.png');
            label = 'Leauge';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        case 'Setting':
            image = require('../../../../assets/images/settings.png');
            label = 'Setting';
            labelColor = focused ? `#4aa047` : `#000000`;
            imageColor = focused ? `#4aa047` : `#000000`;
            break;
        default:
            break;
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Image
                source={image}
                style={{ width: 40, height: 30, alignSelf: 'center', tintColor: imageColor, marginTop: 5 }} resizeMode='contain'
            />
            <Text style={{ textAlign: 'center', fontSize: 10, color: labelColor, marginTop: 3 }}>{label}</Text>
        </View>
    );
}  