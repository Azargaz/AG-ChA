import React, { useState } from 'react'

import history from '../../utils/history';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../../components/LoginForm';
import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh.jpg';

function LoginStudent() {
    const [formData, setFormData] = useState({
        indeks: '',
        PESEL: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        console.log(formData);
        setLoading(true);
        setTimeout(() => {
            history.push("/student/panel/");
            setLoading(false);
        }, 500)
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={3}>
                <Image src={LogoAGH}/>
                <LoginForm 
                    fields={[
                        { name: "indeks", type: "text", label: "Numer indeksu" },
                        { name: "PESEL", type: "password", label: "PESEL" }
                    ]}
                    button={{
                        color: "primary",
                        text: "Zaloguj"
                    }}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange} 
                    loading={loading}
                />
            </Grid>
        </Grid>
    )
}

export default LoginStudent
