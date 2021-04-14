import React from 'react';
import './Checkout.styles.scss';
import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkoutItem/CheckoutItem.component';


export default function CheckoutPage() {

    const cartItems = useSelector(state => state.cart.cartItems);

    const totalPrice = cartItems.reduce((accumulatedQuantity, cartItem) =>
    accumulatedQuantity + cartItem.quantity * cartItem.price, 0);
    return(
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
           {cartItems.map(item => {
               return <CheckoutItem key={item.id} item={item} />
           })}
           <div>
               <span className="total"> {totalPrice} </span>
           </div>
        </div>
        
    );
}