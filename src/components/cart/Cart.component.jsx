import React from 'react';
import Button from '../UI/Button/Button.component';
import './Cart.styles.scss';
import CartItem from '../cart-item/CartItem.component';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';


export default function CartDropdown({cartDropdownToggle}) {
    const selectedItem = useSelector(state => state.cart.cartItems)
    const history = useHistory();

    const checkoutButton = () => {
        history.push('/checkout');
        cartDropdownToggle();
    }

    return(
        <div className="cart-dropdown">
            <div className="cart-items"/>
            {selectedItem.length !== 0 ?
            selectedItem.map(item => {
                return <CartItem
                    key={item.id} 
                    name={item.name}
                     imageUrl={item.imageUrl}
                     price={item.price}
                     quantity={item.quantity}
                      />
            }): <p className="empty-message">Your cart is empty</p>
        }
            <Button onClick={(e) => checkoutButton()} className="custom-button cart-button"> GO TO CHECKOUT </Button>
        </div>
    );
}