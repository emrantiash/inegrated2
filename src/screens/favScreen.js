import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import styles from './styles';
import ExtaSaveData from '../components/TextInput/ExtaSaveData';
export default class favScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myArray: [],
        }
    }
    componentWillMount() {
        this._retrieveData();
    }
    _retrieveData = async () => {
        try {
            AsyncStorage.getItem('DeviceID').then(res => {
                const resultArray = JSON.parse(res)
                console.log(resultArray, 'check database')
                this.setState({ myArray: resultArray })
            }).catch(e => console.log('Error is : ', e))
        } catch (error) {
            // Error retrieving data
        }
    }
    onQuoteChange(quote) {
        console.log(quote, 'quote')
        AsyncStorage.getItem('DeviceID')
            .then(res => {
                const resultArray = JSON.parse(res)
                let index;
                for (i = 0; i < resultArray.length; i++) {

                    if (resultArray[i].qCurrency === quote.buttonText) {
                        console.log(i, 'position')
                        index = i;
                        break;
                    } else {
                        console.log('not same data')
                    }
                }
                console.log(index, 'index')
                console.log(resultArray, 'resultArray')
                resultArray.splice(index, 1)
                AsyncStorage.setItem("DeviceID", JSON.stringify(resultArray))
                this.setState({ myArray: resultArray })
            })
    }
    render() {
        let ourResult = this.state.myArray;
        newArray = ourResult.map((item, key) => {
            return (
                <ExtaSaveData key={key}
                    editable={false}
                    change={(quote) => this.onQuoteChange(quote)}
                    buttonText={item.qCurrency}
                    value={item.ResulT}
                />
            );
        });
        return (
            <View style={styles.favscreenContainer}>
                <View style={{ backgroundColor: '#22324C' }}>
                    {
                        null || newArray
                    }
                </View>
            </View>
        );
    }
}