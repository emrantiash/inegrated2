import actionType from '../constant/constant' ;


export function Result(){
    return {
       type : actionType.BROWSE_DATA
    }
}

export function onSuccess(data){
    //console.log("is = "+data);
    return {
        type : actionType.BROWSE_OK,
        payload : data 
    }
}

export function showError(){  
//    alert("come..");
    return {
        type : actionType.BROWSE_ERROR
    }
}

export function browseAction(){
    return(dispatch)=>{
        dispatch(Result());
        fetch('https://quotes.instaforex.com/api/quotesTick?m=json')
        .then(res => res.json())
        .then(data => {
          
         
       // console.log(data);
        dispatch(onSuccess(data)) ;
      //   dispatch(onSuccess(data.data)) ;
        })
        .catch(dispatch(showError()))
    }
}