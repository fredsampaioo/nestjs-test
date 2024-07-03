import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Home: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user: any) => (
          <ListItem key={user._id}>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
