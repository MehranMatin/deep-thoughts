import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import FriendList from '../components/FriendList';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import { ADD_FRIEND } from '../utils/mutations';
import { QUERY_ME, QUERY_USER } from '../utils/queries';

const Profile = (props) => {
  const [addFriend] = useMutation(ADD_FRIEND);

  const { username: userParam } = useParams();

  // if there isn't a value for userParam(), we'll execute QUERY_ME
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });
  // will populate the JSX
  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username in params is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className='flex-row mb-3'>
        <h2 className='bg-dark text-secondary p-3 display-inline-block'>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {
          // userParam variable is only defined when the route includes a username, thus the button won't display when route is simply /profile
          userParam && (
            <button className='btn ml-auto' onClick={handleClick}>
              Add Friend
            </button>
          )
        }
      </div>

      <div className='flex-row justify-space-between mb-3'>
        <div className='col-12 mb-3 col-lg-8'>
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>

        <div className='col-12 col-lg-3 mb-3'>
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
