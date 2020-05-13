import React, { useState, useEffect, useContext } from 'react'

import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/auth';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import DataTable from '../../components/DataTable';

function AnkietaWypelnione() {
    const { decodedToken } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [ankiety, setAnkiety] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/ankieta/wypelnione/' + decodedToken.id_student)
            .then(res => res.json())
            .then(json => {
                convertAnkiety(json);
                setLoading(false);
            })
    }, [])

    const convertAnkiety = ankiety => {
        let newAnkiety = ankiety.map(ankieta => { return { id_ankieta: ankieta.id_ankieta, przedmiot: ankieta.nazwa, imie_nazwisko: ankieta.tytul + ' ' + ankieta.imie_nazwisko } })
        setAnkiety(newAnkiety);
    }

    const headers = ["ID", "Przedmiot", "Prowadzący", "Odpowiedzi"];
    const button = (id) => (<Button variant="contained" color="primary" component={Link} to={"/student/panel/ankieta_wypelniona/" + id}>Zobacz</Button>)

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Wypełnione ankiety</Typography>
            </Box>
            { loading ? <CircularProgress /> : <DataTable idName="id_ankieta" headers={headers} data={ankiety} button={button} />}
        </div>
    )
}

export default AnkietaWypelnione