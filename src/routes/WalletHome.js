import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image,ScrollView ,TextInput,ListView,Alert} from 'react-native';
import { Container, Header, Content, List, ListItem,Input,Form,Item,Label,Button,Picker,Textarea,Radio,Right,Left,DatePicker,Icon} from 'native-base';
//import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';

var SQLite = require('react-native-sqlite-storage');

import {connect} from 'react-redux' ;

import {pickerbtcAction,pickerbtcActionUpDown} from '../actions/pickerbtcaction';

import {CrateTable,InsertAccount,DeleteAllWallet,DeleteSingleWallet,UpdateWallet,Insertcatagory,DeleteSingleCatagory,UpdateSingleCatagory,MakeTransection} from '../databases/schema';

let db = SQLite.openDatabase({name: 'wallet.db', createFromLocation : "~mine.db", location: 'Library'}, this.openCB, this.errorCB);
var TAG = "App : ";

class WalletHome extends Component{

    static navigationOptions = {
       //header: null,
      // tabBarOptions: { showIcon: true, },
       tabBarIcon :({tintColor})=>(

        <Image source={require('./Images/walletman.png')} style={{height: 22, width: 18}} > 

            </Image>
       )   
       
    }

    constructor(props)
    {
        super(props);
        const ds0 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state ={
            Data: [] ,
            aryData: [] ,
            count : 1,
            flag : false ,
            nowshow : '0' , // add Wallet
            accountname : "",
            amount : "",
            color : '',
            selected: "gray",
            dataSource0: ds0.cloneWithRows([]),
            //dataSourceW : dsw.cloneWithRows([]),
            dataSource: ds.cloneWithRows([]),
            records0 :[],
            records :[],
            amountfocus : true,
            walletid : 0,
            catname : "",
            catflag : true ,
            catid : 0,
            initialamount : '',
            transectiontype : 'income',
            incomeradiotype : true,
            expenseradiotype : false,selectedcatagoryID : '', selectedcatagory : '',showSelectCatagoryFlag : false ,chosenDate: new Date(),
            selectedwalletID : '', selectedwallet : '',showSelectWalletFlag : false , remarks : '',thiswalletvalue : '',selectedWalletId : '',selecyedWalletName : '' 
        }
        this.setDate = this.setDate.bind(this);

        CrateTable();

        this.selectAll();
    }
    componentDidMount()
    {
        this.props.pickerbtcAction();
        this.props.pickerbtcActionUpDown();
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }

    nowShowFlag = () =>{
        //alert("call");
        this.setState({
            nowshow : '1',
            flag : true ,
            catflag : true ,
            catname : ''
        })
    }



    selectAll = () =>{
        db.transaction((tx) => {
            db.executeSql("SELECT * from account",[], function (results) {
              var len = results.rows.length;
              console.log('total records' + len);
              var Data = [];
          
              if (len > 0) {
                  for (let i = 0; i < len; i++) {
                      let pow = results.rows.item(i);
                      console.log("row : "+ JSON.stringify(pow));
                      Data.push({PID:pow.id,PITEMNAME:pow.accountname,PVALUE:pow.initialvalue});
                  }

               this.getCountcall() ;
              }else{
                  console.log("no records found");
              }
          
             // console.log('arydata :: ' + JSON.stringify(aryData));
              this.getCall(Data);   
          });
          });
          
          
          
          getCall = (Data) =>{    
            var ds0 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            var dataSourceTemp = ds0.cloneWithRows(Data);
            this.setState({records0:Data,dataSource0:dataSourceTemp});
            //alert("call");
            
          
          }

          getCountcall = () =>{
            this.setState({
                count : 2 
            })
        }
    }

    

    changeState = () =>
    {
        this.setState({
            flag : true ,
            nowshow : '0' // show add wallet page
        })            
    }

    backState = () =>{
        this.selectAll();
        
        this.setState({
            flag : false ,
            accountname : "",
            amount : "",
            color : '',
            selected: "gray",
            amountfocus : true
        })
        //this.selectAll();
    }

    setName = (val)=>{
        this.setState({
            accountname : val 
        })
    }

    setAmount = (val)=>{
        //alert(val);
        this.setState({
            amount : val 
        })
    }

    onValueChange(value) {
        this.setState({
          selected: value
        });
      }

