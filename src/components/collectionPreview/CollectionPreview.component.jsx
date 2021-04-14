import React, { memo } from 'react';
import ShopItem from '../shopItem/ShopItem.component';
import './CollectionPreview.styles.scss';

export default memo(function CollectionPreview({title, items }) {

    return(
        <div className="collection-preview">
            <h1 className="title"> {title.toUpperCase()} </h1>
            <div className="preview">
                { items
                .filter((item, number) => number < 4)
                .map((item) => {
                    return <ShopItem
                        item ={item}
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.imageUrl}
                     />
                }) }
            </div>

        </div>
    );
})