import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,TouchableOpacity,Image,Alert,Dimensions,Picker} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base'
import Orientation from 'react-native-orientation';

import Language from './language' ;
import {connect} from 'react-redux' ;
import {changeThisLanguage} from '../actions/setting';

var {height, width} = Dimensions.get('window');
class Settings extends Component {
    //alert(language);
    static navigationOptions = {
        //drawerLabel: "....",
        drawerIcon: (
            <Image source={require('./Images/settings.png')}
                style={{ height: 24, width: 24 }} />
        )
    }
    constructor(props){
        super(props);

        this.state ={
           mylanguage : this.props.language,
           
        }
    }
    changeto = (val)=>{
        // alert(val);
        //this.props.changeThisLanguage(val);
        this.setState({
           mylanguage : val 
        })

       
    }

    _changeNow = () =>{
        
        let value = this.state.mylanguage ;
       // alert(value);
        this.props.changeThisLanguage(value);
    }
    _onPressButton() {
        Alert.alert('Alert Message!')
      }
    render() {
     //   Orientation.unlockAllOrientations(); //unlock to screen rotation 
        let mylevel = "Russian";
        let title = "";
        let sbuttonText = "Save Changes" ;let hText = "SELECT LANGUAGE ";
        //let language = "Language";
     if(this.props.language==="ENGLISH"){ 
     	
     	mylevel = mylevel ;
         title = "Settings";
         sbuttonText = sbuttonText ;
         hText = hText ;
         //language = language ; 

     }
     if(this.props.language==="RUSSIAN") {

     	mylevel = "РУССКИЙ";
         title = "настройка";
         sbuttonText = "Сохранить изменения" ;
         hText = "ВЫБОР ЯЗЫКА";
        // language = "язык";
     }
        return (
            <Container>
                <Header style={{ paddingRight: 15, paddingLeft: 15, backgroundColor: '#1b2129' }}>
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
                <Content style={styles.container}>
                   
                    <View style={styles.hairline} />
                    <View >

                  <Text style={{ paddingLeft: 10,color : '#ac9b3c', }}>{hText}</Text>
                       
                       {/* <Text>{this.props.language}</Text> */}
                    {/* <Language selectedValue={this.state.mylanguage} changeto={(val)=>this.changeto(val)}/>   */}
                    <Picker style={styles.pickerme}
                    selectedValue={this.state.mylanguage} onValueChange={(val)=>this.changeto(val)} >  
                    <Picker.Item label="English" value="ENGLISH" />
                    <Picker.Item label={mylevel} value="RUSSIAN" /> 
                    
                    </Picker>  

                     
                   </View>
                <View style={styles.submitButtonContainer}> 
                   <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {this._changeNow}>
                    <Text style = {styles.submitButtonText}> {sbuttonText} </Text>
                    
                    </TouchableOpacity>
                </View>
                </Content>
            </Container >
        );
    }
}

function mapStateToProps(state){
    return({
       
       language : state.settingReducer.currentLanguage 

    })
}

function mapDispatchToProps(dispatch){
 
    return({
        
        changeThisLanguage : (val)=>{
           dispatch(changeThisLanguage(val))
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Settings) ;
const styles = StyleSheet.create({
    container : {
        backgroundColor: '#1f2630',
    },
    Box: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        margin : 10,
        
    },
    stretch: {
      //  margin : 10,
        height: 35,
        width: 30,
        padding: 8,
       // backgroundColor: '#8A1A1A',
        top: 6,
        position: 'absolute'
    },
    titleText: {
        fontSize: 20,
        color: '#000000',
        flex: 1,
        paddingLeft: 5,
        color : 'white'
    },
    bellowText: {
        fontSize: 14,
        paddingLeft: 5,
        marginTop: -5,
        color : 'white'
    },
    hairline: {
 
        backgroundColor: '#A2A2A2',
        height: 1,
        width: '100%',
        margin : 10
      },
      pickerme:{

        margin : 10,
        color : 'white'
      },
      submitButtonContainer : {
          flex : 1 ,
        justifyContent : 'flex-end',
        //alignItems : 'center'
      },
      submitButton: {
        
        backgroundColor: '#7a42f4',
       padding: 10,
        margin: 10,
       borderRadius : 5,
        height: 40,
        justifyContent : 'center',
        alignItems : 'center'
     },
     submitButtonText:{
        color: 'white',

     }
});

