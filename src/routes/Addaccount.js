import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,TouchableOpacity,TextInput,Image} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title,Input,Label,Item,Form } from 'native-base'

class AddAccount extends Component{

    static navigationOptions = {
        title: 'New account',
        headerTitleStyle: {
            fontSize : 15,
            color :'white',
            ///margin :10
        },
        headerStyle: {
            margin : 1,
           backgroundColor : '#483D8B',
           //opacity : 0.9
          // padding : 10
           
        },
        // headerTintColor: {
        //    /*  */
        // },
     }

    render(){
        return(
            <View style = {styles.container}>
            <Content>
            <Form>
                <View style = {styles.redbox} >
                <Item floatingLabel >
                <Label style={{color:'gray'}}>Account name</Label>
                <Input 
                  autoCorrect={false}
                  autoCapitalize="none" autoFocus
                />
              </Item>

              <Item floatingLabel >
                <Label style={{color:'gray'}}>Initial value</Label>
                <Input 
                  keyboardType="numeric"
                  autoCorrect={false}
                  autoCapitalize="none" 
                />
              </Item>
                
              <TouchableOpacity
               style = {styles.submitButton}
               onPress = {this.props.login}>
                 
               <Text style = {styles.submitButtonText}>  Submit </Text> 
            </TouchableOpacity> 
               

                </View>
            </Form>
            </Content>
                
            </View>
                    
        )
    }
}

export default AddAccount ;
const BORDER_COLOR = '#F4ECEC';

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
       // justifyContent: 'center',
       // alignItems: 'center',
        backgroundColor: 'white',
        height: 600
     },
     redbox: {
       // width: '100%',
        padding : 10,
        margin : 10
       // height: 100,
        //backgroundColor: 'red'
     },
     input: {

        margin: 15,
        //height: 40,
       // borderColor: '#78b266',
       // borderBottomWidth: 1,
       // borderRadius : 5
     },
     submitButton: {
         marginTop :20,
        backgroundColor: '#78b266',
        padding: 10,
        margin: 1,
        //height: 40,
        borderRadius : 5
     },
     submitButtonText:{
        color: 'white',
        alignSelf : 'center',
       
     },
    //  bluebox: {
    //     width: 100,
    //     height: 100,
    //     backgroundColor: 'blue'
    //  },
    //  blackbox: {
    //     width: 100,
    //     height: 100,
    //     backgroundColor: 'black'
    //  },
})