import React from 'react';
import './cartItem.styles.scss';

export default function CartItem({item}) {

    const {imageUrl, name, qty, price} = item

    return(
        <div className="cart-item">
            <img src={imageUrl} alt="productImg"/>
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price"> {qty} x ${price} </span>
            </div>

        </div>
    );
}