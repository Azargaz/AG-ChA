import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import DataTable from '../../components/DataTable';

function AnkietaDoWypelnienia() {
    const [loading, setLoading] = useState(true);
    const [ankiety, setAnkiety] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/ankieta/dowypelnienia/1')
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
            { loading ? <CircularProgress /> : <DataTable idName="id_ankieta" headers={headers} data={ankiety} button={button} />}
        </div>
    )
}

export default AnkietaDoWypelnienia