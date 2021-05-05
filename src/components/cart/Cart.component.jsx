import React, { useEffect, useState } from 'react';
import Button from '../UI/Button/Button.component';
import './Cart.styles.scss';
import { useHistory } from 'react-router';
import { useQuery, gql, client } from '@apollo/client';
import CartItem from '../cart-item/CartItem.component';


export const GET_PRODUCTS_FROM_CART = gql`
  query getProductsFromCart($userId: String!) {
    getCart(userId: $userId) {
        
        subTotal
        products {
         productId
         name
         imageUrl
         price
         qty
         total
     }
    }
  }
`;



export default function CartDropdown({cartDropdownToggle}) {
    const history = useHistory();

    const checkoutButton = () => {
        history.push('/checkout');
        cartDropdownToggle();
    }
    const [userId, setUserId] = useState("");

    
    useEffect(() => {
        const user =localStorage.getItem("auth-token")
        setUserId(JSON.parse(user))

    }, [userId]);

    const { loading, error, data } = useQuery(GET_PRODUCTS_FROM_CART, {
        variables: {
             userId
        }
    })


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

   

   


    return(
        <div className="cart-dropdown">
            <div className="cart-items"/>
            {!data ?
           <p className="empty-message">Your cart is empty</p>:
           data.getCart.products.map(item => {
               return  <CartItem item={item} />
           })
           }
            <Button onClick={(e) => {e.preventDefault() 
                checkoutButton()}} className="custom-button cart-button"> GO TO CHECKOUT </Button>
        </div>
    );
}