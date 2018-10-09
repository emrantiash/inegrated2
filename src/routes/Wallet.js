import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,TouchableOpacity,Image,Alert,Dimensions,Picker} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base'
import {connect} from 'react-redux' ;

import { createMaterialTopTabNavigator   } from 'react-navigation';
import WalletHome from './WalletHome';
import WalletHistory from './WalletHistory';

import Rootnavigator from './TabsWallet';

var {height, width} = Dimensions.get('window');
class Wallet extends Component {
    //alert(language);
    static navigationOptions = {
        //drawerLabel: "....",
        drawerIcon: (
            <Image source={require('./Images/wallet.png')}
                style={{ height: 24, width: 24 }} />
        )
    }
    constructor(props){
        super(props);

        this.state ={
           mylanguage : this.props.language,
           
        }
    }
   
    render() {
        let title = "Wallet";        
        return (
            <Container>
                <Header style={{ paddingRight: 15, paddingLeft: 15,backgroundColor : '#1b2129' }}>
                    <Content>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon ios='ios-menu' android="md-menu" style={{ fontSize: 50, color: '#ffffff' }}
                                onPress={() => this.props.navigation.openDrawer()} />

                            <Body>
                             <Title>{title}</Title>
                              
                            </Body>
                        </View>
                    </Content>
                </Header>
               
                        <Rootnavigator />
            
            </Container >
        );
    }
}




export default Wallet ;
