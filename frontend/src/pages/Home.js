import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    center: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    }
}));

function Home() {
    const classes = useStyles();

    return (
        <Grid 
            container
            justify="center" 
            alignItems="center" 
            spacing={3}
        >
            <Grid item xs={12}>
                <img src="./logo_agh.jpg" height="250" className={classes.center}></img>
            </Grid>
            <Grid item xs={6}>
                Home
            </Grid>
        </Grid>
    )
}

export default Home
