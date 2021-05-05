import React from 'react';
import LoginPage from '../../../components/signin/Login';
import SignUpPage from '../../../components/signup/sign-up.component';
import "./AuthPage.styles.scss"


export default function AuthPage() {
    return(
        <div className="sign-in-and-sign-up">
            <LoginPage />
            <SignUpPage  />
        </div>
    );
}