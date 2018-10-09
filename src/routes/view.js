import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    Dimensions,
    TouchableHighlight,
    TextInput
} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base'
var { height, width } = Dimensions.get('window');

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import AllCurrencies from './Currency'
import SelectedCurrency from '../screens/CurrencyList'

class view extends Component {
    render() {
        return (
            <Container>
                <Header style={{ paddingRight: 15, paddingLeft: 15, backgroundColor: '#171b21' }}>
                    <Content>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon ios='ios-menu' android="md-menu" style={{ fontSize: 50, color: '#ffffff' }}
                                onPress={() => this.props.navigation.openDrawer()} />
                            <Body>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                                        <Title>Currency Converter</Title>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginLeft: 90, marginTop: 5 }}>
                                            <Image source={require('./Images/arrows.png')}
                                                style={{ height: 20, width: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Body>
                        </View>
                    </Content>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('./Images/united.png')}
                                onPress={null}
                                style={{ height: 40, width: 40, position: 'absolute', margin: 20 }} />
                            <View style={{ flex: 4 }}>
                                <TouchableOpacity style={{ marginLeft: 80, marginTop: 30 }}>
                                    <Text style={{ color: '#ffffff', fontSize: 15 }}>United States Dollar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginTop: 28 }}>
                                <Text style={{ color: '#ffffff', fontSize: 16 }}>USD</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    style={{ backgroundColor: '#1B2129', marginLeft: -20, color: '#ffffff', fontSize: 22 }}>$
                                    </TextInput>
                            </View>

                        </View>
                        <View style={styles.subcontainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('./Images/star.png')}
                                    onPress={null}
                                    style={{ height: 21, width: 22, position: 'absolute', marginLeft: 10, marginTop: 19 }} />
                                <Image source={require('./Images/japan.png')}
                                    onPress={null}
                                    style={{ height: 40, width: 40, position: 'absolute', marginLeft: 60, marginTop: 10 }} />
                                <TouchableOpacity style={{ flexDirection: 'column', marginLeft: 110, marginTop: 12 }}>
                                    <Text style={{ color: '#ffffff', fontSize: 16 }}>JPY</Text>
                                    <Text style={{ color: '#ffffff', fontSize: 14 }}>Japanese Yen</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'column', marginTop: 12, marginLeft: 90 }}>
                                    <Text style={{ fontSize: 18, color: '#D3BC3F' }}>865,490</Text>
                                    <View>
                                        <Image source={require('./Images/upArrow.png')}
                                            style={{ height: 15, width: 12, position: 'absolute', margin: 0 }} />
                                        <Text style={{ color: '#75C34F', fontSize: 14, marginLeft: 15 }}>0.0189</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.hairline}></View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('./Images/star.png')}
                                    onPress={null}
                                    style={{ height: 21, width: 22, position: 'absolute', marginLeft: 10, marginTop: 19 }} />
                                <Image source={require('./Images/uk.png')}
                                    onPress={null}
                                    style={{ height: 40, width: 40, position: 'absolute', marginLeft: 60, marginTop: 10 }} />
                                <TouchableOpacity style={{ flexDirection: 'column', marginLeft: 110, marginTop: 12 }}>
                                    <Text style={{ color: '#ffffff', fontSize: 16 }}>GBP</Text>
                                    <Text style={{ color: '#ffffff', fontSize: 14 }}>British Pounding Sterling</Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'column', marginTop: 12, marginLeft: 25 }}>
                                    <Text style={{ fontSize: 18, color: '#D3BC3F' }}>865,490</Text>
                                    <View>
                                        <Image source={require('./Images/upArrow.png')}
                                            style={{ height: 15, width: 12, position: 'absolute', margin: 0 }} />
                                        <Text style={{ color: '#75C34F', fontSize: 14, marginLeft: 15 }}>0.0189</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.hairline1}></View>
                            <View style={styles.hairline2}>
                                <TouchableOpacity style={{ flex: 1, width: '50%', backgroundColor: '#1C2B41', borderWidth: 2, borderColor: '#1A273C', }}>
                                    <Text style={styles.text}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, width: '50%', backgroundColor: '#1C2B41', borderWidth: 2, borderColor: '#1A273C', }}>
                                    <Text style={styles.text1}>Graph</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity >
                                    <Text style={styles.bellowText}>Add More Currencies</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1B2129',
        width: width,
        height: height,
        margin: 0,
        padding: 0
    },
    subcontainer: {
        flex: 1,
        backgroundColor: '#22324C',
        marginTop: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginLeft: 0
    },
    hairline: {
        backgroundColor: '#1A273C',
        height: 2,
        width: '100%',
        marginTop: 20

    },
    hairline1: {
        backgroundColor: '#1B2A41',
        height: 1,
        width: '100%',
        marginTop: 20,
    },
    hairline2: {
        backgroundColor: '#1B2A41',
        width: '100%',
        flexDirection: 'row'
    },
    text: {
        fontSize: 17,
        padding: 10,
        color: '#838790',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 60
    },
    text1: {
        fontSize: 17,
        padding: 10,
        color: '#838790',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 60
    },
    bellowText: {
        color: '#838790',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10
    }
});

export default view