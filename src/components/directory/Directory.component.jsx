import React from 'react';
import sections from "../../data/sections.data";
import MenuItem from '../menu-item/Menu-item.component';
import "./Directory.styles.scss";

export default function MainMenu() {

    
    return(
        <div className="main_menu">
            {sections.map((section) => {
                return <MenuItem
                 key={section.id}
                 title={section.title}
                 imageUrl={section.imageUrl}
                 size={section.size}
                   />
            })}
        </div>
    );

}