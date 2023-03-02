import { gql } from '@apollo/client'
import React from 'react'

export const REGISTER_USER = gql`
  mutation AddUser(
    $fullName: String
    $email: String
    $mobile: String
    $gender: String
    $dob: String
    $password: String
  ) {
    AddUser(
      data: {
        fullName: $fullName
        email: $email
        mobile: $mobile
        gender: $gender
        dob: $dob
        password: $password
      }
    ) {
      UserId
      message
      status
      Token
    }
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    LoginUser(data: { email: $email, password: $password }) {
      UserId
      message
      status
      Token
    }
  }
`

export const ADD_BLOG = gql`
  mutation AddBlog(
    $blogName: String
    $category: String
    $blogContent: String
    $image: String
    $userId: String
  ) {
    AddBlog(
      data: {
        blogName: $blogName
        category: $category
        blogContent: $blogContent
        image: $image
        userId: $userId
      }
    ) {
      message
      status
    }
  }
`
export const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $blogName: String
    $category: String
    $blogContent: String
    $image: String
    $blogId: String
  ) {
    UpdateBlog(
      data: {
        blogName: $blogName
        category: $category
        blogContent: $blogContent
        image: $image
        blogId: $blogId
      }
    ) {
      message
      status
    }
  }
`
export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: String) {
    DeleteBlog(id: $id) {
      status
      message
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser(
    $fullName: String
    $bio: String
    $mobile: String
    $gender: String
    $dob: String
    $category: String
    $userId: String
    $image: String
  ) {
    updateUser(
      data: {
        fullName: $fullName
        bio: $bio
        mobile: $mobile
        gender: $gender
        dob: $dob
        category: $category
        userId: $userId
        image: $image
      }
    ) {
      status
      message
    }
  }
`

export const ADD_FOLLOWER = gql`
  mutation following($userId: String, $followerID: String) {
    following(data: { userId: $userId, followerID: $followerID }) {
      status
      message
    }
  }
`

export const REMOVE_FOLLOWER = gql`
  mutation unFollowing($userId: String, $followerID: String) {
    unFollowing(data: { userId: $userId, followerID: $followerID }) {
      status
      message
    }
  }
`

export const LIKE_BLOG = gql`
  mutation LikeBlog($userId: String, $blogId: String) {
    LikeBlog(data: { userId: $userId, blogId: $blogId }) {
      status
      message
    }
  }
`

export const UNLIKE_BLOG = gql`
  mutation UnLikeBlog($userId: String, $blogId: String) {
    UnLikeBlog(data: { userId: $userId, blogId: $blogId }) {
      status
      message
    }
  }
`
export const ADD_COMMENT = gql`
  mutation CommentBlog(
    $comment: String
    $commenterID: String
    $blogID: String
  ) {
    CommentBlog(
      data: { comment: $comment, commenterID: $commenterID, blogID: $blogID }
    ) {
      status
      message
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: String) {
    DeleteComment(id: $id) {
      status
      message
    }
  }
`

export const SEARCH_BLOG = gql`
  mutation searchBlog($search: String) {
    searchBlog(data: { search: $search }) {
      blogName
      category
      blogContent
      image {
        public_id
        url
      }
      userId
      Liked
      _id
    }
  }
`

export const SEARCH_USER = gql`
  mutation searchUser($search: String) {
    searchUser(data: { search: $search }) {
      fullName
      email
      mobile
      gender
      dob
      bio
      image {
        public_id
        url
      }
      followers
      following
      category
      _id
    }
  }
`
