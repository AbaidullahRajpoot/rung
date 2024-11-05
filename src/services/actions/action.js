import { ADD_TO_CART,INCREMENT,DECREMENT,REMOVE_TO_CART,TOTAL_PRICE,CLEAR_CART } from "../constants"

export const addToCart = (data) =>{
    
    return {
        type:ADD_TO_CART,
        data:data
    }
}
export const Incre = (data) =>{

    return {
        type:INCREMENT,
        data:data
    }
}
export const Decre = (data) =>{

    return {
        type:DECREMENT,
        data:data
    }
}
export const Discount = (data) =>{

    return {
        type:TOTAL_PRICE,
        data:data
    }
}

export const removeToCart = (data) =>{

    return {
        type:REMOVE_TO_CART,
        data:data
    }
}

export const clearCart = () => ({
    type: CLEAR_CART,
});