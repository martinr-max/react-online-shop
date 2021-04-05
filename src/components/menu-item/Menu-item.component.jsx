import React from 'react';
import './MenuItem.styles.scss';
import {useHistory} from 'react-router-dom';

export default function MenuItem({title, imageUrl, size}) {
    
    const history = useHistory();
    
    const goItemPage = (t) => {
        console.log(title)
        history.push(`./${title}` )
    }

    return(
        <div className={`${size} menu_item`} onClick={(event) => goItemPage({title})} >
            <div className="background_image" style={{backgroundImage: `url(${imageUrl})`}}/>
            <div className="content">
                <h1 className="title"> {title} </h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>       
    );
}