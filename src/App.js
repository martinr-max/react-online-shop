import './App.css';
import React from 'react'
import Homepage from './Pages/HomePage/HomePage.component';
import {Route, Switch} from 'react-router-dom';
import ShopPage from './Pages/HomePage/Shop/ShopPage.component';
import Header from './components/header/Header.component';
import LoginPage from './Pages/HomePage/Login/LoginPage.component';
import { auth, createUserProfile } from './firebase/firebase.config';
import {useEffect } from 'react';
import { useDispatch } from 'react-redux';
import setCurrentUser from './redux/user/userActions.actions';

function App() {

  const dispatch = useDispatch()

    useEffect(() =>{

      const unlisten =  auth.onAuthStateChanged(
         async authUser => {
          if(authUser) {
            const userRef = await createUserProfile(authUser);
            userRef.onSnapshot(snapshot => {
              dispatch(setCurrentUser({id: snapshot.id, ...snapshot.data()}))
            })
          }
          else {
            dispatch(setCurrentUser(authUser))
          }
          
         },
      );
      return () => {
          unlisten();
      } 

  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signup" component={LoginPage} />
      </Switch>  
    </div>
  );
}



export default App
