import action_consts from "./action_consts"
export const ADD = (item) => {
    return{
        type: action_consts.addCart,
        payload: item
    }
}

// remove item
export const DLT = (id) => {
    return{
        type: action_consts.removeItem,
        payload: id
    }
}

export const REMOVE = (item) => {
    return{
        type: action_consts.removeItemQnty,
        payload: item
    }
}