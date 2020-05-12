import React, { useState, useContext } from 'react'

import { AuthContext } from '../../utils/auth';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../../components/LoginForm';
import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh.jpg';

function LoginPracownik() {
    const { authenticatePracownik, setDecodedToken, setAuthenticated } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        login: '',
        haslo: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        setLoading(true);
        authenticatePracownik(formData, setDecodedToken, setAuthenticated, () => {
            setLoading(false);
        });
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={3}>
                <Image src={LogoAGH}/>
                <LoginForm 
                    fields={[
                        { name: "login", type: "text", label: "Login" },
                        { name: "haslo", type: "password", label: "Hasło" }
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

export default LoginPracownik
