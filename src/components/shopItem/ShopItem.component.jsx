import React from 'react';
import './ShopItem.styles.scss';
import Button from '../UI/Button/Button.component';
import cartActions from '../../redux/cart/cart.actions';
import { useDispatch } from 'react-redux';

export default function ShopItem({item}) {

    const {imageUrl, name, price} = item;
    const dispatch = useDispatch();
    return(
        <div className="collection-item">
        <div className="image"  style={{backgroundImage: `url(${imageUrl})`}} />
            <div className="collection-footer">
                <span className="name"> {name} </span>
                <span className="price"> {price} </span>
            </div>
            <Button onClick={(e) => dispatch(cartActions.addItem(item))} inverted>Add to cart</Button>

        </div>

    );
}