import React from 'react';
import {ReactComponent as ShoppingBagLogo} from '../../assets/shopping-bag.svg';
import './shopping-bag.styles.scss';
import { useSelector } from 'react-redux';

export default function ShoppingBag({cartDropdownToggle}) {


    const itemNumber = useSelector(state => state.cart.cartItems);
    let reducedQuantity = itemNumber.reduce((accumulatedQuantity, cartItem) =>
     accumulatedQuantity + cartItem.quantity, 0);

    return(
        <div className="cart-icon" onClick={(e) => cartDropdownToggle()}>
            <ShoppingBagLogo className="shopping-icon" />
            <span className="item-count"> {reducedQuantity} </span>
        </div>
    );

}