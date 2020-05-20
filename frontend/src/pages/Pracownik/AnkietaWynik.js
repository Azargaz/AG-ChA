import React, { useState, useEffect } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function AnkietaWynik(props) {
    const { id_ankieta } = props.match.params;
    const [odpowiedzi, setOdpowiedzi] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/wyniki/odpowiedzi/' + id_ankieta)
            .then(res => res.json())
            .then(json => {
                getOdpowiedzi(json);
            })
    }, [])

    const getOdpowiedzi = odp => {
        odp = odp.reduce((filtered, odpowiedz) => {
            const index = filtered.findIndex(element => element.id_pytanie === odpowiedz.id_pytanie)
            if(index === -1) {
                filtered.push({ id_pytanie: odpowiedz.id_pytanie, [odpowiedz.tresc_odp]: odpowiedz.count })
            } else {
                filtered[index][odpowiedz.tresc_odp] = odpowiedz.count;
            }
            return filtered;
        }, [])
        setOdpowiedzi(odp);
    }

    const formatCount = count => count ? count : 0;

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Wyniki ankiety</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pytanie</TableCell>
                            <TableCell align="right">Nie</TableCell>
                            <TableCell align="right">Raczej nie</TableCell>
                            <TableCell align="right">Nie mam zdania</TableCell>
                            <TableCell align="right">Raczej tak</TableCell>
                            <TableCell align="right">Tak</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {odpowiedzi.map((odp) => (
                        <TableRow key={odp.id_pytanie}>
                            <TableCell component="th" scope="row">{odp.id_pytanie}</TableCell>
                            <TableCell align="right">{formatCount(odp['Nie'])}</TableCell>
                            <TableCell align="right">{formatCount(odp['Raczej nie'])}</TableCell>
                            <TableCell align="right">{formatCount(odp['Nie mam zdania'])}</TableCell>
                            <TableCell align="right">{formatCount(odp['Raczej tak'])}</TableCell>
                            <TableCell align="right">{formatCount(odp['Tak'])}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AnkietaWynik
