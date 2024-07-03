import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../apiConfig';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      neighborhood: '',
      number: '',
      city: '',
      state: '',
      zip: '',
    },
  });

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      setForm({
        ...form,
        address: { ...form.address, [name.split('.')[1]]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${API_URL}/auth/register`, form);
      alert('User registered successfully');
      history.push('/login');
    } catch (error: any) {
      console.error('Error during user registration:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert('Network error: No response received');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value;
    setForm({ ...form, address: { ...form.address, zip } });
    if (zip.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${zip}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;
        setForm({
          ...form,
          address: {
            ...form.address,
            street: logradouro,
            neighborhood: bairro,
            city: localidade,
            state: uf,
          },
        });
      } catch (error) {
        alert('Invalid ZIP code');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address.zip"
            label="ZIP"
            type="text"
            id="zip"
            value={form.address.zip}
            onChange={handleZipChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="address.street"
            label="Street"
            type="text"
            id="street"
            value={form.address.street}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="address.neighborhood"
            label="Neighborhood"
            type="text"
            id="neighborhood"
            value={form.address.neighborhood}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="address.number"
            label="Number"
            type="text"
            id="number"
            value={form.address.number}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="address.city"
            label="City"
            type="text"
            id="city"
            value={form.address.city}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="address.state"
            label="State"
            type="text"
            id="state"
            value={form.address.state}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
