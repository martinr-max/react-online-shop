import React from 'react';
import "./Button.styles.scss";



export default function Button({children, inverted, ...otherProps}) {
    return(
        <div className={`${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
            {children}
        </div>
    );
}