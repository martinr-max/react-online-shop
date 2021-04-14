import React from 'react';
import './cartItem.styles.scss';

export default function CartItem({imageUrl, name, quantity, price}) {

    return(
        <div className="cart-item">
            <img src={imageUrl} alt="productImg"/>
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price"> {quantity} x ${price} </span>
            </div>

        </div>
    );
}