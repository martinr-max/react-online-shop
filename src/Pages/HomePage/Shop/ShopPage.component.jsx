import React, { memo } from 'react';
import "./ShopPage.styles.scss";
import CollectionPreview from '../../../components/collectionPreview/CollectionPreview.component';
import SHOP_DATA  from '../../../data/shopItems.data';


export default memo(function ShopPage() {

    return(
        <div>
            {SHOP_DATA.map((section => {
                return <CollectionPreview key={section.id} items={section.items} title={section.title}/>
            }))}
        </div>
    );
})