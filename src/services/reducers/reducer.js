import { ADD_TO_CART,INCREMENT,DECREMENT,REMOVE_TO_CART,TOTAL_PRICE,CLEAR_CART } from "../constants";

const initialState= {
    cardData:[],
}

export function  cardItem(state=initialState,action){

    switch(action.type){

    case ADD_TO_CART:
        const item = state.cardData.find(
            product => product.product_id === action.data.product_id,
          )
          if (item) {
            return {
              ...state,
              cardData: state.cardData.map(item => item.product_id === action.data.product_id 
                ? {
                  ...item,
                  quantity: item.quantity + action.data.quantity,
                  totalprice: (action.data.Price * (item.quantity+action.data.quantity)),
                }
                : item
              ),
            }
        }
          else{
            return {
              ...state,
              cardData: [...state.cardData, action.data],
              totalPrice: (action.data.Price * action.data.quantity),
            }}
          
        case INCREMENT:
            const items = state.cardData.find(
                product => product.product_id === action.data.product_id,
                )
              if (items) {
                return {
                  ...state,
                  cardData: state.cardData.map(item => item.product_id === action.data.product_id
                    ? {
                      ...item,
                      quantity: item.quantity + 1,
                      totalprice: (item.Price * (item.quantity+1)),
                    }
                    : item
                  ),
                }
            };
            return{
              ...state,
            cardData: [...state.cardData, action.data,],
            totalPrice: (action.data.Price * action.data.quantity),

            }
       
        case DECREMENT:
          if(action.data.quantity>1){
            const itemdec = state.cardData.find(
                product => product.product_id === action.data.product_id,
                );
              if (itemdec) {
                return {
                  ...state,
                  cardData: state.cardData.map(item => item.product_id === action.data.product_id
                    ? {
                      ...itemdec,
                      quantity: item.quantity - 1,
                      totalprice: (item.Price * (item.quantity-1)),
                    }
                    : item
                  ),
                }
            };
            return{
              ...state,
              cardData: [...state.cardData, action.data],
              totalPrice: (action.data.Price * action.data.quantity),
            }
          }

    case TOTAL_PRICE:
        return{
          ...state,
          discount: [action.data],   
    }

    case REMOVE_TO_CART:
        return{
            ...state,
        cardData: state.cardData.filter(item => item.product_id !== action.data.item.product_id)      
    }

    case CLEAR_CART: return initialState;

    default:
        return state
}
}