      listRowItems = (Data) =>{
        return (
            <Swipeout left={[
                {
                    text: 'Edit',
                    backgroundColor: 'peru',
                    onPress: () => { this.editSingleWallet(Data.PID) }
                },
                {
                    text: 'Delete',
                    backgroundColor: 'gray',
                    onPress: () => { this.deleteSingleWallet(Data.PID) }
                },
                {
                    text: 'Details',
                    backgroundColor: 'green',
                    onPress: () => { this.detailsSingleWallet(Data.PID,Data.PITEMNAME) }
                }
            ]} autoClose={true}>
            <View style={styles.walletContainer}>
                        <View style={styles.wallet}>
                            <Text style={styles.WaletTextLeft}>{Data.PITEMNAME}</Text>
                            <Text style={styles.WaletTextRight}>= $ {Data.PVALUE} <Image source={require('./Images/rightarrow.png')} style={{height: 25, width: 25}} /></Text > 
                       
                        </View>
                        <View style={styles.WaletNextTextRight}>
                       
                            
                            <Text style={styles.WaletNextTextRightText}>{(Data.PVALUE/this.props.data).toFixed(2)} BTC <Text> </Text>

                            {

                                this.props.updown > 0 &&
                                <Text style={{fontSize: 11,color : 'green'}}>
                            <Image source={require('./Images/walletup.png')} style={{height:20,width:20}} /> {this.props.updown}
                            </Text>
                            }
                            {

                            this.props.updown < 0 &&
                            <Text style={{fontSize: 11,color : 'red'}}>
                            <Image source={require('./Images/btcdown.png')} style={{height:20,width:20}} /> {this.props.updown}
                            </Text>
                            }
                            
                            
                            
                            </Text>
                             
                        </View>
                        </View>
            </Swipeout >
        )

    }

    detailsSingleWallet = (id,name) =>{

      //  alert(id);
      this.queryWalletDetails(id);
        this.setState({
            flag : true ,
            nowshow : '6' ,// single wallet details..
            selectedWalletId :id,
            selecyedWalletName : name 
        }) 
    }

    queryWalletDetails = (id) =>{

       // alert("call");
       //SELECT doctors.doctor_id,doctors.doctor_name,visits.patient_name FROM doctors INNER JOIN visits ON doctors.doctor_id=visits.doctor_id WHERE doctors.degree='MD';
       db.transaction((tx) => {
       // db.executeSql("SELECT *  from transection t  INNER JOIN catagory c ON t.expensetype = c.id AND t.id = ? ORDER BY t.id DESC",[id], function (results) {
//db.executeSql("SELECT *,transection.id  as id,transection.creationdate as date, catagory.name as name   from transection LEFT OUTER JOIN catagory ON transection.expensetype = catagory.id AND transection.id = ? ORDER BY transection.id DESC",[id], function (results) {
    db.executeSql("SELECT *  from transection WHERE accountid = ? and type != ? ORDER BY id DESC",[id,0], function (results) {
        
          var len = results.rows.length;
          console.log('total records' + len);
          var Data = [];
      
          if (len > 0) {
              for (let i = 0; i < len; i++) {
                  let pow = results.rows.item(i);
                  console.log("row : "+ JSON.stringify(pow));
                  Data.push({RID:pow.id,RAMOUNT:pow.request,RTYPE:pow.type,RNAME : pow.expense,RDATE : pow.creationdate,RTEXT : pow.remarks});
              }

        
          }else{
              console.log("no records found");
          }
      
         // console.log('arydata :: ' + JSON.stringify(aryData));
          this.getCall(Data);   
      });
      });
      
      
      
      getCall = (Data) =>{    
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var dataSourceTemp = ds.cloneWithRows(Data);
        this.setState({records:Data,dataSource:dataSourceTemp});
        //alert("call");
        
      
      }

    
    }

    walletTransection = (Data) =>{
        return (

            //138.201.174.107
            
            <View style={styles.walletContainer}>
                        <View style={styles.wallet}>
                         <View style={styles.WaletTextLeftDuplicate}>   
                        {
                            Data.RNAME == 0 && 
                            <Text style={{color:'white',fontSize:11}}>Income </Text > 
                        }
                         
                        {
                            Data.RNAME != 0 && 
                         <Text style={{color:'white'}}>{Data.RNAME} </Text > 
                         }
                        <Text style={{color:'green',fontSize : 11}}>{Data.RDATE}</Text>
                        {
                            Data.RTEXT != '' && 
                            <Text style={{color:'white',fontSize : 11}}>{(Data.RTEXT)}</Text>
                        }
                        

                         </View>
                         <View>
                         <Text style={styles.WaletTextRight}>$ {Data.RAMOUNT}</Text>
                         
                       
                        </View>
                        </View>
                        
            </View>
           
        )

    }

