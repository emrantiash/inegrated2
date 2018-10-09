import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    logo: {
        width: 45,
        height: 45,
        marginTop: 30,
        marginLeft: 35,
        position: 'absolute'
    },
    Text: {
        flex: 1,
        color: 'white',
        fontSize: 40,
        paddingLeft: 95,
        fontFamily: 'Cambria',
        paddingTop: 20,

    },
    text: {
        flex: 1,
        color: '#FF0000',
        fontSize: 20,
        paddingLeft: 95,
        marginTop: -14,
    },
    info: {
        padding: 15,
        paddingTop: 35,
        color: 'white',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        marginBottom: 10,
    },
    share: {
        height: 30,
        width: 30,
        alignItems: 'center',
        marginLeft: 130
    },
    like: {
        height: 30,
        width: 30,
        marginLeft: 55,
    },
    footer: {
        textAlign: 'center',
        fontSize: 11,
        backgroundColor: '#1f2630',
        color: 'white',
    },
    content: {
        flex: 1, 
        backgroundColor: '#1f2630'
    },
    contentView1: {
        flexDirection: 'column', 
        width: '100%'
    },
    contentBody: {
        height: 360
    },
    contentBody1: {
        flexDirection: 'row', 
        backgroundColor: '#1b2129', 
        marginBottom: 10
    }
});