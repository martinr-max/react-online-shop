import React, { useState, memo } from 'react';
import FormInput from '../UI/form-input/Form-input.component';
import Button from '../UI/Button/Button.component';
import './Signin.styles.scss';
import { signInWithGoogle, auth } from '../../firebase/firebase.config';


export default  memo(function SignInPage() {

  console.log('tere')

    const [values, setValues] = useState({
        email: "",
        password: "",
      });

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({
          ...values,
          [event.target.name]: event.target.value
        }));
      }

      const submitUserData = async (event) => {
          event.preventDefault();
          try {
            await auth.signInWithEmailAndPassword(values.email, values.password);
          }
          catch(err) {
              console.log(err.message);
          }
      }

    return(
        <div className="sign-in">
            <h2 className="title">Ido not have an account</h2>
            <span>Sign in with email and password</span>
            <form  > 
            <FormInput
             name="email"
             type="email"
             label="email"
             value={values.email}
             handleChange={handleChange}
             />
            <FormInput
             name="password"
             type="password"
             label="password"
             value={values.password}
             handleChange={handleChange}
             />
             </form>
             <div className="buttons">
             <Button  type="submit" onClick ={submitUserData}> SIGN IN </Button>
             <Button className="google_button custom-button" type="submit" onClick ={signInWithGoogle}> SIGN IN </Button>

             </div>
        </div>
    ); 
    
})