    editSingleWallet = (id) =>{

        db.transaction((tx) => {
            db.executeSql("SELECT * from account WHERE id= ? ",[id], function (results) {
              var len = results.rows.length;
           
                      let row = results.rows.item(0);
                     
                     const items = {
                      name : row.accountname ,
                     amout : row.initialvalue ,
                     colr : row.color ,
                     walletid : row.id
                     }
                     //console.log(items);
                     this.editMine(items);
                     
          });
          });

    editMine = (items)=>{
           this.setState({
              accountname : items.name,
              amount : items.amout.toString() ,
              selected : items.colr ,
              flag  :true,
              amountfocus : false  ,
              walletid : items.walletid ,
              nowshow : '0' // show add wallet page
           })
    }

    }

    

    deleteSingleWallet = (id)=>{
      //  alert(id);
       Alert.alert(
        'Delete',
        'Delete Wallet ?',
        [
            {
                text: 'No', onPress: () => { },//Do nothing
                style: 'cancel'
            },
            {
                text: 'Yes', onPress: () => {
                    DeleteSingleWallet(id);
                    this.selectAll();
                    

                }
            },
        ],
        { cancelable: true }
    );

       
    }
      addNewAccount = () =>{
          
        if(this.state.amount==="") 
        this.state.amount = 0 ;
        if(this.state.accountname!=""){
        InsertAccount(this.state.accountname,this.state.amount,this.state.selected);

        this.setState({
            flag : false ,
            accountname : "",
            amount : "",
            color : '',
            selected: "gray",
            amountfocus : true,
            walletid : 0
        })

        this.selectAll(); 
    }
    else{
        alert("Please write account name.")
    } 
      }

      UpdateAccount = () =>{

       // alert(this.state.walletid); // 17 = 20
        UpdateWallet(this.state.walletid,this.state.accountname,this.state.selected);

        this.setState({
            flag : false ,
            accountname : "",
                            amount : "",
                            color : '',
                            selected: "gray",
                            amountfocus : true,
                            walletid : 0
        })

        this.selectAll();
      }

