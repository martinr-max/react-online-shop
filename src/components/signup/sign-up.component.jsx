import React, {useState } from "react";
import { useMutation, gql } from '@apollo/client';

import FormInput from "../UI/form-input/Form-input.component";
import Button from "../UI/Button/Button.component";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(userInput: {
      email: $email
      password: $password
      name: $name
    }
     
    ) {
      _id
    }
  }
`;


export default function SignUpPage() {

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
      });

    const handleChange = (event) => {
        event.persist();
        JSON.stringify(
        setValues(values => ({
          ...values,
          [event.target.name]: event.target.value
        })))
      }

      const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
          name: values.username,
          email: values.email,
          password: values.password
        },
        onCompleted: ({ signup }) => {
          localStorage.setItem("values", values);
          //history.push('/shop');
        }
      });

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
             <Button type="submit" onClick ={(e) => signup()}> SIGN UP </Button>
             <div className="buttons">
             </div>
        </div>
    ); 

}