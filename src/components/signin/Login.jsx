import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import FormInput from '../UI/form-input/Form-input.component';
import Button from '../UI/Button/Button.component';


import './Signin.styles.scss';
import { useHistory } from 'react-router';


export default  function LoginPage() {

    const [values, setValues] = useState({
        email: "",
        password: "",
      });

    
      const history = useHistory();

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({
          ...values,
          [event.target.name]: event.target.value
        }));
      }
 
      const [loginUser, { data }] = useMutation(gql`
    mutation LoginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
       userId
      }
    }
  `);

      async function submitLogin(e) {
        e.preventDefault();
        const { data } = await loginUser({ variables: values });
        if (data && data.loginUser) {
          localStorage.setItem("auth_token", JSON.stringify(data.loginUser.userId))
        
          history.push("/shop")
          window.location.reload()
        }
      }

  
    return(
        <div className="sign-in">
            <h2 className="title">I do not have an account</h2>
            <span>Sign in with email and password</span>
            <form> 
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
            
             <Button  type="submit" onClick={submitLogin}> SIGN IN </Button>
             </div>
        </div>
    ); 
    
}
