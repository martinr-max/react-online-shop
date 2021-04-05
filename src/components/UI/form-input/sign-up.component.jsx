import React, {memo, useState } from "react";
import { auth, createUserProfile } from "../../../firebase/firebase.config";
import FormInput from "./Form-input.component";
import Button from "../Button/Button.component";


export default memo(function SignUpPage() {

    const [values, setValues] = useState({
        username: "",
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
              const { user } = await auth.createUserWithEmailAndPassword(values.email, values.password);
              createUserProfile(user, {displayName: values.username})       
          }
          catch(err) {
              console.log(err.message);
          }
      }

    return(
        <div className="sign-in">
            <h2 className="title"> I have no account</h2>
            <span>Sign up with email and password</span>
            <form  > 
            <FormInput
             name="username"
             type="text"
             label="Name"
             value={values.username}
             handleChange={handleChange}
             />
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
             <FormInput
             name="confirmPassword"
             type="password"
             label="Confirm password"
             value={values.password}
             handleChange={handleChange}
             />
             </form>
             <Button type="submit" onClick ={submitUserData}> SIGN UP </Button>
             <div className="buttons">
             </div>
        </div>
    ); 
    
})