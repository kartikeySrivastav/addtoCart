import action_consts from "../actions/action_consts";
const INIT_STATE = {
    carts: []
}

export const cartreducer = (state=INIT_STATE, action)=>{
    switch(action.type){
        case action_consts.addCart :
            const ItemIndex = state.carts.findIndex((item)=> item.id === action.payload.id);
            if(ItemIndex >= 0){
                state.carts[ItemIndex].qnty += 1; 
            }else{
                const temp = {...action.payload, qnty:1};
                return{
                    ...state,
                    carts: [...state.carts, temp]
                }
            }
        //    return{
        //         ...state,
        //         carts:[...state.carts, action.payload]
        //     }

        case action_consts.removeItem:
            const data = state.carts.filter((el)=>el.id !== action.payload);
            return{
               ...state,
               carts:data
            }    

        case action_consts.removeItemQnty:
            const ItemIndex_dec = state.carts.findIndex((item)=> item.id === action.payload.id);
            if(state.carts[ItemIndex_dec].qnty >= 1){
                const delItem = state.carts[ItemIndex_dec].qnty -= 1;
                //console.log(...state.carts,delItem);
                return{
                    ...state,
                    carts:[...state.carts]
                }
            }else if(state.carts[ItemIndex_dec].qnty === 1){
                const data = state.carts.filter((el)=>el.id !== action.payload);
                return{
                    ...state,
                    carts:data
                 }    
            }
         
        default:
            return state;
    }
}