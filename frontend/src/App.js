import React, { useState } from 'react';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import theme from './utils/theme';

import history from './utils/history';
import {
    AuthProvider,
    StudentRoute,
    UnauthRoute,
    PracownikRoute,
    checkToken,
    setToken,
    unauthenticate,
    getDecodedToken
} from './utils/auth';

import Home from './pages/Home';
import Navbar from './pages/Navbar';

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
    const [authenticated, setAuthenticated] = useState(checkToken() !== null);
    const [decodedToken, setDecodedToken] = useState(checkToken() === null ? {} : getDecodedToken());

    return (
        <AuthProvider value={{
            unauthenticate,
            authenticated,
            setAuthenticated,
            decodedToken,
            setDecodedToken,
            setToken,
            getDecodedToken
        }}>
        <ThemeProvider theme={theme()}>
        <Router history={history}>
            <Navbar />
            <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <UnauthRoute path="/pracownik/login" component={LoginPracownik} />
                <PracownikRoute path="/pracownik/panel" component={PanelPracownik} />
                <UnauthRoute path="/student/login" component={LoginStudent} />
                <StudentRoute path="/student/panel" component={PanelStudent} />
            </Switch>
            </div>
        </Router>
        </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
