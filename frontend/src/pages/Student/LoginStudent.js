import React, { useState, useContext } from 'react'

import { AuthContext } from '../../utils/auth';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../../components/LoginForm';
import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh.jpg';

function LoginStudent() {
    const { authenticateStudent, setDecodedToken, setAuthenticated } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        indeks: '',
        pesel: ''
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
        authenticateStudent(formData, setDecodedToken, setAuthenticated, () => {
            setLoading(false);
        });
    }

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={3}>
                <Image src={LogoAGH}/>
                <LoginForm 
                    fields={[
                        { name: "indeks", type: "text", label: "Numer indeksu" },
                        { name: "pesel", type: "password", label: "PESEL" }
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
