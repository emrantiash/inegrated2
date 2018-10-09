import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet,Alert,Image } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';


class BrowseComponent extends Component {

	_onPress = () => {
		//alert(this.props.item.name);
    this.props.getItem(this.props.item);
  };
	
   render() {

   	//const name = this.props.item.name  ;
      return (
         <View> 

        <TouchableOpacity style={styles.container} onPress={this._onPress}> 
       
          <Row size={12} >
          <Col sm={1} md={1} lg={1} >
              <Text style={styles.imageColor}>
              {
                this.props.item.change < 0  &&
                <Image  source={require('./Images/down.png')} style={styles.image}/>
              }
               {
                this.props.item.change > 0  &&
                <Image  source={require('./Images/up.png')} style={styles.image}/>
              }
              
              </Text>
            </Col>
            <Col sm={3} md={4} lg={3} >
              <Text style={styles.symbol}>
              
              
              {this.props.item.symbol}
              </Text>
            </Col>

            <Col sm={3} md={4} lg={3}>
            <Text style={styles.symbol}>
              {this.props.item.bid}
              </Text>
               
            </Col>

            <Col sm={3} md={4} lg={3}>
              <Text style={styles.symbol}>
              {this.props.item.ask}
              </Text>
            </Col>

            <Col sm={2} md={4} lg={3}>
              <Text style={styles.symbol}>
              {this.props.item.change}
              </Text>
            </Col>
            
          </Row>
            
        </TouchableOpacity>
      </View>
      )
   }
}
export default BrowseComponent ;
const FONT_SIZE = 13;
const styles = StyleSheet.create ({
   container: {
     display : "flex",
    borderRadius : 1,
      borderBottomWidth: 0.3,
      //borderColor : '#e5e5e5',
      borderColor : 'black',
      width : '100%',
      height : 55,
    borderRadius : 1,
     justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : '#1f2630'
   },
   imageColor :{
     color : 'red'
   } ,
  image :{
    width : 40,height : 40,
  } ,
  image2 :{
    width : 30,height : 30,
  } ,
   symbol:{
   fontSize : FONT_SIZE,
    letterSpacing : 1.5,
    color : '#ac9b3c'

   },
  
   
})