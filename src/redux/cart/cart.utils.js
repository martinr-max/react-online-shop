export const addItemToCart = (cartItems, itemToCard) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === itemToCard.id
    )
    if(existingCartItem) {
        return cartItems.map(item => {
            return item.id === itemToCard.id
            ? {...item, quantity: item.quantity + 1}
            : item
        })
    }

    return [...cartItems, {...itemToCard, quantity: 1}]
}

export const removeItemFromCheckout = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
   
    return cartItems.map(item => {
        return item.id === cartItemToRemove.id
            ? {...item, quantity: item.quantity - 1}
            : item
        });
    
}