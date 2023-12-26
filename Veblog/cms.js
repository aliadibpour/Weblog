import { gql, useApolloClient } from "@apollo/client";

const GET_BLOGS = gql`
  query{
  blogs{
    title,
    slug,
    id,
    data,
    counter,
    coverphoto{
      url
    },
    athors{
      name,
      slug,
      profile{
        url
      }
    }
    comments {
      name
      gmail
      counter
    }
  }
}
`
const GET_ATHORS = gql`
  query {
  athor{
    name,
    slug,
    password
    profile{
      url
    },
    describtion,
    blogs{
      title,
      slug,
      coverphoto{
        url
      }
    }
  }
}
`
const SEND_COMMENT = gql`
  mutation MyMutation(
    $gmail:String!
    $name:String!
    $counter:String!
    $slug:String!
    ) {
  createComment(
    data: {gmail:$gmail, name:$name, counter:$counter, blog: {connect: {slug:$slug}}}
  ) {
    id
    name
  }
}
`
const PublishComment = gql`
mutation MyMutation($id:ID!) {
  publishComment(where: {id: $id}){
    id
  }
}
`

const SET_AUTHOR = gql`
 mutation MyMutation($name:String!,$describtion:String!,$slug:String!,$password:String!,$id:ID!) {
  createAthors(
    data: {name:$name, describtion:$describtion, slug:$slug, password:$password, profile: {connect: {id:$id}}}
  )
  {
    id
  }
}
`
const publishasset = gql`
mutation MyMutation ($id:ID!){
  publishAsset(where: {id: $id}){
    id
  }
}`

const PublishAtuor = gql`
mutation MyMutation($slg:ID!) {
  publishAthors(where: {id:$slg}){
    slug
  }
}
`

const PostBlog = gql`
mutation MyMutation ($title:String!,$counter:String!,$slug:String!,$id:ID!,$date:Date!,$athor:String!){
  createBlog(
    data: {title: $title, counter: $counter, data: $date, slug: $slug, coverphoto: {connect: {id: $id}}, athors: {connect: {slug: $athor}}}
  )
  {
    id
  }
}
`
const PublishBlog = gql`
mutation MyMutation ($id:ID!){
  publishBlog(where: {id: $id}){
    id
  }
}
`

export {GET_BLOGS, GET_ATHORS, SEND_COMMENT,SET_AUTHOR, publishasset, PublishAtuor, PublishComment,PostBlog,PublishBlog};