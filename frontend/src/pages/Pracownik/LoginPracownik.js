import React, { useState } from 'react'

import history from '../../utils/history';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../../components/LoginForm';
import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh.jpg';

function LoginPracownik() {
    const [formData, setFormData] = useState({
        login: '',
        haslo: ''
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        console.log(formData);
        history.push("/pracownik/panel/");
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={3}>
                <Image src={LogoAGH}/>
                <LoginForm fields={[
                    { name: "login", type: "text", label: "Login" },
                    { name: "haslo", type: "password", label: "Hasło" }
                ]}
                button={{
                    color: "primary",
                    text: "Zaloguj"
                }}
                handleSubmit={handleSubmit}
                handleChange={handleChange} />
            </Grid>
        </Grid>
    )
}

export default LoginPracownik
