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

function Image(props) {
    const classes = useStyles();
    const { src } = props;

    return (
        <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12}>
                <img src={src} alt="" height="250" className={classes.center}></img>
            </Grid>
        </Grid>
    )
}

export default Image
