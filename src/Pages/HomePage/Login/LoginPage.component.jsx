import React from 'react';
import SignUpPage from '../../../components/UI/form-input/sign-up.component';
import SignInPage from '../../../components/signup/SigninPage.component';
import "./LoginPage.styles.scss"


export default function LoginPage() {
    return(
        <div className="sign-in-and-sign-up">
            <SignInPage />
            <SignUpPage  />
        </div>
    );
}