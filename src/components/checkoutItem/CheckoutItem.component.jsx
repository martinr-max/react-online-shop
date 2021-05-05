import React from 'react';
import { useMutation, gql } from '@apollo/react-hooks';
import './checkoutItem.styles.scss';
import { ADD_PRODUCT_TO_CART } from '../shopItem/ShopItem.component';
import { GET_PRODUCTS_FROM_CART } from '../cart/Cart.component';

export const REMOVE_PRODUCT_FROM_CART = gql`
  mutation removeProductToCart(
      $productId: String!,
      $userId: String!
      $price: Int!
      )
   {
    removeProduct(
        cartInput: 
    {
        productId: $productId,
        userId: $userId,
        price: $price
    })

    
    }
  
`;


export default function CheckoutItem({item, userId}) {

    const {productId, imageUrl, name, qty, total, price} = item;

    const [deleteProduct] = useMutation( REMOVE_PRODUCT_FROM_CART,
        {
            variables: {
                userId: userId,
                price: price,
            },
           
            refetchQueries: [{query: GET_PRODUCTS_FROM_CART, variables:{userId: userId}}]
        });


    
    const [addQuentity] = useMutation( ADD_PRODUCT_TO_CART,
        {
            variables: {
                userId: userId,
                price: price,
            },
            refetchQueries: [{query: GET_PRODUCTS_FROM_CART, variables:{userId: userId}}]
        });
    
    
    return(
        <div  className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt=""/>
            </div>
            <span className="name"> {name} </span>
            <span className="quantity"> 
            <div className="arrow" onClick={() => deleteProduct({ variables: { productId } })}  > &#10094;</div>
            <span className="value">{qty}</span>
            <div className="arrow" onClick={() => addQuentity({ variables: { productId } })}> &#10095;</div>
             </span>

            
            <span className="price"> {total} </span>
            <span className="remove-button" onClick={() => deleteProduct({ variables: { productId } })}> X </span>


        </div>
    );
}