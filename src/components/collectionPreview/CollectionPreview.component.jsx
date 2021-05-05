import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import ShopItem from '../shopItem/ShopItem.component';
import './CollectionPreview.styles.scss';
import { useQuery, gql } from '@apollo/client';


export const GET_PRODUCTS_BY_CAT = gql`
  query getProductsByCategory($title: String!) {
    getProductsByCategory(title: $title) {
     items {
         _id
         name
         imageUrl
         price
     }
    }
  }
`;

export default memo(function CollectionPreview({title}) {

    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CAT, {
        variables: {
            title: title
        }
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  
      
    return(
        <div className="collection-preview">
         <Link to={`section/${title}` }>  <h1 className="title"> {title.toUpperCase()} </h1> </Link>  
            <div className="preview">
                {data.getProductsByCategory.items
                .filter((item, idx)=> idx < 4)
                .map(item => {
                    return <ShopItem item={item}/>
                })}
              
            </div>

        </div>
    );
})