import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView } from 'react-native';
import { connect } from 'react-redux';


class WalletTransaction extends Component{
    static navigationOptions = {
        //header: null,
       // tabBarOptions: { showIcon: true, },
        tabBarIcon :({tintColor})=>(
 
         <Image source={require('./Images/wallettransaction.png')} style={{height: 22, width: 18}} > 
 
             </Image>
        )      
        
     }

    render(){

        return(
            <ScrollView >
            <View style = {styles.container}>
            
             <View style = {styles.redbox} >
                
                <View style={styles.redBoxInner}>
                    <Text style={styles.headBigFont}>$ 16,505,160</Text>
                    <Text style={styles.headSmallFont}><Text style={{}}>Total Assets</Text> <Text><Image source={require('./Images/down.png')} style={{width:30,height:30,padding : 15,margin : 10}} /></Text> </Text>
                 </View> 
                 
             </View>
             <View style = {styles.bluebox} >
                 <Text style={styles.blueBoxText}>19 Jun 2018</Text>
             </View>

             <View style={styles.wallets}>

                     <View style={styles.walletContainer}>
                     <View style={styles.wallet}>
                         <Text style={styles.WaletTextLeft}> <Image source={require('./Images/dollar.png')} style={{width:25,height : 25}} /> Pay in</Text>
                         <Text style={styles.WaletTextRight}>+ 0.01 BTC</Text > 
                      
                     </View>
                     <View style={styles.WaletNextTextLeft}>
                         
                         <Text style={styles.WaletNextTextLeftText}>From Anonymous Sender</Text>
                          
                     </View>
                     
                     </View>

                     <View style={styles.walletContainer}>
                     <View style={styles.wallet}>
                         <Text style={styles.WaletTextLeft}> <Image source={require('./Images/dollar.png')} style={{width:25,height : 25}} /> Pay in</Text>
                         <Text style={styles.WaletTextRight}>+ 0.01 BTC</Text > 
                      
                     </View>
                     <View style={styles.WaletNextTextLeft}>
                         
                         <Text style={styles.WaletNextTextLeftText}>From Anonymous Sender</Text>
                          
                     </View>
                     
                     </View>

                     <View style={styles.walletContainer}>
                     <View style={styles.wallet}>
                         <Text style={styles.WaletTextLeft}> <Image source={require('./Images/dollar.png')} style={{width:25,height : 25}} /> Pay in</Text>
                         <Text style={styles.WaletTextRight}>+ 0.01 BTC</Text > 
                      
                     </View>
                     <View style={styles.WaletNextTextLeft}>
                         
                         <Text style={styles.WaletNextTextLeftText}>From Anonymous Sender</Text>
                          
                     </View>
                     
                     </View>

             </View>

             {/* 2nd */}
             <View style = {styles.bluebox} >
                 <Text style={styles.blueBoxText}>20 Jun 2018</Text>
             </View>

             <View style={styles.wallets}>

                     <View style={styles.walletContainer}>
                     <View style={styles.wallet}>
                         <Text style={styles.WaletTextLeft}> <Image source={require('./Images/dollar.png')} style={{width:25,height : 25}} /> Pay in</Text>
                         <Text style={styles.WaletTextRight}>+ 0.01 BTC</Text > 
                      
                     </View>
                     <View style={styles.WaletNextTextLeft}>
                         
                         <Text style={styles.WaletNextTextLeftText}>From Anonymous Sender</Text>
                          
                     </View>
                     
                     </View>

                     <View style={styles.walletContainer}>
                     <View style={styles.wallet}>
                         <Text style={styles.WaletTextLeft}> <Image source={require('./Images/dollar.png')} style={{width:25,height : 25}} /> Pay in</Text>
                         <Text style={styles.WaletTextRight}>+ 0.01 BTC</Text > 
                      
                     </View>
                     <View style={styles.WaletNextTextLeft}>
                         
                         <Text style={styles.WaletNextTextLeftText}>From Anonymous Sender</Text>
                          
                     </View>
                     
                     </View>

                

             </View>     
             
             </View>
           
         </ScrollView>
        )
    }


}

export default WalletTransaction ;

const styles = StyleSheet.create ({
    container: {
      //  flex:1,
       flexDirection: 'column',
    //    justifyContent: 'center',
    //    alignItems: 'center',
       backgroundColor: '#1f2630',
      height: 750
    },
    redbox: {
      // width: 100,
       height: 100,
       backgroundColor: '#1f2630',
       marginBottom  : 10
    },
    redBoxInner : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    headBigFont : {
        color : '#ac9b3c',
        fontSize : 22,
        alignSelf :'center' 
    },
    headSmallFont: {
        color : 'white',
        fontSize : 11, 
        alignSelf :'center'
    },
    bluebox: {
        height: 40,
       backgroundColor: '#21324c',
       borderWidth : 1,
       borderColor : '#21324c',
       borderTopStartRadius : 20,
       borderTopEndRadius : 20
    },
    blueBoxText : {
        padding : 15,
        fontSize : 11,
        color :'white'
    },

    walletContainer : {

        backgroundColor : '#1d2c42',
        //height : 50,
        borderBottomWidth : 0.4,
        borderColor : '#1f2630',
        paddingEnd : 5,
        marginEnd :0.5,
    
        
        justifyContent: 'space-between',

    },
    wallet : {
        flexDirection: 'row',
      justifyContent: 'space-between',
     // height : 60
      // paddingEnd : 20,
        
    },
    WaletTextLeft :{
        padding : 10,
       // margin : 10,
        color : 'white',
        //fontSize : 11
        //width : 200,
    },
    WaletTextRight : {
   
        paddingTop : 10,
        color : '#ac9b3c',
      
    },
    WaletNextTextLeft : {
        alignSelf : 'flex-start',
        marginStart : 30,
   
        margin : 5 
    },
    WaletNextTextLeftText : {
        fontSize :9,
        marginEnd : 28,
        color: 'gray',
        marginTop : -15,
        color : 'white',
    },
    
    
 })