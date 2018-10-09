import actionType from '../constant/constant' ;

const INITIAL_STATE = {

    btcvalue : 0,
    updown : 0 
}

export default (state=INITIAL_STATE,action)=>{

    switch(action.type){

        case actionType.THIS_BTC : 
            return({
                ...state ,
                btcvalue : action.payload
            })

            case actionType.THIS_BTC_UP_DOWN : 
            return({
                ...state ,
                updown : action.payload
            })

        default :
            return state ;

    }

}