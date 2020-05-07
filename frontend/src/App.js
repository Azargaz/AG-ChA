import React from 'react';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import theme from './utils/theme';

import history from './utils/history';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Home from './pages/Home';

import LoginStudent from './pages/Student/LoginStudent';
import PanelStudent from './pages/Student/PanelStudent';

import LoginPracownik from './pages/Pracownik/LoginPracownik';
import PanelPracownik from './pages/Pracownik/PanelPracownik';

const useStyles = makeStyles(theme => ({
  flex: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme()}>
    <Router history={history}>
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex} component={Link} to="/">
              AGH
            </Typography>
            <IconButton
                color="inherit"
                component={Link}
                to="/pracownik/login"
              >
                <AccountCircle />
            </IconButton>
            <IconButton
                color="inherit"
                component={Link}
                to="/student/login"
              >
                <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/pracownik/login" component={LoginPracownik} />
          <Route path="/pracownik/panel" component={PanelPracownik} />
          <Route path="/student/login" component={LoginStudent} />
          <Route path="/student/panel" component={PanelStudent} />
        </Switch>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
