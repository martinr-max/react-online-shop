import React from 'react';
import "./Button.styles.scss";



export default function Button({children, ...otherProps}) {
    return(
        <div className="custom-button" {...otherProps}>
            {children}
        </div>
    );
}