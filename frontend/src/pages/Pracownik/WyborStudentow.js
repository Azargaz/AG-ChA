import React from 'react'

import Grid from '@material-ui/core/Grid';

import CheckboxList from '../../components/CheckboxList';

function WyborStudentow() {
    return (
        <Grid container justify="center" alignItems="center" spacing={0}>
            <Grid item xs={10}>
                <CheckboxList />
            </Grid>
        </Grid>
    )
}

export default WyborStudentow
