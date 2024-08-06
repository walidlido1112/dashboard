// src/pages/user/UserPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/users');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Page</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
