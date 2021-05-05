import React from 'react';
import { useQuery, gql } from '@apollo/client';
import "./ShopPage.styles.scss";
import CollectionPreview from '../../../components/collectionPreview/CollectionPreview.component';

const GET_CATEGORY = gql`
  query getCategory {
    getCategory {
     title
    }
  }
`;


export default function ShopPage() {

    const { loading, error, data } = useQuery(GET_CATEGORY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  

    return(
        <div>
            {data && data.getCategory.map((section => {
                return <CollectionPreview  title={section.title}/>
            }))}
        </div>
    );
}