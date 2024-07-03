import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, form);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        alert('Login successful');
        history.push('/home');
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Error during login:', error);
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
          Login
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
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
          <Link component={RouterLink} to="/recover-password" variant="body2">
            Forgot password?
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default Login;
