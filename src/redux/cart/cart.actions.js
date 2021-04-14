
const addItem = item => ({
    type: 'ADD_ITEM',
    payload: item
})


const clearItemFromCart = item => ({
    type: "REMOVE_ITEM_FROM_CART",
    payload: item
})

const removeItem = item => ({
    type: "REMOVE_ITEM",
    payload: item
})

const cartActions = {addItem, clearItemFromCart, removeItem }


export default cartActions;
