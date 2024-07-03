import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';
import { TextField, Button, Container, Typography } from '@mui/material';

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/recover-password`, { email });
      alert('Password recovery email sent');
    } catch (error: any) {
      console.error('Error during password recovery:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert('Network error: No response received');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Password Recovery
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Recover Password
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PasswordRecovery;
