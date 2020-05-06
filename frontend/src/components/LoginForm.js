import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    fullWidth: {
        flexGrow: 1,
    },
    button: {
        marginLeft: "auto",
        marginRight: "auto"
    }
}));

function LoginForm(props) {
    const classes = useStyles();
    const { fields, button, handleSubmit, handleChange } = props;

    return (
        <form noValidate autoComplete="off">
            <Grid container direction="column" spacing={3}>
                {fields.map(field => (
                    <Grid item key={field.name}>
                        <TextField fullWidth name={field.name} type={field.type} label={field.label} variant="outlined" onChange={handleChange} />
                    </Grid>
                ))}
                <Grid item>
                    <Grid container justify="center">
                        <Button variant="contained" color={button.color} className={classes.button} onClick={handleSubmit}>
                            {button.text}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default LoginForm
