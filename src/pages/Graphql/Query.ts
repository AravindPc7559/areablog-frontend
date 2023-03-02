import { gql } from '@apollo/client'

export const GET_USER = gql`
  {
    getAllUsers {
      followers
      following
      bio
      fullName
      mobile
      gender
      dob
      category
      _id
      image {
        public_id
        url
      }
      email
    }
  }
`

export const GET_ALL_BLOGS = gql`
  {
    getAllBlogs {
      blogContent
      blogName
      category
      image {
        public_id
        url
      }
      userId
      _id
      Liked
    }
  }
`

export const GET_FOLLOWED_USER_DATA = gql`
  query getFollowedUsers($userId: String) {
    getFollowedUsers(userId: $userId) {
      blogContent
      blogName
      category
      image {
        public_id
        url
      }
      userId
      _id
      Liked
    }
  }
`
export const GET_ALL_COMMENTS = gql`
  {
    getAllComment {
      comment
      commenterID
      createdAt
      blogID
      updatedAt
      _id
    }
  } 
`
