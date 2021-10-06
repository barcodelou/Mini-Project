import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from "@apollo/client";
import Client from "./apolloclient";

ReactDOM.render(
  <ApolloProvider client={Client}>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
  ,
  document.getElementById('root')
);
reportWebVitals();
