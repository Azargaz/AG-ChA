import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import DataTable from '../../components/DataTable';

function AnkietaWyniki() {
    const [ankiety, setAnkiety] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/wyniki/')
            .then(res => res.json())
            .then(json => {
                convertAnkiety(json);
                setLoading(false);
            })
    }, [])

    const convertAnkiety = ankiety => {
        let newAnkiety = ankiety.map(ankieta => { return { id_ankieta: ankieta.id_ankieta, pelna_nazwa: ankieta.pelna_nazwa, nazwa: ankieta.nazwa, imie_nazwisko: ankieta.imie_nazwisko } })
        setAnkiety(newAnkiety);
    }

    const headers = ["ID", "Kierunek", "Przedmiot", "Prowadzący", "Wyniki"];
    const button = (id) => <Button variant="contained" color="primary" component={Link} to={"/pracownik/panel/wynik/"+id}>Sprawdź</Button>;

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Ankiety</Typography>
            </Box>
            { loading ? <CircularProgress /> : <DataTable idName="id_ankieta" headers={headers} data={ankiety} button={button} />}
        </div>
    )
}

export default AnkietaWyniki
