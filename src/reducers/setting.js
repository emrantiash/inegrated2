import actionType from '../constant/constant' ;

const INITIAL_STATE = {

    currentLanguage : "ENGLISH"
}

export default (state=INITIAL_STATE,action)=>{

    switch(action.type){

        case actionType.THIS_LANGUAGE : 
            return({
                ...state ,
                currentLanguage : action.payload
            })

        default :
            return state ;

    }

}