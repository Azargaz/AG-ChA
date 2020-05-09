import React from 'react'
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function ButtonList(props) {
    const { buttons } = props;

    return (
        <Grid container justify="center" alignItems="center" spacing={4}>
            {buttons.map((button, index) => (
                <Grid item xs={8} key={index}>
                    <Button fullWidth variant="contained" component={Link} color={button.color} to={button.link}>{button.text}</Button>
                </Grid>
            ))}
        </Grid>
    )
}

export default ButtonList
