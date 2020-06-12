import React, { useContext } from 'react'

import { Link } from 'react-router-dom';

import { AuthContext } from '../utils/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AppsIcon from '@material-ui/icons/Apps';

import AGHmono from '../img/logo_agh_mono.png';
import Image from '../components/Image';

function Navbar() {
    const { authenticated, decodedToken } = useContext(AuthContext);

    return (
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
                {authenticated && decodedToken.student && decodedToken.student === true && 
                <Tooltip title="Panel studenta">
                    <IconButton
                        color="inherit"
                        component={Link}
                        to="/student/panel/"
                    >
                        <AppsIcon />
                    </IconButton>
                </Tooltip>}
                {authenticated && decodedToken.pracownik && decodedToken.pracownik === true && 
                <Tooltip title="Panel pracownika">
                    <IconButton
                        color="inherit"
                        component={Link}
                        to="/pracownik/panel/"
                    >
                        <AppsIcon />
                    </IconButton>
                </Tooltip>}
                {!authenticated && 
                <>
                    <Tooltip title="Zaloguj się jako pracownik">
                        <IconButton
                            color="inherit"
                            component={Link}
                            to="/pracownik/login/"
                        >
                            <SupervisorAccountIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Zaloguj się jako student">
                        <IconButton
                            color="inherit"
                            component={Link}
                            to="/student/login/"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>
                </>}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
