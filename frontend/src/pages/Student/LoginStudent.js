import React, { useState, useContext } from 'react'

import { AuthContext } from '../../utils/auth';
import history from '../../utils/history';
import Grid from '@material-ui/core/Grid';

import LoginForm from '../../components/LoginForm';
import Image from '../../components/Image';
import LogoAGH from '../../img/logo_agh_kolor.png';

function LoginStudent() {
    const { setDecodedToken, getDecodedToken, setAuthenticated, setToken } = useContext(AuthContext);
    const [authErrors, setAuthErrors] = useState(null);
    const [formData, setFormData] = useState({
        indeks: '',
        pesel: ''
    })
    const [loading, setLoading] = useState(false)

    const authenticateStudent = () => {
        const { indeks, pesel } = formData;
        fetch('http://3.95.32.80:3001/users/studentlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },        
            body: JSON.stringify({
                indeks,
                pesel
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
                    history.push("/student/panel")
                }
                else if(json.error) {
                    setAuthErrors({
                        ...authErrors,
                        student: json.error
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
        if(formData.indeks !== '' && formData.pesel !== '') {
            setLoading(true);
            setAuthErrors(null);
            authenticateStudent();
        }
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
                    errors={authErrors ? true : false}
                />
            </Grid>
        </Grid>
    )
}

export default LoginStudent
