import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import ReactionList from '../components/ReactionList';
import { QUERY_THOUGHT } from '../utils/queries';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    // The id property on the variables object will become the $id parameter in the GraphQL query.
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='card mb-3'>
        <p className='card-header'>
          <span style={{ fontWeight: 700 }} className='text-light'>
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className='card-body'>
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {
        // prevent rendering the reactions component if the array is empty
        thought.reactionCount > 0 && (
          <ReactionList reactions={thought.reactions} />
        )
      }
    </div>
  );
};

export default SingleThought;
