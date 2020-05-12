import React from 'react'

import Grid from '@material-ui/core/Grid';

import Image from '../components/Image';
import LogoAGH from '../img/logo_agh_kolor.png';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ButtonList from '../components/ButtonList';

function Home() {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={6}>
                <Image src={LogoAGH}/>
                <Box m={3}>
                    <Typography align="center" variant="h4">
                        {/* Strona główna */}
                    </Typography>
                </Box>
                <Grid container justify="center" alignItems="center" spacing={3}>
                    <ButtonList buttons={[
                        { text: "Zaloguj się jako pracownik", color: "primary", link: "/pracownik/login/" },
                        { text: "Zaloguj się jako student", color: "primary", link: "/student/login/" },
                    ]}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home
