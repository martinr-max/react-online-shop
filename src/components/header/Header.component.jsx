import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import "./Header.styles.scss";
import ShoppingBag from './shopping-bag/ShoppingBag.component';
import CartDropdown from '../cart/Cart.component';
const LOGOUT_MUTATION = gql`
  mutation{logout}
`;


const  Header = () => {

    const [cartDropdownIsOpen, setCartdropdownIsOpen] = useState(true);
    const [token, setToken] = useState("");
    const history = useHistory()


    useEffect( () => {
            let token = localStorage.getItem("auth_token");
            setToken(token);
    }, [])

    const [logout] =  useMutation(LOGOUT_MUTATION, {
        variables: {
          
        },
        onCompleted: () => {
          localStorage.removeItem("auth_token");
          history.push('/signup');
          window.location.reload();
        }
    });
    

    const cartDropdownToggle = () => {
        setCartdropdownIsOpen(!cartDropdownIsOpen)
    }

    return(
        <div className="header">
           {console.log(token)}
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
                
                {token !== "" && token  ? 
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
           
            {cartDropdownIsOpen || !token ? null :
            <CartDropdown cartDropdownToggle={cartDropdownToggle} />}

           
            
        </div>
    );
}


export default Header;