import React, { useContext } from 'react'
import { Route } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh_kolor.png';
import ButtonList from '../../components/ButtonList';

import AnkietaDodaj from './AnkietaDodaj';
import AnkietaWyniki from './AnkietaWyniki';
import AnkietaWynik from './AnkietaWynik';
import AnkietaProwadzacy from './AnkietaProwadzacy';
import RankingProwadzacy from './RankingProwadzacy';
import { AuthContext } from '../../utils/auth';

function Panel() {
    const { unauthenticate, setDecodedToken, setAuthenticated } = useContext(AuthContext);

    const logout = () => {
        unauthenticate(setDecodedToken, setAuthenticated);
    }

    return (
        <Grid container justify="center" alignItems="center" spacing={3}>
            <ButtonList buttons={[
                { text: "Dodaj ankietę", color: "primary", link: "/pracownik/panel/dodaj_ankiete" },
                { text: "Zobacz wyniki ankiet", color: "primary", link: "/pracownik/panel/wyniki" },
                { text: "Porównaj prowadzących", color: "primary", link: "/pracownik/panel/porownaj_prowadzacych" },
                { text: "Wyświetl ranking prowadzących", color: "primary", link: "/pracownik/panel/ranking" },
                { text: "Wyloguj", color: "secondary", link: "/", handleClick: logout }
            ]}/>
        </Grid>
    )
}

function PanelPracownik(props) {
    const { pathname } = props.location;

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={8}>
                <Image src={LogoAGH} size={pathname === '/pracownik/panel/' ? 250:150} />
                
                <Route exact path={'/pracownik/panel/'} component={Panel} />
                <Route path={'/pracownik/panel/dodaj_ankiete'} component={AnkietaDodaj} />
                <Route path={'/pracownik/panel/wyniki'} component={AnkietaWyniki} />
                <Route path={'/pracownik/panel/wynik/:id_ankieta'} component={AnkietaWynik} />
                <Route path={'/pracownik/panel/porownaj_prowadzacych'} component={AnkietaProwadzacy} />
                <Route path={'/pracownik/panel/ranking'} component={RankingProwadzacy} />
            </Grid>
        </Grid>
    )
}

export default PanelPracownik
