import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <Button color="inherit" component={RouterLink} to="/home">Home</Button>
        <Button color="inherit" component={RouterLink} to="/register">Register</Button>
        <Button color="inherit" component={RouterLink} to="/login">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
