import React from 'react'

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import DataTable from '../../components/DataTable';

function AnkietaWypelnione() {
    const data = [
        { id: "0", name: "Matematyka", prof: "Jan Kowalski" },
        { id: "1", name: "Matematyka", prof: "Jan Kowalski" },
        { id: "2", name: "Matematyka", prof: "Jan Kowalski" },
    ]

    const headers = ["ID", "Przedmiot", "Prowadzący", "Odpowiedzi"];
    const button = (id) => (<Button variant="contained" color="primary" component={Link} to={"/student/panel/ankieta_wypelniona/" + id}>Zobacz</Button>)

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Wypełnione ankiety</Typography>
            </Box>
            <DataTable headers={headers} data={data} button={button} />
        </div>
    )
}

export default AnkietaWypelnione