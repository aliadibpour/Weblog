import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Veblog from "./Veblog/Veblog";

const client = new ApolloClient({
  uri:'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clkjfe1cy0uy501ul69la90wu/master',
  cache: new InMemoryCache(),
})
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Veblog/>
    </ApolloProvider>
    </BrowserRouter>,
  document.getElementById("root")
);