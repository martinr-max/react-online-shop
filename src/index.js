import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { onError } from 'apollo-link-error'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import { HttpLink } from 'apollo-link-http';


const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})


const cache = new InMemoryCache({
 
});
console.log(cache)
  
const httplink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: "include"
})



const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, httplink]),
  fetchOptions: {
    credentials: 'include'
 }
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
    <Router>
      <App />
    </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
