import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,TouchableOpacity,Image,Picker} from 'react-native';

import {connect} from 'react-redux' ;


class Language extends Component {
    // _changeto = (val) =>{
    //     this.props.changeto(val);
    // }
    
    render() {
       // alert(this.props.language);
        return (
            
                   <View>
                    {/* <Text>   {this.props.language}</Text> */}
                   <Picker onValueChange={(val)=>this.props.changeto(val)} >  
                    <Picker.Item label="Language" value="" />
                    <Picker.Item label="ENGLISH" value="ENGLISH" />
                    <Picker.Item label="RUSSIAN" value="RUSSIAN" /> 
                   </Picker>
                   </View>
               
        );
    }
}

function mapStateToProps(state){
    return({
       
      // language : state.settingReducer.currentLanguage 

    })
}

function mapDispatchToProps(dispatch){
    return({
        browseAction : ()=>{
           dispatch(browseAction())
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Language) ;




