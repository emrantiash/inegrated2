import React, { Component } from 'react';
var SQLite = require('react-native-sqlite-storage')

//var db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'});
//var db = SQLite.openDatabase({name : 'test.db', createFromLocation : "~data/mine.sqlite"});
//let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~data/mine.db", location: 'default'}, this.openCB, this.errorCB);
let db = SQLite.openDatabase({name: 'wallet.db', createFromLocation : "~mine.db", location: 'Library'}, this.openCB, this.errorCB);
var TAG = "App : ";


export const CrateTable = () =>{

    //export const insertNewAccount = newaccount => new Promise((resolve,reject)=>{

        db.transaction((tx) => {
         //   alert("call");
        //tx.executeSql('DROP TABLE IF EXISTS account');
            tx.executeSql('CREATE TABLE IF NOT EXISTS `account` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `accountname` TEXT NOT NULL, `initialvalue` NUMERIC NOT NULL, `color` TEXT NOT NULL, `creationdate` TEXT NOT NULL, `status` INTEGER NOT NULL )');
        // tx.executeSql('INSERT INTO account(id,accountname,initialvalue,color,creationdate,status) values(?,?,?,?,?,?)',[2,'Account 02',1000,'yellow','2015-05-05',1]);
      // tx.executeSql('DROP TABLE IF EXISTS catagory');
        tx.executeSql('CREATE TABLE IF NOT EXISTS `catagory` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `creationdate` TEXT NOT NULL, `status` INTEGER NOT NULL )');
        //tx.executeSql('INSERT INTO catagory(id,name,creationdate,status) values(?,?,?,?)',[1,'Home Rent','2015-05-05',1]);
       // tx.executeSql('DROP TABLE IF EXISTS transection');
       tx.executeSql('CREATE TABLE IF NOT EXISTS `transection` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `accountid` INTEGER NOT NULL,`current` NUMERIC NOT NULL,`request` NUMBER NOT NULL,`previous` NUMBER NOT NULL ,`type` INTEGER NOT NULL,`expense` TEXT NOT NULL,`creationdate` TEXT NOT NULL,`remarks` TEXT  ,`status` INTEGER NOT NULL )');
               
         })


}

export const InsertAccount = (name,val,color)=>{
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
 
     // alert(date + '-' + month + '-' + year);

     cdate = year + '-' + month + '-' + date ;
     val = parseInt(val);

    db.transaction((tx) => {
        
      //  console.log('INSERT INTO account(accountname,initialvalue,color,creationdate,status) values(?,?,?,?,?)',[name,val,color,cdate,1]);
        tx.executeSql('INSERT INTO account(accountname,initialvalue,color,creationdate,status) values(?,?,?,?,?)',[name,val,color,cdate,1]);
        db.executeSql("SELECT MAX(id) as id  from account",[], function (results) {
            var len = results.rows.length;
         
                     row = results.rows.item(0).id;
                    console.log("max acc" + row ) ;
                    
                    this.addTransection(row,val,cdate)     
        
                   
        });

       
              
        })

}

addTransection = (row,val,cdate) =>{
    console.log("max tra"+ row );

    let rem = "initial balance";
    // console.log("INSERT INTO transection(accountid,current,request,previous,type,creationdate,status) values[?,?,?,?,?,?,?]",[row,val,0,0,1,cdate,1]) ;
     db.executeSql('INSERT INTO transection(accountid,current,request,previous,type,expense,creationdate,remarks,status) values(?,?,?,?,?,?,?,?,?)',[row,val,0,0,1,0,cdate,rem,1]);          

    db.executeSql("SELECT MAX(id) as id  from transection",[], function (results) {
        var len = results.rows.length;
     
                let row0 = results.rows.item(0).id;
          
              console.log("max trans" + row0 ) 
    });

}

export const EditWallet = (id)=>{
    db.transaction((tx) => {
    tx.executeSql('SELECT  * from account where id = ? ',[id]);
})
   }

export const UpdateWallet = (id,name,color)=>{
    db.transaction((tx) => {
        console.log('UPDATE  account SET accountname = ?,color = ? where id = ? ',[name,color,id]);
        tx.executeSql('UPDATE  account SET accountname = ?,color = ? where id = ?',[name,color,id]);
})
   }

export const DeleteAllWallet = () =>{

    db.transaction((tx) => {
        
       // console.log('DELETE from account',[]);
        tx.executeSql('DELETE from account',[]);
        
              
        })
}


export const DeleteSingleWallet = (id)=>{
   // alert(id);
    db.transaction((tx) => {
    tx.executeSql('DELETE from account where id = ? ',[id]);
})
   }

   export const Insertcatagory = (name)=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    cdate = year + '-' + month + '-' + date ;
    

    db.transaction((tx) => {
        
        //console.log('INSERT INTO account(accountname,initialvalue,color,creationdate,status) values(?,?,?,?,?)',[name,val,color,cdate,1]);
        tx.executeSql('INSERT INTO catagory(name,creationdate,status) values(?,?,?)',[name,cdate,1]);
              
        })

}

export const DeleteSingleCatagory = (id)=>{
    db.transaction((tx) => {
    tx.executeSql('DELETE from catagory where id = ? ',[id]);
})
   }

export const UpdateSingleCatagory = (id,name) =>{

    db.transaction((tx)=>{
        tx.executeSql('UPDATE catagory SET name = ? WHERE id = ? ',[name,id]);
    })

}

export const  MakeTransection = (variable) =>{
    var expensetype = 0 ;var current ;

    var date = variable.chosenDate.getDate();
    var month = variable.chosenDate.getMonth() + 1;
    var year = variable.chosenDate.getFullYear();
    cdate = year + '-' + month + '-' + date ;

    var walletid = variable.selectedwalletID ;
    var type = variable.transectiontype ;
    var rem = variable.remarks ;
    if(type=='income')
    {
        type = 1 ;
        expensetype = expensetype ;
        
    }
        
    else 
    {
        type =2 ;
       // expensetype = variable.selectedcatagoryID ;
        expensetype = variable.selectedcatagory ;

    }

   // alert(type);

        db.executeSql('SELECT current as curr from transection WHERE id =(SELECT MAX(id) from transection WHERE accountid = ? ) ',[walletid], function (results) {
        
                    let previous  = results.rows.item(0).curr;
                    let request = variable.initialamount ;
                    //if(parseInt(previous)>parse)
                   // alert(type);
                    if(type==1)
                      current  = previous + request;
                     else
                     {
                       // if(previous>request)
                        current  = previous - request ;
                       // else
                       // curre
                     }
                      
              
               //   console.log("type="+type);
                //  console.log("current="+current);
                //  console.log("wallet="+walletid) ;
                if(type==1 || (type==2 && previous > request))
                {
                 db.executeSql('INSERT INTO transection(accountid,current,request,previous,type,expense,creationdate,remarks,status) values(?,?,?,?,?,?,?,?,?)',[walletid,current,request,previous,type,expensetype,cdate,rem,1]); 
                 console.log("UPDATE account SET initialvalue = ? WHERE id = ? ',[current,walletid]");
                 db.executeSql('UPDATE account SET initialvalue = ? WHERE id = ? ',[current,walletid]);

                }
                
               // alert(current);
        });
    

   //alert(variable.selectedcatagoryID);

}