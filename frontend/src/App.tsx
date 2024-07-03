import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './styles/theme';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import PasswordRecovery from './components/PasswordRecovery';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/recover-password" component={PasswordRecovery} />
            <PrivateRoute path="/home" component={Home} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
