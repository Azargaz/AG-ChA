import React, { useState, useEffect, useContext } from 'react'

import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/auth';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import DataTable from '../../components/DataTable';
import { API_URL } from '../../utils/config';

function AnkietaDoWypelnienia() {
    const { decodedToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [ankiety, setAnkiety] = useState([]);

    useEffect(() => {
        fetch(API_URL + '/ankieta/dowypelnienia/' + decodedToken.id_student)
            .then(res => res.json())
            .then(json => {
                convertAnkiety(json);
                setLoading(false);
            })
    }, [])

    const headers = ["ID", "Przedmiot", "Prowadzący", "Ankieta"];
    const button = (id) => (<Button variant="contained" color="primary" component={Link} to={"/student/panel/ankieta/" + id}>Wypełnij</Button>)

    const convertAnkiety = ankiety => {
        let newAnkiety = ankiety.map(ankieta => { return { id_ankieta: ankieta.id_ankieta, przedmiot: ankieta.nazwa, imie_nazwisko: ankieta.tytul + ' ' + ankieta.imie_nazwisko } })
        setAnkiety(newAnkiety);
    }

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Ankiety do wypełnienia</Typography>
            </Box>
            { loading ? <CircularProgress /> : ankiety.length > 0 ? 
            <DataTable idName="id_ankieta" headers={headers} data={ankiety} button={button} /> 
            : 
            <Typography align="center" variant="body1" margin={5}>Brak ankiet do wyświetlenia...</Typography>}
            <Grid container justify="center">
                <Box m={3}>
                    <Button variant="contained" color="primary" component={Link} to="/student/panel">Powrót</Button>
                </Box>
            </Grid>
        </div>
    )
}

export default AnkietaDoWypelnienia