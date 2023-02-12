// Utils folder holds code and functionality that isn't necessarily React-based
// Separate all of the front-end logic for these query and mutation requests into their own files. We'll end up with more readable code and reusable queries in multiple spots

import { gql } from '@apollo/client';

export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;
