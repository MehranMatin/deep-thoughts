import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();
  console.log(thoughtId);

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
            Username
          </span>{' '}
          thought on createdAt
        </p>
        <div className='card-body'>
          <p>Thought Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleThought;
