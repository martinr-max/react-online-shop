import React from 'react';
import MainMenu from '../../components/directory/Directory.component';
import './HomePage.styles.scss';


export default function Homepage() {

    return(
        <div className="homepage">
            <div className="main_menu">
                <MainMenu />
                
            </div>
                
        </div>
    );
}