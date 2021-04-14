import { addItemToCart, removeItemFromCheckout } from "./cart.utils";

const INITIAL_STATE = {
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }

        case "REMOVE_ITEM_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)

            }
        case "REMOVE_ITEM":
            return {
                ...state,
                cartItems: removeItemFromCheckout(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;