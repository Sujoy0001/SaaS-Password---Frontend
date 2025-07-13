import React, { useEffect, useState } from 'react';
import { getClientEmail, getClientByEmail } from '../context/Auth';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = getClientEmail();
    if (email) {
      getClientByEmail(email).then((data) => setUser(data));
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <p>{JSON.stringify(user.routes)}</p>
    </div>
  );
};

export default ProfilePage;
