import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,TouchableOpacity,TouchableHighlight,Image,ScrollView} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base';

import {Column as Col, Row} from 'react-native-flexbox-grid';
import {Dimensions} from 'react-native' ;
import BrowseComponent from './browsecomponent';
import {connect} from 'react-redux' ;

import {browseAction} from '../actions/browseAction';

class Currency extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image source={require('./Images/currency.png')}
            style={{height:24, width:24}}/>
        )
    }

    componentDidMount()
    {
        this.props.browseAction();
    }

    static navigationOptions = {
        drawerIcon: (
            <Image source={require('./Images/currency.png')}
            style={{height:24, width:24}}/>
        ),
        
        
      };

      getItem = (item) => {
        console.log(item.symbol); // : pair name 
       
        this.props.navigation.navigate('ChartSingle', { quote : item.symbol, });
     }

     refreash = () =>{
        this.props.browseAction();
     }
    render() {
        //alert(this.props.language);
        return (
            <Container>
                <Header style={{backgroundColor: '#1b2129' , paddingRight: 15, paddingLeft: 15 }}>
                    <Content>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon ios='ios-menu' android="md-menu" style={{ fontSize: 50, color: '#ffffff' }}
                                onPress={() => this.props.navigation.openDrawer()} />

                            <Body style={styles.topContainer}>
                            {
                                this.props.language ==="ENGLISH" &&
                                <Title style={styles.headerText2}>Quotes</Title>
                            }
                            {
                                this.props.language ==="RUSSIAN" &&
                                <Title style={styles.headerText2}>кавычки</Title>
                            }
                                
                                <TouchableHighlight onPress={this.refreash} style={styles.imageBox}>
                                <Image  source={require('./Images/reload.png')} style={styles.imageTop}/>
                                </TouchableHighlight>
                                
                            </Body>
                        </View>
                    </Content>
                </Header>
                <Content contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                }}>
                    <ScrollView style={{backgroundColor :  '#1f2630'}}>

                
                <View style={styles.container}>
                                    
                                  
                                       
                                        <Row size={12} style={styles.rowContainer}>
                                        <Col sm={1} md={1} lg={1} >
                                        <Text style={styles.symbol}>
                                                
                                        </Text>
                                        </Col>
                                        <Col sm={3} md={4} lg={3} >
                                        
                                       { this.props.language === 'ENGLISH' &&   <Text style={styles.symbol}> Pair  </Text>}
                                       { this.props.language === 'RUSSIAN' &&   <Text style={styles.symbol}> пара </Text>}
                                                
                                       
                                        </Col>
                                        <Col sm={3} md={4} lg={3} >
                                        { this.props.language === 'ENGLISH' &&   <Text style={styles.symbol}> Bid  </Text>}
                                       { this.props.language === 'RUSSIAN' &&   <Text style={styles.symbol}>предложение</Text>}
                                                
                                        </Col>
                                        <Col sm={3} md={4} lg={3} >
                                        { this.props.language === 'ENGLISH' &&   <Text style={styles.symbol}> Ask  </Text>}
                                       { this.props.language === 'RUSSIAN' &&   <Text style={styles.symbol}> спросить </Text>}
                                                
                                        </Col>
                                        <Col sm={2} md={4} lg={3} >
                                        { this.props.language === 'ENGLISH' &&   <Text style={styles.symbol}>Change</Text>}
                                       { this.props.language === 'RUSSIAN' &&<Text style={styles.symbol}>изменение</Text>}
                                        </Col>
                                        </Row>
                                         

                            
                                   
                </View>
                <View >
                {
                        
                        this.props.load != 'load' && <View style={styles.imageContainer}>
                                            
                                          <Image  source={require('./Images/load.gif')} style={styles.image}/>
                                          <View style={styles.loading}>
                                            <Text style={styles.loadText}>{this.props.load}..</Text>
                                          </View>
                                    
                                         </View>
                                         
                                                              
                }
            </View>

            {
                this.props.load == 'load' ? (

	               this.props.data.map((item, index) => (
	                 
	                     
	                     <BrowseComponent item={item} key={index}  getItem={this.getItem}/>
	                  
                   ))
                ) : null 
            }
                

                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state){
    return({
       // testname : state.browseReducer.testname,
       data : state.browseReducer.bdata,
       network : state.browseReducer.network ,
       load : state.browseReducer.load ,
       language : state.settingReducer.currentLanguage 

    })
}

function mapDispatchToProps(dispatch){
    return({
        browseAction : ()=>{
           dispatch(browseAction())
        }
    })
}


export default connect(mapStateToProps,mapDispatchToProps)(Currency) ;

var imageWidth = Dimensions.get('window').width / 8 ;
const FONT_SIZE = 13;
const styles = StyleSheet.create({
    container :{
       // backgroundColor : '#1f2630',
    } ,
    imageContainer : {
        flex : 1,
        //padding : 100,
        ///margin : 60,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 150,
        backgroundColor : '#1f2630',
        
    },
    image :{
        height:imageWidth, 
        width:imageWidth,
       
    },

    loadText :{
        fontSize : 18 ,
        //fontWeight : 'bold',
        justifyContent : 'center',
        alignItems: 'center',
        marginTop : 5,
        marginLeft : 3,
        color : 'white'
        
    } ,

    loading :{
       // flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
    
    headerTextBox :{
        justifyContent : 'center',
        alignItems : 'center',
       
    } ,
    headerText :{
      marginLeft : 10,
      padding : 10,
      letterSpacing : 1.5,
     
        
      
    } ,
    imageBox :{
      justifyContent : 'flex-end',
      alignSelf: 'flex-end', 
      //alignItems : 'stretched',
      marginTop : -25
    
    } ,

    imageTop :{
        width : 30,height : 30,
       // alignSelf: 'flex-end',  margin : 10,padding : 10
      } ,
      
     container: {
           
           height : 60,
           borderColor : '#e5e5e5',
          // padding : 4,
           //margin : 4,
           //width : '90%',
           justifyContent : 'center',
           alignItems : 'center',
           backgroundColor : '#FF0000',
           opacity: 0.8
        },
     
      
        symbol:{
      //  fontSize : FONT_SIZE,
        color : 'white',
        padding : 2,
        //fontWeight : 'bold',
        letterSpacing : 1.0,
        },
       
   

    
})
