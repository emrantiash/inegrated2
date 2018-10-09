import React, { Component } from 'react';
import { View, TextInput, ScrollView, Button, Picker, ToastAndroid, AsyncStorage } from 'react-native';
import styles from './style';

class addAlert extends Component {
    constructor(props) {
        super(props);
        this.state = { selectitem: 'Bitcoin', allItems: [], selectDropDown: 'Above', val: '', }
    }

    componentDidMount() {
        this.selectCurrencyAPI();
        this.showData();
    }
    //dropdown currency
    selectCurrencyAPI = () => {
        fetch('https://api.coinmarketcap.com/v2/ticker/?limit=20&sort=id')
            .then(res => res.json())
            .then(res => {
                this.setState({ allItems: res.data })
            })
    }

    showData = () => {
        AsyncStorage.getItem("walletAlarm")
            .then(res => JSON.parse(res))
            .then(respons => { console.log('walletAlarm:', respons) })
    }
    //save local storage
    onButtonPress = () => {
        //check input box
        if (this.state.val === "") {
            alert('Input box is empty');
            return;
        }

        //for current date
        var dateToday = new Date();
        var locale = "en-us";
        var month = dateToday.toLocaleString(locale, { month: "long" });
        date = month + " " + dateToday.getDate() + ", " + dateToday.getFullYear();

        //to save wallet data
        AsyncStorage.getItem("walletAlarm")
            .then(res => JSON.parse(res))
            .then(array => {
                let newObject = {
                    allCoin: this.state.selectitem,
                    dropdownValue: this.state.selectDropDown,
                    enterVal: this.state.val,
                    saveTimeZone: date
                };
                let found = false;
                for (let i = 0; i < array.length; i++) {
                    if (array[i].allCoin === newObject.allCoin &&
                        array[i].dropdownValue === newObject.dropdownValue &&
                        array[i].enterVal === newObject.enterVal) {
                        found = true;
                    }
                }
                !found && array.push(newObject);
                AsyncStorage.setItem("walletAlarm", JSON.stringify(array)).then((res) => {
                    ToastAndroid.show('Alarm is created successfully', ToastAndroid.SHORT)
                });
            }).catch(error => {
                let newArray = [
                    {
                        allCoin: this.state.selectitem,
                        dropdownValue: this.state.selectDropDown,
                        enterVal: this.state.val,
                        saveTimeZone: date
                    }];
                AsyncStorage.setItem("walletAlarm", JSON.stringify(newArray)).then((res) => {
                    ToastAndroid.show('Alarm is created successfully', ToastAndroid.LONG)
                })
            },
                this.props.navigation.navigate('WalletAlert'))
    }

    render() {
        //map picker item with api data
        let p = this.state.allItems;
        let myData;
        let myAllData = Object.keys(p).map((address, i) => {
            myData = p[address]
            return (
                <Picker.Item label={myData.name} value={myData.name} key={i} />
            )
        })
        return (
            <ScrollView style={styles.addAlertContainer}>
                <View>
                    <Picker
                        mode="dialog"
                        selectedValue={this.state.selectitem}
                        style={{ width: '50%', marginLeft: '25%', color: '#fff' }}
                        onValueChange={(itemValue) => this.setState({ selectitem: itemValue })}
                    >
                        {myAllData}
                    </Picker>
                </View>
                <View>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.selectDropDown}
                        style={{ width: '50%', marginLeft: '25%', color: '#fff' }}
                        onValueChange={(itemValue) => this.setState({ selectDropDown: itemValue })}>
                        <Picker.Item label="Above" value="Above" />
                        <Picker.Item label="Below" value="Below" />
                    </Picker>
                </View>
                <View style={{ marginTop: 50 }}>
                    <TextInput
                        onChangeText={(val) => this.setState({ val: val })}
                        keyboardType='numeric'
                        placeholder='Enter Value'
                        placeholderTextColor='#fff'
                        style={{
                            height: 40,
                            color: '#fff',
                            borderColor: 'gray',
                            width: '50%',
                            marginLeft: '25%',
                            marginRight: '25%',
                            borderWidth: 1,
                            textAlign: 'center',
                            alignContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                </View>
                <View style={{ width: "80%", marginLeft: '10%', marginTop: 50 }}>
                    <Button
                        onPress={() => this.onButtonPress()}
                        title="Create Alerm"
                        color="#1F2F46"
                    />
                </View>
            </ScrollView>
        )
    }
}

export default addAlert;