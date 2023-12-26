import React from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import { GET_BLOGS } from "./cms";
import Author from "./Author";
import Nav from "./Nav";
import Blogshome from "./Blogshome";

const Blog = () => {
  //localStorage.clear()
  const data = useQuery(GET_BLOGS)
  if (data.error) return  <p>network connection is low</p>
  return (
    <div>
      <Nav />
        <div>
        <Author/>
        <Blogshome />
        </div>
    </div>
  );
};

export default Blog;