      deleteAll = () =>{
        Alert.alert(
            'Delete',
            'Delete All Wallet ?',
            [
                {
                    text: 'No', onPress: () => { },//Do nothing
                    style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        //alert("delete goes..");
                        DeleteAllWallet();
                        this.selectAll();
                        this.setState({
                            count : 0 ,
                            accountname : "",
                            amount : "",
                            color : '',
                            selected: "gray",
                            amountfocus : true,
                            walletid : 0
                            
                        })
                        

                    }
                },
            ],
            { cancelable: true }
        );      

      }

      showCatagory = () =>{
        //alert("call");
        this.setState({
            nowshow : '2', ///  all catagory
            flag : true ,
        })

        this.catagoryAll();
    }
    catagoryAll = () =>{
        db.transaction((tx) => {
            db.executeSql("SELECT * from catagory",[], function (results) {
              var len = results.rows.length;
              console.log('total records' + len);
              var aryData = [];
          
              if (len > 0) {
                  for (let i = 0; i < len; i++) {
                      let row = results.rows.item(i);
                      console.log("row : "+ JSON.stringify(row));
                      aryData.push({ID:row.id,ITEMNAME:row.name,VALUE:row.creationdate});
                  }

               this.getCountcall(aryData) ;
              }else{
                  console.log("no records found");
              }
          
             // console.log('arydata :: ' + JSON.stringify(aryData));
              this.getCall(aryData);   
          });
          });
          
          
          
          getCall = (aryData) =>{    
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            var dataSourceTemp = ds.cloneWithRows(aryData);
            this.setState({records:aryData,dataSource:dataSourceTemp});
            //alert("call");
            
          
          }

          getCountcall = (aryData) =>{
            this.setState({
                aryData : aryData,
                count : 2 
            })
        }
    }

    CatagoryRowItems = (rowData) =>{
        return (
            <Swipeout left={[
                {
                    text: 'Edit',
                    backgroundColor: '#00aced',
                    onPress: () => { this.editSingleCatagory(rowData) }
                },
                {
                    text: 'Delete',
                    backgroundColor: '#cd2029',
                    onPress: () => { this.deleteSingleCatagory(rowData.ID) }
                }
            ]} autoClose={true}>
            <View style={styles.walletContainer}>
                        <View style={styles.wallet}>
                            <Text style={styles.WaletTextLeft}>{rowData.ITEMNAME}</Text>
                        </View>
                        </View>
            </Swipeout >
        )

    }

    setCatagoryName = (val) =>{
        this.setState({
            catname : val
        })

    }

    addNewCatagory = () =>{
          
        
        if(this.state.catname!=""){
         //   alert(this.state.catname);
          Insertcatagory(this.state.catname);

          this.setState({
            nowshow : '2', /// all catagory
            flag : true ,
            catname : ''

        })

        this.catagoryAll(); 
    }
    else{
        alert("Please write catagory name.")
    } 
      }

      editSingleCatagory = (row) =>{
          this.setState({
              catid : row.ID,
            catname : row.ITEMNAME,
            nowshow : '1' , // add catagory
            catflag : false  

          })
      }

      updateSingleCatagory = () =>{
          //alert(this.state.catid);

       UpdateSingleCatagory(this.state.catid,this.state.catname) ;
       this.catagoryAll();

       this.setState({
           catid : 0,
           catflag : true,
           nowshow : '2', ///  all catagory
           flag : true ,
       })
      }

      deleteSingleCatagory = (id) =>{
      
        Alert.alert(
            'Delete',
            'Delete this catagory ?',
            [
                {
                    text: 'No', onPress: () => { },//Do nothing
                    style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        DeleteSingleCatagory(id);
                        this.catagoryAll();
                        
    
                    }
                },
            ],
            { cancelable: true }
        );
    
      
    }

    addTransectionState = () =>{

        this.setState({
            nowshow : '3', ///  add transection
           flag : true ,
        })

    }

    changeInitialAmount = (text) =>{
        this.setState({
            initialamount : text
            
        })
    }

    oneRadio = () =>{
      
       this.setState({
        incomeradiotype : true,
        expenseradiotype : false ,
        transectiontype : 'income' ,

        selectedcatagory : '',
        selectedcatagoryID : '',
        showSelectCatagoryFlag : false,
        
    })
        
    }

    twoRadio = () =>{
      //  this.catagoryAll();
        this.setState({
            incomeradiotype : false,
            expenseradiotype : true ,
            transectiontype : 'expense' ,
            //showSelectCatagoryFlag : true
            nowshow : '4' // select catagory
            
        })

        this.catagoryAll();
    }

    CatagoryPickerItems = (rowData) =>{
       // this.catagoryAll();
        return (
            
            <View style={styles.walletContainer}>
                        <View style={styles.wallet}>
                        <TouchableOpacity onPress={() => { this.SelectThisCatagory(rowData) }}>
                            <Text style={styles.WaletTextLeft}>{rowData.ITEMNAME}</Text>
                            </TouchableOpacity>
                        </View>
            </View>
           
           
        )

    }

    SelectThisCatagory = (rowData) => {
     //   alert("come");

    //console.log("id = "+rowData.ID)
        this.setState({
            selectedcatagory : rowData.ITEMNAME,
            selectedcatagoryID : rowData.ID,
            showSelectCatagoryFlag : true,
            nowshow : '3', ///  add transection
        })
    }

    WalletPickerItems = (Data) =>{
       // this.selectAll();
      
        return (
            
            <View style={styles.walletContainer}>
                        <View style={styles.wallet}>
                        <TouchableOpacity onPress={() => { this.SelectThisWallet(Data) }}>
                            <Text style={styles.WaletTextLeft}>{Data.PITEMNAME}</Text>
                        </TouchableOpacity>
                        </View>
            </View>
           
           
        )

    }

    SelectThisWallet = (Data) => {

        //console.log(rowData.ITEMNAME)
        this.setState({
            selectedwallet : Data.PITEMNAME,
            selectedwalletID : Data.PID,
            showSelectWalletFlag : true,
            nowshow : '3', ///  add transection
            thiswalletvalue : Data.PVALUE 
        })
    }

    

    selectWallet = () =>{
       // this.selectAll();

        this.setState({
            nowshow : '5', // select wallet 
           
        })

       
    }

    setRemarks = (text) => {
        this.setState({
            remarks : text 
        })
    }

    addTransection = () =>{
       // alert(this.state.chosenDate);
       // if(this.state.chosenDate=='')
      //  alert("Select a date");
      //  else{
       //   alert(this.state.thiswalletvalue);
          if(this.state.transectiontype=='income' || (this.state.transectiontype!='income' && ( parseInt(this.state.thiswalletvalue) > parseInt(this.state.initialamount)) ))
          {
            const vari = {
                initialamount : parseInt(this.state.initialamount) ,
                transectiontype : this.state.transectiontype ,
              selectedcatagoryID : parseInt(this.state.selectedcatagoryID) ,
              selectedcatagory :this.state.selectedcatagory ,
            selectedwalletID : parseInt(this.state.selectedwalletID) ,
            chosenDate : this.state.chosenDate ,
            remarks  : this.state.remarks ,
           }
        
    
          MakeTransection(vari);
          this.selectAll();
          this.setState({
    
            flag : false,
            initialamount : '' ,
            transectiontype : 'income' ,
            selectedcatagoryID :'' ,
            selectedwallet : '',
            selectedwalletID : '' ,
            incomeradiotype : true,
            expenseradiotype : false,
            selectedcatagory : '',
            chosenDate : new Date() ,
            remarks  : '' ,
            showSelectWalletFlag : false ,
            showSelectCatagoryFlag : false
    
    
          })
          }

          else{
              alert("Amount is greater than wallet amount ") ;
          }     

   // }
    }
    backStatethree = () =>{
        this.setState({
            nowshow : '3' // add transection
        })
    }

    



    render(){

     //   console.log("btc data="+this.props.data);
    //    console.log("btc updown last 24 hour ="+this.props.updown);
       
        if(this.state.flag)
        {
            return(
                
                   <Container style = {styles.container}>
                    {  // single wallet details ...
                       this.state.nowshow==='6'  && 

                       <Content>
                       <View style={{}}>
                       <TouchableOpacity onPress={() => this.backState()}>
                      <Image source={require('./Images/cancel.png')} style={{height: 24, width: 24,alignSelf : 'flex-end',margin:10}} /> 
                      </TouchableOpacity>
                      </View>
                      <View style={styles.bluebox}>
                      <Text style={styles.blueBoxText}>{this.state.selecyedWalletName}</Text>
                      </View>

                      <View style={styles.wallets}>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(Data) => this.walletTransection(Data)}
                        enableEmptySections ={true}/>  
                    </View>
                      
                       </Content>
                   }
                   {
                       this.state.nowshow==='5'  && 

                       <Content>
                       <View style={{}}>
                       <TouchableOpacity onPress={() => this.backStatethree()}>
                      <Image source={require('./Images/cancel.png')} style={{height: 24, width: 24,alignSelf : 'flex-end',margin:10}} /> 
                      </TouchableOpacity>
                      </View>
                      <View style={styles.bluebox}>
                      <Text style={styles.blueBoxText}>Select Wallet</Text>
                      </View>
                      <View>
                            <ListView
                            dataSource={this.state.dataSource0}
                            renderRow={(Data) => this.WalletPickerItems(Data)}
                            enableEmptySections ={true}/> 
                            
                        </View>
                       </Content>
                   }
                   {  // select catagory
                       
                       this.state.nowshow==='4'  && 

                       <Content>
                       <View style={{}}>
                       <TouchableOpacity onPress={() => this.backStatethree()}>
                      <Image source={require('./Images/cancel.png')} style={{height: 24, width: 24,alignSelf : 'flex-end',margin:10}} /> 
                      </TouchableOpacity>
                      </View>
                      <View style={styles.bluebox}>
                      <Text style={styles.blueBoxText}>Select Catagory</Text>
                      </View>
                      <View>
                            <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => this.CatagoryPickerItems(rowData)}
                            enableEmptySections ={true}/> 
                            
                        </View>
                      </Content>

                   }
                    { 
                    
                    // Add a transection
                    this.state.nowshow==='3'  && 
                    <Content>
                     <View style={{}}>
                     <TouchableOpacity onPress={() => this.backState()}>
                    <Image source={require('./Images/cancel.png')} style={{height: 24, width: 24,alignSelf : 'flex-end',margin:10}} /> 
                    </TouchableOpacity>
                    </View>
                    <View style={styles.bluebox}>
                    <Text style={styles.blueBoxText}>Add Transection</Text>
                    </View>
                   <View style={{marginStart:15,marginEnd:15,padding : 0}}>
                    <TextInput multiline={true} numberOfLines={2} placeholder="Select amount" placeholderTextColor="white" onChangeText={(text) => this.changeInitialAmount(text)} value={this.state.initialamount} style={{fontSize:16,color:'white'}} keyboardType={'phone-pad'}/>
                    </View>
                    <View style={{marginEnd:10,padding : 0, }}>
                    <ListItem>
                    <Left>
                    <Radio
                        color={"#f0ad4e"}
                        selectedColor={"#5cb85c"}
                        selected={this.state.incomeradiotype} onPress={this.oneRadio}
                    />
                    </Left>
                    <Right>
                    <Text style={{color:'white'}}>Income </Text>
                    </Right>
                     </ListItem>
                     <ListItem>
                    <Left>
                    <Radio
                        color={"#f0ad4e"}
                        selectedColor={"#5cb85c"}
                        selected={this.state.expenseradiotype} onPress={this.twoRadio}
                    />
                    </Left>
                    <Right>
                    <Text style={{color:'white'}}>Expense </Text>
                    </Right>
                     </ListItem>
                    </View>
                    {
                        this.state.showSelectCatagoryFlag &&
                        <View style={{marginEnd:10,padding : 0, }}>

                        <Text style={{padding:10,margin:10,alignSelf : 'flex-start',color:'white'}}>Expense Type : {this.state.selectedcatagory}</Text>

                        </View>
                        
                    }
                     <View style={{margin:10,padding : 0, }}>
                        <TouchableOpacity style={{marginStart:5}} >
                        <Button transparent warning style={{width:'100%'}} onPress={() => this.selectWallet()}>
                        {
                            this.state.showSelectWalletFlag &&
                            <Text style={{color:'white',marginStart :3}}>Wallet :  {this.state.selectedwallet} </Text>

                        }
                        {
                            !this.state.showSelectWalletFlag &&
                        <Text style={{color:'white'}}> Select wallet </Text>
                        }
                        </Button>
                        </TouchableOpacity>

                     </View>
                    <View style={{margin:10,padding : 0, }}>
                    <Item  >
                        
                    <DatePicker
                        defaultDate={new Date()}
                        minimumDate={new Date(2018, 1, 1)}
                        maximumDate={new Date(2028, 12, 31)}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select date"
                        textStyle={{ color: "white" }} style={{margin:10,padding : 0, }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this.setDate}
                     />
                    </Item>
                     </View>
                     <View style={{marginStart:15,marginEnd:15,padding : 0}}>
                    <TextInput multiline={true} numberOfLines={2} placeholder="any description ?" placeholderTextColor="white" onChangeText={(text) => this.setRemarks(text)} value={this.state.remarks} style={{color:'white'}} />
                    </View>
                     <View style={{margin:10,padding : 0, }}>
                     <Button style={{width:'100%',justifyContent:'center'}} onPress={this.addTransection}>
                        {/* <Icon name="arrow-forward" /> */}
                        <Text style={{alignItems:'center',color : 'white'}}> Submit </Text>
                    </Button>

                     </View>

                     
                   
                    </Content>
                }
                    { 
                    
                        // show catagory
                        this.state.nowshow==='2'  && 
                        <Content>
                         <View style={{flexDirection : 'row',justifyContent: 'space-between',}}>
                         <TouchableOpacity onPress={() => this.nowShowFlag()}>
                        <Image source={require('./Images/goback.png')} style={{height: 24, width: 24,alignSelf : 'flex-start',margin:10}} /> 
                        </TouchableOpacity>
                         <TouchableOpacity onPress={() => this.backState()}>
                        <Image source={require('./Images/cancel.png')} style={{height: 24, width: 24,alignSelf : 'flex-end',margin:10}} /> 
                        </TouchableOpacity>
                        </View>
                        <View style={styles.bluebox}>
                        <Text style={styles.blueBoxText}>All Catagories</Text>
                        </View>
                        <View style={styles.wallets}>

                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => this.CatagoryRowItems(rowData)}
                            enableEmptySections ={true}/>  
                        </View>
                        </Content>
                    }
                    {  // add catagory
                        this.state.nowshow==='1'  && 
                        <Content>
                         <View style={{flexDirection : 'row',justifyContent: 'space-between',}}>
                         <TouchableOpacity onPress={() => this.showCatagory()}>
                        <Image source={require('./Images/showcatagory.png')} style={{height: 24, width: 24,alignSelf : 'flex-start',margin:10}} /> 
                        </TouchableOpacity>
                         <TouchableOpacity onPress={() => this.backState()}>
                        <Image source={require('./Images/cancel.png')} style={{height: 24, width: 24,alignSelf : 'flex-end',margin:10}} /> 
                        </TouchableOpacity>
                        </View>
                        <Form>
                        <Item  floatingLabel  style={{marginEnd:15,padding : 0}}>
                        <Label style={styles.label}>Catagory name</Label>
                        <Input style={{color:'white'}}  onChangeText={(val)=>this.setCatagoryName(val)}  value = {this.state.catname}/>
                        </Item>
                        {
                            this.state.catflag && 
                        <Item style={{padding:5,borderBottomWidth : 0,paddingTop:20,marginEnd : 10}}>
                        <Button style={{width:'100%',justifyContent : 'center'}} block success onPress={this.addNewCatagory}>
                        <Text style={styles.label}>Add catagory</Text>
                        </Button>
                        </Item>
                        }
                        {
                            !this.state.catflag && 
                        <Item style={{padding:5,borderBottomWidth : 0,paddingTop:20,marginEnd : 10}}>
                        <Button style={{width:'100%',justifyContent : 'center'}} block success onPress={this.updateSingleCatagory}>
                        <Text style={styles.label}>Update catagory</Text>
                        </Button>
                        </Item>
                        }
                       
                    </Form>
                        </Content>
                    }
                    {
                        this.state.nowshow==='0'  && 
                        <Content>
                        <View >
                         <TouchableOpacity onPress={() => this.backState()}>
                        <Image source={require('./Images/cancel.png')} style={{height: 24, width: 24,alignSelf : 'flex-end',margin:10}} /> 
                        </TouchableOpacity>
                        </View>
                    <Form>
                        <Item  floatingLabel  style={{marginEnd:15,padding : 0}}>
                        <Label style={styles.label}>Account name</Label>
                        <Input style={{color:'white'}}  onChangeText={(val)=>this.setName(val)}  value = {this.state.accountname}/>
                        </Item>
                        { this.state.amountfocus  &&
                        <Item floatingLabel style={{marginEnd:15}}>
                        <Label style={styles.label}>Initial amount</Label>
                        <Input style={{color:'white'}} keyboardType={'phone-pad'} onChangeText={(val)=>this.setAmount(val)} value = {this.state.amount}/>
                        </Item>
                        }
                        <Item style={{marginEnd:15,paddingTop:5}}>
                        <Label style={styles.label}>Select color</Label>
                        
                        <Picker 
                        textStyle={{fontSize: 12,color:'yellow'}}                                                                       
                        itemStyle={{backgroundColor: "#d3d3d3",marginLeft: 0,paddingLeft: 10, fontSize : 11}}
                        itemTextStyle={{ fontSize : 10 }} 
                        style={{ width: undefined ,color:'white'}}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                        >

                        <Picker.Item style={{fontSize:10}}  label="" value="gray" />
                        <Picker.Item  label="Gray" value="gray" />
                        <Picker.Item label="Green" value="green" />
                        <Picker.Item label="Yellow" value="yellow" />
                        <Picker.Item label="Red" value="red" />
                        <Picker.Item label="Blue" value="blue" />
                        <Picker.Item label="Purple" value="purple" />
                        <Picker.Item label="White" value="white" />
                        </Picker>
                        </Item>
                       
                    </Form>
                    { this.state.amountfocus  &&
                    <Item style={{padding:10,borderBottomWidth : 0,paddingTop:20}}>
                        <Button style={{width:'100%',justifyContent : 'center'}} block success onPress={this.addNewAccount}>
                        <Text style={styles.label}>Add Wallet</Text>
                    </Button>
                     </Item>
                    }
                     { !this.state.amountfocus  &&
                    <Item style={{padding:10,borderBottomWidth : 0,paddingTop:20}}>
                        <Button style={{width:'100%',justifyContent : 'center'}} block success onPress={this.UpdateAccount}>
                        <Text style={styles.label}>Update Wallet</Text>
                    </Button>
                     </Item>
                    }
                    </Content>
                    }
                    
                </Container>
                
            )
        }
        else {
        return(
            <ScrollView style = {styles.container}>
               <View >
               
                <View style = {styles.redbox} >
            
                   <View style={{justifyContent :'center',alignItems :'center'}}>
                       <Text style={styles.headBigFont}>$ 16,505,160</Text>
                       <Text style={styles.headSmallFont}>Total Assets</Text>
                    </View> 
                    
                </View>
                <View style = {styles.bluebox} >
                    <Text style={styles.blueBoxText}>Wallets</Text>
                    
                    <TouchableOpacity  style={{flexDirection :'row', justifyContent: 'flex-end',}}>
                    <TouchableOpacity onPress={()=>this.nowShowFlag()}>
                     {/* <Image source={require('./Images/addcatagory.png')} style={{width:10,height:10,padding : 10,marginEnd : 25,marginTop :5,marginBottom : 5}} /> */}
                     <Text style={{padding : 10,marginBottom : 15,marginEnd : 10,color:'white',fontSize:11}}>Add catagory</Text>
                     </TouchableOpacity>
                     {
                     this.state.count == 2 &&
                     <TouchableOpacity onPress={()=>this.deleteAll()} style={{flexDirection :'row', justifyContent: 'flex-end',}}>
                    <Image source={require('./Images/deleteall.png')} style={{width:10,height:10,padding : 10,marginEnd : 25,marginTop :5,marginBottom : 5}} />
                    </TouchableOpacity>
                     }
                    </TouchableOpacity>
                    
                </View>

                <View style={styles.wallets}>

                <ListView
                    dataSource={this.state.dataSource0}
                    renderRow={(Data) => this.listRowItems(Data)}
                    enableEmptySections ={true}/>  
                </View>
               
               <View style = {styles.addbox} >
                <TouchableOpacity onPress={()=>this.changeState()}>
                    <Text style={styles.addwallet}></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.changeState()}>
                    <Text style={styles.addwallet}>Add Wallet</Text>
                    </TouchableOpacity>
                    {/* { */}
                     {/* this.state.count == 2 && */}
                    <TouchableOpacity onPress={()=>this.addTransectionState()}>
                   <Image source={require('./Images/addtrans.png')} style={{width:25,height:25,padding:5,margin:5}}/>
                    </TouchableOpacity>
                    {/* } */}
                </View>
                <View style={styles.chartBox}>

                  <Image source={require('./Images/pie.png')} style={{width:190,height:190,alignSelf:'center'}}/>

                </View>
                
                </View>

                
            </ScrollView>
        )
    }
    }

}

