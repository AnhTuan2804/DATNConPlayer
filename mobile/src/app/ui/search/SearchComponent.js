import React, { Component } from 'react';
import { View, Text, Image, Dimensions, BackHandler, Alert, TouchableOpacity, Platform } from 'react-native';
import { Container, Content } from 'native-base';
import Constants from '../../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';
import Loading from '../common/modal/Loading';
import Utils from '../../../theme/shared/utils/Utils';
import { SearchBar } from 'react-native-elements';

const { height, width } = Dimensions.get('window');
const rateScreen = height / 680;
class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content contentContainerStyle={{ flexGrow: 1, marginTop: Platform.OS === "ios" ? 19 : 0 }}>
                    <Text>tim kiem</Text>
                    <SearchBar
                        lightTheme
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        icon={{ type: 'font-awesome', name: 'search' }}
                        value={search}
                    />
                    <View style = {{height: 50,justifyContent: "center", alignItems: "center", backgroundColor: "#ccc" }}>
                            <Text >Tim tran bong</Text>
                        </View>
                    <View style = {{height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#dedede" }}>
                            <Text>Khu vuc</Text>
                        </View>
                    <View style = {{ flexDirection: 'row', height: 50}}>
                        <View style = {{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#c1c1c1" }}>
                            <Text>Trinh do</Text>
                        </View>
                        <View style = {{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#cdcdcd" }}>
                            <Text>So nguoi choi</Text>
                        </View>
                    </View>
                </Content >
            </Container >
        );
    }
};

export default SearchComponent;
