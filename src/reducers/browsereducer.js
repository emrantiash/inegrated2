import actionType from '../constant/constant' ;

const INITIAL_STATE = {

        testname : 'tiash',
        load : 'load',
        bdata : [],
        network  : 'have'
}

export default (state=INITIAL_STATE,action)=>{

    switch(action.type){

        case  actionType.BROWSE_DATA :  
            return({
                ...state,
                network  : 'have',
                load : 'loading'
            
                });

        case actionType.BROWSE_OK :
            return({
                ...state,
                load : 'load',
                network  : 'have',
                bdata : action.payload ,
               
            });
        case actionType.BROWSE_ERROR : 
            return({
                ...state ,
                //load : 'load',
                network : 'Please Check Internet'
            })

        default :
            return state ;

    }

}