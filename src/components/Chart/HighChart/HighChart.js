'use strict';
import React, { Component } from 'react'
import { Alert, View, Text, Image, Dimensions, ToastAndroid } from "react-native"
import ChartView from 'react-native-highcharts';
import { ChartTheme } from './ChartTheme'
import { ChartConfigurations } from './ChartConfigurations'
import { ChartOptions } from './ChartOptions'


export default class HighCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            loading: true,
            color: 'black',
            scale:0
        }
    }

    //Downloads and Parses Data ... Returns a Promise
    async call() {
        this.setState({
            loading: true
        })
        let data = [];
        let superRes = [];
        let root = "https://api-webtrader.ifxdb.com/";
        const arg = {
            "method": "getOhlc",
            "params": {
                "symbol": this.props.quote,
                "period": this.props.interval,
                "type": 4
            }
        }
        return fetch(root, { method: "POST", body: `rpc=${JSON.stringify(arg)}` })
            .then(response => response.json())
            .then(json => {
                data = [...json.result.data]
                //alert(data.length);
                for (let i = 0; i < data.length; i++) {
                    let line = [];
                    line.push(data[i].timestamp * 1000);
                    line.push(data[i].open);
                    line.push(data[i].high);
                    line.push(data[i].low);
                    line.push(data[i].close);

                    superRes.push(line);
                }
                this.setState({
                    chartData: [...superRes],
                    loading: false
                })
                ToastAndroid.show("Data Downloaded ! Generating Chart...", ToastAndroid.SHORT);
            }).catch(err => {
                Alert.alert(
                    'Error !',
                    `Downloading Chart Data Failed ! Please Try Again`,
                    [
                        { text: 'Try Again', onPress: () => this.call() },
                        { text: 'Cancel', onPress: () => this.redirectToHome() }
                    ],
                    { cancelable: false }
                )
            })
    }

    redirectToHome(){
        //this.props.navigation.navigate("Home");
    }

    //Downloads data on 1st load
    async componentDidMount() {
        await this.call().catch(err => {
            Alert.alert(
                'Error !',
                `Downloading Chart Data Failed ! Please Try Again`,
                [
                    { text: 'Try Again', onPress: () => this.call() },
                    { text: 'Cancel', onPress: null }
                ],
                { cancelable: true }
            )
        });
    }

    //Downloads data from 2nd load and further (on prop change) ...
    async componentDidUpdate(prevProps) {
        //If quote, interval or refresh pressed the download data only
        if (prevProps.quote !== this.props.quote || prevProps.interval !== this.props.interval || prevProps.refresh !== this.props.refresh) {
            await this.call().catch(err => {
                Alert.alert(
                    'Error !',
                    `Downloading Chart Data Failed ! Please Try Again`,
                    [
                        { text: 'Try Again', onPress: () => this.call() },
                        { text: 'Cancel', onPress: null }
                    ],
                    { cancelable: true }
                )
            });
        }

        //If color changed then download data and change color state
        if (prevProps.color !== this.props.color) {
            this.setState({
                color: this.props.color
            })

            await this.call().catch(err => {
                Alert.alert(
                    'Error !',
                    `Downloading Chart Data Failed ! Please Try Again`,
                    [
                        { text: 'Try Again', onPress: () => this.call() },
                        { text: 'Cancel', onPress: null }
                    ],
                    { cancelable: true }
                )
            });
        }
    }

    scaleSelector(){
        let interval=this.props.interval;
        if(interval==='m1'){
           return 0;
        }
        else if(interval==='m5'){
            return 1;
        }
        else if(interval==='m15' || interval==='m30'){
            return 2;
        }
        else if(interval==='h1'){
            return 3;
        }
        else if(interval==='h4'){
            return 4;
        }
        else if(interval==='d1'){
            return 5;
        }
        else if(interval==='w1'){
            return 6;
        }
        else if(interval==='mn'){
            return 7;
        }
    }

    render() {
        var chartLoadType = true; //True for Dynamic, False for static Chart
        const conf = ChartConfigurations(this.state.chartData, this.props.type, this.props.quote, chartLoadType, this.props.range, this.scaleSelector())
        const options = ChartOptions();
        const theme = ChartTheme(this.props.color);

        let imageWidth = Dimensions.get('window').height / 8;
        return (
            this.state.loading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ height: imageWidth, width: imageWidth }}
                        source={require('../../../routes/Images/load.gif')} />
                    <Text style={{ marginLeft: 10, marginTop: 5, color: 'white' }}>Loading...</Text>
                </View>
                :
                <ChartView
                    style={{ height: '100%', width: '100%', backgroundColor: '#1b2129'}}
                    config={conf}
                    options={options}
                    stock={true}
                    theme={theme}
                />
        );
    }
}