function mapStateToProps(state){
    return({
       // testname : state.browseReducer.testname,
       data : state.pickerBtcReducer.btcvalue,
       updown : state.pickerBtcReducer.updown,
       

    })
}

function mapDispatchToProps(dispatch){
    return({
        pickerbtcAction : ()=>{
           dispatch(pickerbtcAction())
        },

        pickerbtcActionUpDown : ()=>{
            dispatch(pickerbtcActionUpDown())
        }
    })

    
}


export default connect(mapStateToProps,mapDispatchToProps)(WalletHome) ;

const BORDER_COLOR = '#F4ECEC';
const TITLE = '#ac9b3c';
const styles = StyleSheet.create ({
    container: {
        flex:1,
       flexDirection: 'column',
    //    justifyContent: 'center',
    //    alignItems: 'center',
       backgroundColor: '#1f2630',
      // height: 750
    },
    redbox: {
      // width: 100,
       height: 120,
       backgroundColor: '#1f2630',
       marginBottom  : 10,
       justifyContent : 'center',
       alignItems : 'center'
    },
    redBoxHead :{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding :5,
        margin : 10
    } ,

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
       backgroundColor: '#21324c',
       borderWidth : 1,
       borderColor : '#21324c',
       borderTopStartRadius : 20,
       borderTopEndRadius : 20
    },
    blueBoxText : {
        paddingTop : 15,
        paddingLeft : 15,
        fontSize : 11,
        color :'white'
    },

    walletContainer : {

        backgroundColor : '#1d2c42',
       // height : 50,
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
        margin : 5,
        color : 'white',
        //width : 200,
    },
    WaletTextLeftDuplicate :{
        padding : 10,
        margin : 5,
//color : 'white',
        //width : 200,
    },
    WaletTextRight : {
        //alignSelf : 'flex-end',
    //    justifyContent : 'flex-end',
    //    alignItems : 'flex-end' ,
        paddingTop : 10,
        paddingEnd : 20,
        // margin : 5,
       // marginEnd : 10,
        color : 'white',
      //  fontSize : 12
    },
    WaletNextTextRight : {
        alignSelf : 'flex-end',
        marginEnd : 5,
        marginTop : -10,
        margin : 5 
    },
    WaletNextTextRightText : {
        fontSize :9,
        marginEnd : 28,
        color: 'gray',
        marginTop : -15
    },
    addbox: {
        //marginTop : 1,
        height: 40,
       backgroundColor: '#21324c',
       borderWidth : 1,
       borderColor : '#21324c',

       flexDirection: 'row',
       justifyContent: 'space-between',
       
    },
    addwallet : {
        color:'white',
        padding : 10, 
        alignSelf : 'center'
        // margin : 10
    },

   chartBox : {
    padding : 30,
    //margin : 30
   },
   label:{

    fontSize : 12 ,
    //color: 'lightgray'
   }
    
 })