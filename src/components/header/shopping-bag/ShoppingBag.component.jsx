import React from 'react';
import {ReactComponent as ShoppingBagLogo} from '../../assets/shopping-bag.svg';
import './shopping-bag.styles.scss';

export default function ShoppingBag({cartDropdownToggle}) {

    return(
        <div className="cart-icon" onClick={(e) => cartDropdownToggle()}>
            <ShoppingBagLogo className="shopping-icon" />
            <span className="item-count">0</span>
        </div>
    );

}