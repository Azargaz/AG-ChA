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
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import AGHmono from './img/logo_agh_mono.png';
import Image from './components/Image';

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
  return (
    <ThemeProvider theme={theme()}>
    <Router history={history}>
        <div>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Box mr={'auto'}>
                    <Tooltip title="Strona główna">
                        <IconButton
                            color="inherit"
                            component={Link}
                            to="/"
                        >
                            <Image src={AGHmono} size={40} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Tooltip title="Zaloguj się jako pracownik">
                    <IconButton
                        color="inherit"
                        component={Link}
                        to="/pracownik/login"
                    >
                        <SupervisorAccountIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Zaloguj się jako student">
                    <IconButton
                        color="inherit"
                        component={Link}
                        to="/student/login"
                    >
                        <AccountCircle />
                    </IconButton>
                </Tooltip>
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
