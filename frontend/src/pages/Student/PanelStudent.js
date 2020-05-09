import React from 'react'
import { Route } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh.jpg';
import ButtonList from '../../components/ButtonList';

import AnkietaStudent from './AnkietaStudent';
import AnkietaWypelnione from './AnkietaWypelnione';

function Panel() {
    return (
        <Grid container justify="center" alignItems="center" spacing={3}>
            <ButtonList buttons={[
                { text: "Zobacz wypełnione ankiety", color: "primary", link: "/student/panel/poprzednie_ankiety" },
                { text: "Zobacz ankiety do wypełnienia", color: "primary", link: "/student/panel/ankiety" },
                { text: "Wyloguj", color: "secondary", link: "/" }
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
                <Route path={'/student/panel/ankiety'} component={AnkietaStudent} />
                <Route path={'/student/panel/poprzednie_ankiety'} component={AnkietaWypelnione} />
            </Grid>
        </Grid>
    )
}

export default PanelStudent
