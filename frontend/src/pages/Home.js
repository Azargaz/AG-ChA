import React, { useContext } from 'react'

import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../utils/auth';

import Image from '../components/Image';
import LogoAGH from '../img/logo_agh_kolor.png';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ButtonList from '../components/ButtonList';

function Home() {
    const { authenticated, decodedToken } = useContext(AuthContext);

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={6}>
                <Image src={LogoAGH}/>
                <Grid container justify="center" alignItems="center" spacing={3}>
                    {!authenticated && 
                    <ButtonList buttons={[
                        { text: "Zaloguj się jako pracownik", color: "primary", link: "/pracownik/login/" },
                        { text: "Zaloguj się jako student", color: "primary", link: "/student/login/" },
                    ]}/>}
                    {decodedToken.student && 
                    <ButtonList buttons={[
                        { text: "Panel student", color: "primary", link: "/student/panel/" }
                    ]}/>}
                    {decodedToken.pracownik && 
                    <ButtonList buttons={[
                        { text: "Panel pracownika", color: "primary", link: "/pracownik/panel/" }
                    ]}/>}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home
