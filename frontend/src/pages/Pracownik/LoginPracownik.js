import React, { useState, useContext } from 'react'

import { AuthContext } from '../../utils/auth';
import history from '../../utils/history';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../../components/LoginForm';
import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh_kolor.png';

function LoginPracownik() {
    const { setDecodedToken, getDecodedToken, setAuthenticated, setToken } = useContext(AuthContext);
    const [authErrors, setAuthErrors] = useState(null);
    const [formData, setFormData] = useState({
        login: '',
        haslo: ''
    })
    const [loading, setLoading] = useState(false)

    const authenticatePracownik = () => {
        const { login, haslo } = formData;
        fetch('http://3.95.32.80:3001/users/pracowniklogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },        
            body: JSON.stringify({
                login,
                haslo
            })
        })
            .then(res => res.json())
            .then(json => {
                setLoading(false);

                if(json.token) {
                    setToken(json.token);
                    const decodedToken = getDecodedToken();
                    setAuthenticated(true);
                    setDecodedToken(decodedToken);
                    history.push("/pracownik/panel")
                }
                else if(json.error) {
                    setAuthErrors({
                        ...authErrors,
                        pracownik: json.error
                    })
                }
            })
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        if(formData.login !== '' && formData.haslo !== '') {
            setLoading(true);
            setAuthErrors(null);
            authenticatePracownik();
        }
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
                    errors={authErrors ? true : false}
                />
            </Grid>
        </Grid>
    )
}

export default LoginPracownik
