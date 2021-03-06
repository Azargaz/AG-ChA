import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    const { fields, button, handleSubmit, handleChange, loading, errors } = props;
    
    return (
        <form noValidate autoComplete="off">
            <Grid container direction="column" spacing={3}>
                {fields.map(field => (
                    <Grid item key={field.name}>
                        <TextField error={errors} fullWidth name={field.name} type={field.type} label={field.label} variant="outlined" onChange={handleChange} />
                    </Grid>
                ))}
                <Grid item>
                    <Grid container justify="center">
                        <Button variant="contained" color={button.color} className={classes.button} onClick={handleSubmit} disabled={loading}>
                            {loading ? <CircularProgress size={20} /> : button.text}
                        </Button>
                    </Grid>
                </Grid>
                {errors && 
                <Grid item>
                    <Grid container justify="center">
                        <FormHelperText id="my-helper-text" error={true} filled={true}>Błędne dane logowania!</FormHelperText>
                    </Grid>
                </Grid>}
            </Grid>
        </form>
    )
}

export default LoginForm
