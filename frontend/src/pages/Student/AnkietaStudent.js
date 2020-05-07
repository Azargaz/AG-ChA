import React from 'react'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import DataTable from '../../components/DataTable';

function AnkietaStudent() {
    const data = [
        { name: "Matematyka", prof: "Jan Kowalski" },
        { name: "Matematyka", prof: "Jan Kowalski" },
        { name: "Matematyka", prof: "Jan Kowalski" },
    ]

    const headers = ["Przedmiot", "Prowadzący", "Ankieta"];
    const button = (<Button variant="contained" color="primary">Wypełnij</Button>)

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Ankiety do wypełnienia</Typography>
            </Box>
            <DataTable headers={headers} data={data} button={button} />
        </div>
    )
}

export default AnkietaStudent