import actionType from '../constant/constant' ;

export function onSuccess(data){
    //console.log("is = "+data);
    return {
        type : actionType.THIS_BTC,
        payload : data 
    }
}

export function onSuccessUpDown(data){
    //console.log("is = "+data);
    return {
        type : actionType.THIS_BTC_UP_DOWN,
        payload : data 
    }
}

export function showError(){  
//    alert("come..");
    return {
        type : actionType.BROWSE_ERROR
    }
}

export function pickerbtcAction(){
    return(dispatch)=>{
       // dispatch(Result());
        fetch('https://api.coinmarketcap.com/v2/ticker/1/')
        .then(res => res.json())
        .then(data => {
          
         
        console.log(data.data);
        dispatch(onSuccess(data.data.quotes.USD.price)) ;
      //   dispatch(onSuccess(data.data)) ;
        })
        // .catch(dispatch(showError()))
    }
}

export function pickerbtcActionUpDown(){
    return(dispatch)=>{
       // dispatch(Result());
        fetch('https://api.coinmarketcap.com/v2/ticker/1/')
        .then(res => res.json())
        .then(data => {
          
         
        console.log(data.data);
        dispatch(onSuccessUpDown(data.data.quotes.USD.percent_change_24h)) ;
       // dispatch(onSuccessUpDown(-0.9)) ;
      //   dispatch(onSuccess(data.data)) ;
        })
        // .catch(dispatch(showError()))
    }
}