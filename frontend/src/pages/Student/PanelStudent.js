import React, { useContext } from 'react'
import { Route } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh_kolor.png';
import ButtonList from '../../components/ButtonList';

import AnkietaDoWypelnienia from './AnkietaDoWypelnienia';
import AnkietaWypelnione from './AnkietaWypelnione';
import Ankieta from './Ankieta';
import AnkietaW from './AnkietaW';
import { AuthContext } from '../../utils/auth';

function Panel() {
    const { unauthenticate, setDecodedToken, setAuthenticated } = useContext(AuthContext);

    const logout = () => {
        unauthenticate(setDecodedToken, setAuthenticated);
    }

    return (
        <Grid container justify="center" alignItems="center" spacing={3}>
            <ButtonList buttons={[
                { text: "Zobacz wypełnione ankiety", color: "primary", link: "/student/panel/poprzednie_ankiety" },
                { text: "Zobacz ankiety do wypełnienia", color: "primary", link: "/student/panel/ankiety" },
                { text: "Wyloguj", color: "secondary", link: "/", handleClick: logout }
            ]}/>
        </Grid>
    )
}

function PanelStudent(props) {
    const { pathname } = props.location;

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={8}>
                <Image src={LogoAGH} size={pathname === '/student/panel/' ? 250:150} />

                <Route exact path={'/student/panel/'} component={Panel} />
                <Route path={'/student/panel/ankiety'} component={AnkietaDoWypelnienia} />
                <Route path={'/student/panel/poprzednie_ankiety'} component={AnkietaWypelnione} />
                <Route path={'/student/panel/ankieta/:id'} component={Ankieta} />
                <Route path={'/student/panel/ankieta_wypelniona/:id'} component={AnkietaW} />
            </Grid>
        </Grid>
    )
}

export default PanelStudent
