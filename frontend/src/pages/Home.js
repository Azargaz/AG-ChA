import React from 'react'

import Grid from '@material-ui/core/Grid';

import Image from '../components/Image';
import { Typography } from '@material-ui/core';

function Home() {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={3}>
                <Image src="./logo_agh.jpg"/>
                <Typography align="center" variant="h4">
                    Strona główna
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Home
