import React, { Component } from 'react';
import { View,ScrollView, Text,StyleSheet,TouchableHighlight ,TouchableOpacity,Image} from 'react-native';
import { Icon, Button, Container, Header, Content, Left,Right, Body, Title,Input,Label,Item,Form,List,ListItem,Card,CardItem,DatePicker,Picker} from 'native-base';
import {Column as Col, Row} from 'react-native-flexbox-grid'; 
import { connect } from 'react-redux';

class WalletHistory extends  Component{
    constructor(props){
        super(props);

        this.state ={
           flag :  'red',
           chosenDateFrom: new Date('y-m-d') ,
           chosenDateTo: new Date() ,
           selected: "All"
        }

        this.setDate = this.setDate.bind(this);
        this.getDate  = this.getDate.bind(this);
       // this.setDateTO = this.setDateTo.bind(this);
        
    }

    setDate(newDate) {
        this.setState({ 

          chosenDateFrom: newDate 
        });
      }

      getDate(newDate) {
        this.setState({ 
          chosenDateTo: newDate 
        });
      }

    search = ()=>{
        
        this.setState({

            flag : 'green'
        })

       // console.log(this.state.flag);
    }

    goBack = () =>{
      this.setState({

        flag : 'red'
    })
    }

    blue = () =>{

      this.setState({
        flag  : 'blue'
      })

      console.log(this.state.chosenDateFrom)
    }

    onValueChange(value) {
      this.setState({
        selected: value
      });

    }

    render(){

        if(this.state.flag==='red')
        {
        return(
           
            <Container>
                 
            <Content style={styles.historyContainer}>
                
                        <TouchableOpacity onPress={this.search}>
                        <Icon type="FontAwesome" name="search" style={{ flex: 1, flexDirection: 'row',alignSelf : 'flex-end',padding:0,marginEnd : 10,marginTop:4 }} />
                        </TouchableOpacity>
              <List>
                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Food | 100</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>
                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Grossary | 900</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>

                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.incomeHead}>Business | 4000</Text>
                    
                  <Text note style={styles.incomedate}>Income | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>
                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Grossary | 900</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>

                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Food | 100</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>
                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Grossary | 900</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>
                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Food | 100</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>
                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Grossary | 900</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>

                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Food | 100</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>
                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Grossary | 900</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>

                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Food | 100</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>
                <ListItem>
                  <Body>
                  <View style={styles.cont}> 
                    <Text style={styles.head}>Grossary | 900</Text>
                    
                  <Text note style={styles.date}>Expence | 2018-05-05</Text>
                  </View>
                  </Body> 
                </ListItem>
               
              </List>
            </Content>
          </Container>
        )

    }
    if(this.state.flag==='green')
    {
        return(
          
            <Container >
              {/* <View>
                <TouchableOpacity onPress={this.goBack}>
              <Image source={require('./Images/cancel.png')} style={{ height: 24, width: 24,alignSelf: 'flex-end', padding:5,margin:10,marginEnd :10  }} />
              </TouchableOpacity>
            </View> */}
            <Content >
            <View style={styles.searchContainer}>
            {/* <Label style={styles.label}>Start date</Label> */}
            <TouchableOpacity onPress={this.goBack}>
              <Image source={require('./Images/cancel.png')} style={{ height: 20, width: 20,alignSelf: 'flex-end' }} />
              </TouchableOpacity>
            <Item inlineLabel>
              <DatePicker 
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Start date"
                textStyle={{ color: "gray"  }}
                placeHolderTextStyle={{ color: "gray"  }}
                onDateChange={this.setDate}
                />
                </Item>
                {/* <Text>
                  Date: {this.state.chosenDate.toString().substr(4, 12)}
                </Text> */}
            {/* <Label style={styles.label}>End date</Label> */}
            <Item inlineLabel>
                <DatePicker 
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="End date"
                textStyle={{ color: "gray" }}
                placeHolderTextStyle={{ color: "gray"  }}
                onDateChange={this.getDate}
                />

              </Item>
              {/* <Label style={styles.label}>Type</Label> */}
              <Item picker>
              <Picker 
              note
              mode="dropdown"
              style={{ color: 'gray' }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              
              <Picker.Item label="All" value="All Type" />
              <Picker.Item label="Income" value="Income" />
              <Picker.Item label="Expense" value="Expense" />
              
            </Picker>
            </Item>
                <TouchableOpacity           
               style = {styles.submitButton}
               onPress = {this.blue}>
                 
               <Text style = {styles.submitButtonText}>  Search </Text> 
            </TouchableOpacity> 
            </View>
            </Content>
          </Container>
        )
    }

    if(this.state.flag==='blue')
    {
      return(
        <ScrollView style={styles.reportContainer}>
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>#{this.state.chosenDateFrom.toString().substr(4, 12)} #{this.state.chosenDateTo.toString().substr(4, 12)} #{this.state.selected}</Text> 
            <TouchableOpacity onPress={this.search}>
            <Image source={require('./Images/cancel.png')} style={{ height: 24, width: 24,alignSelf: 'flex-end' }} />     
            </TouchableOpacity>
        </View>
        <View style={styles.tableContainer}>
                                    
                                    
                                      <Row size={12} >
                                          <Col sm={2} md={3} lg={3} style={styles.rowContainer}>
                                            <Text style={styles.symbol}>SL</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.rowContainer}>
                                            <Text style={styles.symbol}>Amount</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.rowContainer}>
                                            <Text style={styles.symbol}>Catagory</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.rowContainer}>
                                            <Text style={styles.symbol}>Date</Text>
                                          </Col>
                                      </Row>
                                      <Row size={12} style={styles.rows}>
                                          <Col sm={1} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>1</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>1000</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>Grossary</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2018-05-05</Text>
                                          </Col>
                                      </Row>
                                      <Row size={12} style={styles.rows}>
                                          <Col sm={1} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>100</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>Food</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2018-05-05</Text>
                                          </Col>
                                      </Row>
                                      <Row size={12} style={styles.rows}>
                                          <Col sm={1} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>3</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>50</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>Transport</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2018-05-05</Text>
                                          </Col>
                                      </Row>
                                      <Row size={12} style={styles.rows}>
                                          <Col sm={1} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>4</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>300</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>Grossary</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2018-05-05</Text>
                                          </Col>
                                      </Row>
                                      <Row size={12} style={styles.rows}>
                                          <Col sm={1} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>5</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>1000</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>Grossary</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2018-05-05</Text>
                                          </Col>
                                      </Row>
                                      <Row size={12} style={styles.rows}>
                                          <Col sm={1} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>6</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>1000</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>Grossary</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2018-05-05</Text>
                                          </Col>
                                      </Row>
                                      <Row size={12} style={styles.rows}>
                                          <Col sm={1} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>7</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>1000</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>Grossary</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2018-05-05</Text>
                                          </Col>
                                      </Row>
                                      <Row size={12} style={styles.rows}>
                                          <Col sm={1} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>8</Text>
                                          </Col>
                                          <Col sm={3} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>1000</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>Grossary</Text>
                                          </Col>
                                          <Col sm={4} md={3} lg={3} style={styles.colContainer}>
                                            <Text style={styles.symbolCol}>2018-05-05</Text>
                                          </Col>
                                      </Row>
                                 
                            
                                   
