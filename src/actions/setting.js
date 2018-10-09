import actionType from '../constant/constant' ;


export function changeThisLanguage(val){
    return dispatch=>{

        dispatch({type:actionType.THIS_LANGUAGE,payload:val});
       
    }
}

