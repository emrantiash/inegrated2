import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    //walletAlert
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1f2630',
        height: '100%' // this line can be ommited when dynamic data loads..
    },
    bluebox: {
        backgroundColor: '#21324c',
        borderColor: '#21324c',
    },
    blueBoxText: {
        padding: 10,
        color: 'white',
    },
    wallets: {
        flex: 1,
        marginBottom: 20
    },
    topText: {
        color: 'green'
    },
    belowText: {
        color: 'white',
        fontSize: 11
    },
    bottomBorder: {
        borderColor: '#21324c'
    },

    //addAlert
    addAlertContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1f2630',
        height: '100%'
    },
});