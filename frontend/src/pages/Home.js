import React from 'react'

import Grid from '@material-ui/core/Grid';

import Image from '../components/Image';
import LogoAGH from '../img/logo_agh.jpg';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Home() {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={10}>
                <Image src={LogoAGH}/>
                <Box m={3}>
                    <Typography align="center" variant="h4">
                        Strona główna
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Home
