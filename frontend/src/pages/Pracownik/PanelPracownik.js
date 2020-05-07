import React from 'react'
import { Route } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh.jpg';
import ButtonList from '../../components/ButtonList';

function Panel() {
    return (
        <Grid container justify="center" alignItems="center" spacing={3}>
            <ButtonList buttons={[
                { text: "Dodaj ankietę", color: "primary", link: "/" },
                { text: "Zobacz wyniki ankiet", color: "primary", link: "/" },
                { text: "Porównaj prowadzących", color: "primary", link: "/" },
                { text: "Wyświetl ranking prowadzących", color: "primary", link: "/" },
                { text: "Wyloguj", color: "secondary", link: "/" }
            ]}/>
        </Grid>
    )
}

function PanelPracownik() {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={3}>
                <Image src={LogoAGH}/>
                
                <Route exact path={'/pracownik/panel/'} component={Panel} />
            </Grid>
        </Grid>
    )
}

export default PanelPracownik
