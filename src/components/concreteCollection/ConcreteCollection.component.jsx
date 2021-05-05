import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { firestore, getCollection } from '../../firebase/firebase.config';
import "./concreteCollection.styles.scss"


export default function Collection() {
    const [collections, setCollections] = useState([]);

    let { title } = useParams();

    useEffect(() => {
        const collectionRef = firestore.collection('collection').where('title', '==', title) ;
        const unSubscribeSnapShot = collectionRef.onSnapshot(async snapShot => {
            const fetchedCollection = getCollection(snapShot);
            const fetchedItems = fetchedCollection.map(i => {
                return i.items
            })
            setCollections(fetchedItems);
        })
        return () => {
            unSubscribeSnapShot();
        } 

    },[title])

    return(
        <div className="collection-preview">
            <div className="preview">
            {collections && collections.map(item => {
                return item.map(i => {
                    return <React.Fragment>
                       <div className="collection-item">
                    <div className="image"  style={{backgroundImage: `url(${i.imageUrl})`}} />
                    <div className="collection-footer">
                        <span className="name"> {i.name} </span>
                        <span className="price"> {i.price} </span>
                    </div>
                    </div>
                    </React.Fragment>
                })
            })}
            </div>
        </div>
    );
}