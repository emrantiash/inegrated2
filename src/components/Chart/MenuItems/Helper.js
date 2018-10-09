import React from "react";
import { Alert, ToastAndroid } from "react-native"
import { Picker } from "native-base";

const generateList = (quotesArray) => {
    let res = [];
    let arr = [...quotesArray];
    for (let i = 0; i < arr.length; i++) {
        let line = arr[i];
        res.push(<Picker.Item color='white' key={i} label={line.desc} value={line.symbol} />)
    }
    return res;
}

const fetchList = () => {
    let root = "https://api-webtrader.ifxdb.com/";
    const args = {
        "method": "getQuotesList",
        "params": {}
    }

    return fetch(root, { method: "POST", body: `rpc=${JSON.stringify(args)}` })
        .then(response => response.json())
        .then(json => {
            ToastAndroid.showWithGravity("Quotes List Downloaded!", ToastAndroid.SHORT, ToastAndroid.CENTER)
            return json;
        }
        ).catch(err => {
            Alert.alert(
                'Error !',
                `Downloading Quotes List Failed`,
                [
                    { text: 'Try Again', onPress: () => fetchList() },
                    { text: 'Cancel', onPress: null }
                ],
                { cancelable: false }
            )
        })
}

export { generateList, fetchList }

