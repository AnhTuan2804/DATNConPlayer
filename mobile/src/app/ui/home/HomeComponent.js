import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform, FlatList } from 'react-native';
import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../../ui/common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { SearchBar } from 'react-native-elements';


const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }


    render() {
        const { search } = this.state;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    {/* header Search */}
                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: '#999' }}>
                        <View style={{
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            flex: 1,
                            marginHorizontal: 10,
                            paddingHorizontal: 5,
                            paddingVertical: 0,
                            alignItems: 'center',
                            borderRadius: 5
                        }}>
                            <Icon name="search" type="FontAwesome" />
                            <Input placeholder="Search..." />
                            {/* <Icon name="ios-people" /> */}
                        </View>
                        <Icon style={{ marginRight: 10, color: "#ffffff" }} name="notifications" type="MaterialIcons" />
                    </View>
                    {/* header Search */}

                    {/* list tran dau */}
                    <View style={{ height: height / 3 }}>
                        <Text onPress={() => Actions.Search()}>Cac tran dau</Text>
                        {/* header tran dau */}
                        
                        {/* header tran dau */}
                        <View style={{  flex: 1}}>
                            <FlatList
                                style={{
                                    flex: 1,
                                    backgroundColor: 'black',
                                    opacity: 0.5,
                                }}
                                horizontal={true}
                                data={[1, 2, 3, 4]}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style= {{
                                            flex: 1, 
                                            width: width*7/10,
                                            borderRadius: 5, 
                                            backgroundColor: 'green',
                                            marginHorizontal: 10,
                                        }}>
                                            <Text style={{ color: 'white' }}>aaaa</Text>
                                        </View>
                                    );
                                }}
                                keyExtractor={(item, index) => index}
                            >
                            </FlatList>
                        </View>
                    </View>
                    {/* list tran dau */}

                    {/* list san bong */}
                    <View style={{ height: height / 2 }}>
                        <Text>Cac san trong</Text>
                        <View style={{ flexDirection: "row", flex: 1, backgroundColor: 'green' }}></View>
                    </View>
                    {/* list san bong */}

                    {/* list giai dau */}
                    <View style={{ height: height / 2 }}>
                        <Text>Cac giai dau</Text>
                        <View style={{ flexDirection: "row", flex: 1, backgroundColor: 'blue' }}></View>
                    </View>
                    {/* list giai dau */}

                </Content >
            </Container >
        );
    }
};

export default HomeComponent;
