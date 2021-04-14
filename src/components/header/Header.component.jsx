import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import "./Header.styles.scss";
import { auth } from '../../firebase/firebase.config';
import ShoppingBag from './shopping-bag/ShoppingBag.component';
import CartDropdown from '../cart/Cart.component';
import { useSelector } from 'react-redux';



const  Header = () => {

    const [cartDropdownIsOpen, setCartdropdownIsOpen] = useState(true);
    const user = useSelector(state => state.user.currentUser)

    const cartDropdownToggle = () => {
        setCartdropdownIsOpen(!cartDropdownIsOpen)
    }

    const logout = () => {
        auth.signOut();
    }

    return(
        <div className="header">
           
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options"> 
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/connect">
                    CONTACT
                </Link>
                
                {user && user ? 
                <div style={{display: "flex", marginTop: "5px"}}>
                <div className="option" onClick={logout}>
                  SIGN OUT
                </div> 
                  <ShoppingBag cartDropdownToggle={cartDropdownToggle} />
                  </div>
                : 
                    <Link className="option" to="/signup" > SIGN IN </Link>
                }
                
            </div>
           
            {cartDropdownIsOpen || !user ? null :
            <CartDropdown cartDropdownToggle={cartDropdownToggle} />}

           
            
        </div>
    );
}


export default Header;