import React, { useEffect, useState } from 'react';
import './ShopItem.styles.scss';
import { useMutation, gql,  } from '@apollo/client';
import {GET_PRODUCTS_FROM_CART} from '../cart/Cart.component'
import Button from '../UI/Button/Button.component';



export const ADD_PRODUCT_TO_CART = gql`
  mutation addProductToCart(
      $productId: String!,
      $userId: String!
      $price: Int!
      )
   {
    createCart(
        cartInput: 
    {
        productId: $productId,
        userId: $userId,
        price: $price
    })

    {
        user
    }
    }
  
`;


export default function ShopItem({item}) {

    const [userId, setUserId] = useState("")
    const {_id, imageUrl, name, price} = item;
    
    useEffect(() => {
        const user =localStorage.getItem("auth-token")
        setUserId(JSON.parse(user))

    }, []);

    const [addToCart] = useMutation( ADD_PRODUCT_TO_CART,
        {
            variables: {
                userId: userId,
                price: price,
            },
            refetchQueries: [{query: GET_PRODUCTS_FROM_CART, variables:{userId: userId}}]
        
        });
        
    console.log(item)
    return(
        <div className="collection-item">
        <div className="image"  style={{backgroundImage: `url(${imageUrl})`}} />
            <div className="collection-footer">
                <span className="name"> {name} </span>
                <span className="price"> {price} </span>
            </div>
            <Button onClick={() => addToCart({ variables: { productId: _id } })} inverted>Add to cart</Button>

        </div>

    );
}