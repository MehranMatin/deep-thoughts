import React from 'react';
// the browser treats the <a> element as a new request for server-side resources, and we don't want the page to refresh when using React Router
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return (
      <p className='bg-dark text-light p-3'>{username}, make some friends!</p>
    );
  }

  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5>
      {friends.map((friend) => (
        <button className='btn w-100 display-block mb-2' key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;
