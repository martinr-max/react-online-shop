import React from 'react';
import Button from '../UI/Button/Button.component';
import './Cart.styles.scss';


export default function CartDropdown() {
    return(
        <div className="cart-dropdown">
            <div className="cart-items"/>
            <Button className="custom-button cart-button"> GO TO CHECKOUT </Button>
        </div>
    );
}