        </View>

        </ScrollView>
      )
    }
    }

}


export default WalletHistory ;

const styles = StyleSheet.create({

  historyContainer : {
    backgroundColor : '#F0F0F0'
  },

  datepicker : {
  
      borderWidth : 1,
      borderColor : 'blue'

  },

    head : {

        color: 'gray',
        fontSize:11
    },
    incomeHead :{
      color: 'green',
        fontSize:11
    },
    cont : {
        flexDirection : 'row',
       justifyContent: 'space-between',
    },
    left :{
        alignSelf: 'flex-start' 
    },
    date :{
        alignSelf : 'flex-end',
        color: '#1E90FF',
        fontSize : 10
    },
    incomedate :{
        alignSelf : 'flex-end',
        color: 'green',
        fontSize : 10
    },

    searchContainer:{
     padding : 10,
     margin : 10 ,
     backgroundColor : '#d9edf7',
     //backgroundColor : '#fafafa',
     borderWidth : 1,
     borderColor : 'white',
     borderRadius : 10,
     justifyContent : 'center',
     marginTop :50
    

    },
    submitButton: {
      marginTop :20,
     padding: 10,
     backgroundColor: '#26a7d7',
     margin: 1,
     //height: 40,
     borderRadius : 5
  },
  submitButtonText:{
     color: 'white',
     alignSelf : 'center',
    
  },
  label:{
    color:'white',
    fontSize : 14
 

  },

  reportContainer :{
     //width : '100%',
      padding : 5,
      margin :5

  },
  headingContainer :{
    flexDirection : 'row',
    justifyContent: 'space-between',
    //backgroundColor : '#F0F8FF',
    padding : 3,
    marginBottom : 3
  },

  heading: {
    alignSelf : 'flex-start',
    fontSize :10,
    color : 'orange',
    letterSpacing : 3.0,
  },

  tableContainer : {

    //paddingHorizontal : 5,
   // marginTop : 5
   //width: '100%'
   
  },
  rows :{
    borderBottomWidth :1 , 
    borderColor : '#e5e5e5',
  },
  rowContainer : {
    height : 60,
    //padding : 3,
//    margin:3,
    borderColor : '#e5e5e5',
    backgroundColor : '#1f2630',
    justifyContent : 'center',
    alignItems : 'center',
    
  },
  colContainer : {
    height : 50,
   borderWidth :1,
    borderColor : 'white',
    backgroundColor : 'white',
    justifyContent : 'center',
    alignItems : 'center',
    //borderEndWidth : 1,
    //borderColor : 'red'
  },
  symbol:{
      justifyContent : 'center',
      alignItems : 'center',
      color : 'white',
      //padding : 2,
      letterSpacing : 4.0,
      },
  symbolCol:{
        justifyContent : 'center',
        alignItems : 'center',
        color : 'gray',
        //padding : 2,
        letterSpacing : 2.5,
        fontSize :12
      },

})