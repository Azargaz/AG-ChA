import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import DataTable from '../../components/DataTable';

function AnkietaDoWypelnienia() {
    const [loading, setLoading] = useState(false);

    const data = [
        { id: "0", name: "Matematyka", prof: "Jan Kowalski" },
        { id: "1", name: "Matematyka", prof: "Jan Kowalski" },
        { id: "2", name: "Matematyka", prof: "Jan Kowalski" },
    ]

    const headers = ["ID", "Przedmiot", "Prowadzący", "Ankieta"];
    const button = (id) => (<Button variant="contained" color="primary" component={Link} to={"/student/panel/ankieta/" + id}>Wypełnij</Button>)

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Ankiety do wypełnienia</Typography>
            </Box>
            { loading ? <CircularProgress /> : <DataTable headers={headers} data={data} button={button} />}
        </div>
    )
}

export default AnkietaDoWypelnienia