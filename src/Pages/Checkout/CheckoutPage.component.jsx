import React, { useEffect, useState } from 'react';
import {useQuery} from '@apollo/react-hooks'
import './Checkout.styles.scss';
import CheckoutItem from '../../components/checkoutItem/CheckoutItem.component';
import {GET_PRODUCTS_FROM_CART} from '../../components/cart/Cart.component';


export default function CheckoutPage() {

    const [userId, setUserId] = useState("");


    useEffect(() => {
        const user =localStorage.getItem("auth-token")
        setUserId(JSON.parse(user))

    }, []);

    const { loading, error, data } = useQuery(GET_PRODUCTS_FROM_CART, {
        variables: {
             userId
        }
    })

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
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
           {data.getCart.products.map((item) => {
               return <div key={item.productId}>
                    <CheckoutItem  item={item} userId={userId} />
               </div>
               
           })}
           <div>
               <span className="total"> {data.getCart.subTotal} </span>
           </div>
        </div>
        
    );
}