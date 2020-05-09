import React from 'react'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import DataTable from '../../components/DataTable';

function AnkietaWyniki() {
    const data = [
        { wydzial: "WFiIS", kierunek: "Fizyka Techniczna", przedmiot: "Matematyka", prowadzacy: "Jan Kowalski", zamknieta: "X" },
        { wydzial: "WFiIS", kierunek: "Fizyka Techniczna", przedmiot: "Matematyka", prowadzacy: "Jan Kowalski", zamknieta: "" },
        { wydzial: "WFiIS", kierunek: "Fizyka Techniczna", przedmiot: "Matematyka", prowadzacy: "Jan Kowalski", zamknieta: "X" },
    ]

    const headers = ["Wydział", "Kierunek", "Przedmiot", "Prowadzący", "Zamknięta", "Wyniki"];
    const button = (<Button variant="contained" color="primary">Sprawdź</Button>)

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
