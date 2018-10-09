import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, ToastAndroid, Dimensions, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

//Backend Logics Coded By Manal @16 September, 2018

class WalletMarket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,BCH,MKR,ETH,LTC,GLD&tsyms=USD",
            apiData: null
        }
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true
        });
        this.call().then(() => {
            this.setState({
                refreshing: false
            })
        });
    }

    call() {
        this.setState({
            refreshing: true
        });
        return fetch(this.state.url)
            .then(res => res.json())
            .then(data => {
                ToastAndroid.show("Latest Values Downloaded!", ToastAndroid.SHORT)
                this.setState({
                    apiData: data
                })
            })
            .catch(error => {
                Alert.alert(
                    'Error !',
                    `Downloading Latest Values Failed`,
                    [
                        { text: 'Try Again', onPress: () => this.call() }
                    ],
                    { cancelable: false }
                )
            })
    }

    async componentDidMount() {
        await this.call().then(() => {
            this.setState({
                refreshing: false
            })
        })
        .catch(error => {
            Alert.alert(
                'Error !',
                `Downloading Latest Values Failed`,
                [
                    { text: 'Try Again', onPress: () => this.call() }
                ],
                { cancelable: false }
            )
        });
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image source={require('./Images/walletmarket.png')} style={{ height: 22, width: 18 }} ></Image>
        )
    }

    render() {
        let imageWidth = Dimensions.get('window').height / 8;
        return (
            this.state.refreshing || this.state.apiData==null ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1b2129' }}>
                    <Image
                        style={{ height: imageWidth, width: imageWidth }}
                        source={require('../routes/Images/load.gif')} />
                    <Text style={{ marginLeft: 10, marginTop: 5, color: 'white' }}>Loading...</Text>
                </View>
                :
                <View style={styles.container} >
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }>
                        <View>
                            <View style={styles.redbox} >
                                <Image
                                    source={require('./Images/building.png')}
                                    style={{ width: '100%', height: 155 }}
                                ></Image>

                            </View>
                            <View style={styles.bluebox} >
                                <Text style={styles.blueBoxText}>Market Rates </Text>
                                <Text style={styles.blueBoxText}>USD</Text>
                            </View>

                            <View style={styles.wallets}>

                                <View style={styles.walletContainer}>
                                    <View style={styles.wallet}>
                                        <Text style={styles.WaletTextLeft}>Bitcoin</Text>
                                        <Text style={styles.WaletTextRight}>${this.state.apiData.BTC.USD}</Text >
                                    </View>
                                    <View style={styles.WaletNextTextLeft}>
                                        <Image source={require('./Images/fullstop.png')} style={{ width: 15, height: 15 }} /><Text style={styles.WaletNextTextLeftText}>BTC</Text>
                                    </View>
                                </View>

                                <View style={styles.walletContainer}>
                                    <View style={styles.wallet}>
                                        <Text style={styles.WaletTextLeft}>Bitcoin Cash</Text>
                                        <Text style={styles.WaletTextRight}>${this.state.apiData.BCH.USD}</Text >
                                    </View>
                                    <View style={styles.WaletNextTextLeft}>
                                        <Image source={require('./Images/fullstop.png')} style={{ width: 15, height: 15 }} /><Text style={styles.WaletNextTextLeftText}>BCH</Text>
                                    </View>
                                </View>

                                <View style={styles.walletContainer}>
                                    <View style={styles.wallet}>
                                        <Text style={styles.WaletTextLeft}>Marker</Text>
                                        <Text style={styles.WaletTextRight}>${this.state.apiData.MKR.USD}</Text >

                                    </View>
                                    <View style={styles.WaletNextTextLeft}>
                                        <Image source={require('./Images/fullstop.png')} style={{ width: 15, height: 15 }} /><Text style={styles.WaletNextTextLeftText}>MKR</Text>
                                    </View>
                                </View>

                                <View style={styles.walletContainer}>
                                    <View style={styles.wallet}>
                                        <Text style={styles.WaletTextLeft}>Ethereum</Text>
                                        <Text style={styles.WaletTextRight}>${this.state.apiData.ETH.USD}</Text >
                                    </View>
                                    <View style={styles.WaletNextTextLeft}>
                                        <Image source={require('./Images/fullstop.png')} style={{ width: 15, height: 15 }} /><Text style={styles.WaletNextTextLeftText}>ETH</Text>
                                    </View>
                                </View>

                                <View style={styles.walletContainer}>
                                    <View style={styles.wallet}>
                                        <Text style={styles.WaletTextLeft}>LiteCoin</Text>
                                        <Text style={styles.WaletTextRight}>${this.state.apiData.LTC.USD}</Text >
                                    </View>
                                    <View style={styles.WaletNextTextLeft}>
                                        <Image source={require('./Images/fullstop.png')} style={{ width: 15, height: 15 }} /><Text style={styles.WaletNextTextLeftText}>LTC</Text>
                                    </View>
                                </View>

                                <View style={styles.walletContainer}>
                                    <View style={styles.wallet}>
                                        <Text style={styles.WaletTextLeft}>GoldCoin</Text>
                                        <Text style={styles.WaletTextRight}>${this.state.apiData.GLD.USD}</Text >
                                    </View>
                                    <View style={styles.WaletNextTextLeft}>
                                        <Image source={require('./Images/fullstop.png')} style={{ width: 15, height: 15 }} /><Text style={styles.WaletNextTextLeftText}>GLD</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
        )
    }
}

export default WalletMarket;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor: '#1f2630'
        backgroundColor: '#1d2c42'

    },
    redbox: {
        width: '100%',
        height: 140
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    redBoxInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headBigFont: {
        color: '#ac9b3c',
        fontSize: 22,
        alignSelf: 'center'
    },
    headSmallFont: {
        color: 'white',
        fontSize: 11,
        alignSelf: 'center'
    },
    bluebox: {
        backgroundColor: '#21324c',
        borderWidth: 1,
        borderColor: '#21324c',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    blueBoxText: {
        padding: 15,
        color: 'white'
    },
    blueBoxTextRight: {
        padding: 15,
        color: 'white',
        alignSelf: 'flex-end'
    },

    walletContainer: {
        backgroundColor: '#1d2c42',
        borderBottomWidth: 0.4,
        borderColor: '#1f2630',
        padding: 5,
        marginEnd: 0.5,
        justifyContent: 'space-between'
    },
    wallet: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    WaletTextLeft: {
        paddingStart: 10,
        paddingTop: 10,
        marginStart: 10,
        color: 'white'
    },
    WaletTextRight: {
        paddingTop: 10,
        paddingEnd: 10,
        color: '#ac9b3c'
    },
    WaletNextTextLeft: {
        alignSelf: 'flex-start',
        marginStart: 15,
        flexDirection: 'row',
        marginEnd: 15
    },
    WaletNextTextLeftText: {
        fontSize: 9,
        alignSelf: 'flex-start',
        color: 'white'
    },
})