import React from 'react'

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import DataTable from '../../components/DataTable';

function AnkietaWyniki() {
    const data = [
        { id: "0", wydzial: "WFiIS", kierunek: "Fizyka Techniczna", przedmiot: "Matematyka", prowadzacy: "Jan Kowalski", zamknieta: "X" },
        { id: "1", wydzial: "WFiIS", kierunek: "Fizyka Techniczna", przedmiot: "Matematyka", prowadzacy: "Jan Kowalski", zamknieta: "" },
        { id: "2", wydzial: "WFiIS", kierunek: "Fizyka Techniczna", przedmiot: "Matematyka", prowadzacy: "Jan Kowalski", zamknieta: "X" },
    ]

    const headers = ["ID", "Wydział", "Kierunek", "Przedmiot", "Prowadzący", "Zamknięta", "Wyniki"];
    const button = (id) => <Button variant="contained" color="primary" component={Link} to={"/pracownik/panel/wyniki/"+id}>Sprawdź</Button>;

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Ankiety</Typography>
            </Box>
            <DataTable headers={headers} data={data} button={button} />
        </div>
    )
}

export default AnkietaWyniki
