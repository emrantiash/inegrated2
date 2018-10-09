import React, { Component } from 'react';
import { View,ScrollView, Text,StyleSheet,TouchableHighlight ,TouchableOpacity,Image} from 'react-native';
import { Icon, Button, Container, Header, Content, Left,Right, Body, Title,Input,Label,Item,Form,List,ListItem,Card,CardItem,DatePicker,Picker} from 'native-base';
import {Column as Col, Row} from 'react-native-flexbox-grid'; 
import { connect } from 'react-redux';

class  AddIncome extends Component
{
    
    static navigationOptions = {
        title: 'Add income',
        headerTitleStyle: {
            fontSize : 15,
            color :'white',
            ///margin :10
        },
        headerStyle: {
            margin : 1,
           backgroundColor : 'gray',
           //opacity : 0.9
          // padding : 10
           
        },
        // headerTintColor: {
        //    /*  */
        // },
     }
     constructor(props) {
        super(props);
        this.state = {
          selected: "key0",
          selectedAccount : "no"
        };
      }
      onValueChange(value) {
        this.setState({
          selected: value
        });
      }
      onAccountChange(value) {
        this.setState({
          selectedAccount : value
        });
      }
    render(){
        const { params } = this.props.navigation.state;
        const itemId = params ? params.itemId : null;

        return(
            // <View style = {styles.container}>
            //         <Text>Add Income {JSON.stringify(itemId)}</Text> 
            // </View>

            <View style = {styles.container}>
            <Content>
            <Form>
                <View style = {styles.redbox} >
                {/* <Label style={{color:'gray'}}>Account</Label> */}
                <Item  >
                <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.selectedAccount}
              onValueChange={this.onAccountChange.bind(this)}
            >
            <Picker.Item label="Select Account" value="no" />
             <Picker.Item label="Account 1" value="one" />
              <Picker.Item label="Account 2" value="two" />
              
              
            </Picker>
              </Item>
              {/* <Label style={{color:'gray'}}>Type</Label> */}
             <Item >
                 <Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
             <Picker.Item label="Select Type" value="key0" />
              <Picker.Item label="Business" value="key1" />
              <Picker.Item label="Salary" value="key2" />
              
            </Picker>

            </Item>
              <Item floatingLabel >
                <Label style={{color:'gray'}}>Amount</Label>
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

export default AddIncome;
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