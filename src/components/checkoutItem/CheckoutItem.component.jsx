import React from 'react';
import './checkoutItem.styles.scss';
import { useDispatch } from 'react-redux';
import cartActions from '../../redux/cart/cart.actions';


export default function CheckoutItem({item}) {

    const {id, imageUrl, name, quantity, price} = item;
    const dispatch = useDispatch();

    
    return(
        <div key={id} className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt=""/>
            </div>
            <span className="name"> {name} </span>
            <span className="quantity"> 
            <div className="arrow" onClick={(e) => dispatch(cartActions.removeItem(item))}> &#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={(e) => dispatch(cartActions.addItem(item))}> &#10095;</div>
             </span>

            
            <span className="price"> {price} </span>
            <span className="remove-button" onClick={(e) => dispatch(cartActions.clearItemFromCart(item))}> X </span>


        </div>
    );
}