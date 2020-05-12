import React, { createContext, useContext } from 'react'

import jwtDecode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';
import history from './history';

const AuthContext = createContext(null);
const AuthProvider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;

const StudentRoute = ({ component: Component, ...rest }) => {
    const { authenticated, decodedToken } = useContext(AuthContext);
    const { student } = decodedToken;

    return (
        <Route
            {...rest}
            render={(props) => (student && student === true && authenticated === true) ? <Component {...props} /> : <Redirect to='/student/login' />}
        />
    )
}

const PracownikRoute = ({ component: Component, ...rest }) => {
    const { authenticated, decodedToken } = useContext(AuthContext);
    const { pracownik } = decodedToken;

    return (
        <Route
            {...rest}
            render={(props) => (pracownik && pracownik === true && authenticated === true) ? <Component {...props} /> : <Redirect to='/pracownik/login' />}
        />
    )
}

const UnauthRoute = ({ component: Component, ...rest }) => {
    const { authenticated } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
        />
    )
}

const getDecodedToken = () => {
	return jwtDecode(localStorage.authToken);
}

const setToken = (token) => {
    localStorage.setItem('authToken', token);
}

const removeToken = () => {
    localStorage.removeItem('authToken');
}

const checkToken = () => {
	if(localStorage.authToken 
		&& localStorage.authToken !== "undefined" 
		&& localStorage.authToken !== undefined 
		&& localStorage.authToken !== null 
		&& localStorage.authToken !== "") 
	{
		const decodedAuthToken = getDecodedToken();
		if(decodedAuthToken.exp * 1000 < Date.now()) {
			window.location.href = '/';
			return null;
		} else {
			return decodedAuthToken;
		}
	}

	return null;
}

const authenticatePracownik = (loginData, setDecodedToken, setAuthenticated, callback) => {
    const { login, haslo } = loginData;
    fetch('http://localhost:3001/users/pracowniklogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify({
            login,
            haslo
        })
    })
        .then(res => res.json())
        .then(json => {
            setToken(json);
            const decodedToken = getDecodedToken();
            setAuthenticated(true);
            setDecodedToken(decodedToken);
            callback();
            history.push("/pracownik/panel")
        })
}

const authenticateStudent = (loginData, setDecodedToken, setAuthenticated, callback) => {
    const { indeks, pesel } = loginData;
    fetch('http://localhost:3001/users/studentlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },        
        body: JSON.stringify({
            indeks,
            pesel
        })
    })
        .then(res => res.json())
        .then(json => {
            setToken(json);
            const decodedToken = getDecodedToken();
            setAuthenticated(true);
            setDecodedToken(decodedToken);
            callback();
            history.push("/student/panel")
        })
}

const unauthenticate = (setDecodedToken, setAuthenticated) => {
    removeToken();
    setAuthenticated(false);
    setDecodedToken({});
}

export {
    AuthContext,
    AuthProvider,
    AuthConsumer,
    StudentRoute,
    UnauthRoute,
    PracownikRoute,
    setToken,
    removeToken,
    checkToken,
    authenticatePracownik,
    authenticateStudent,
    unauthenticate,
    getDecodedToken
};