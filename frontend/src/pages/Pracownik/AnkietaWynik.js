import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { API_URL } from '../../utils/config';

function AnkietaWynik(props) {
    const { id_ankieta } = props.match.params;
    const [odpowiedzi, setOdpowiedzi] = useState([]);

    useEffect(() => {
        fetch(API_URL + '/wyniki/odpowiedzi/' + id_ankieta)
            .then(res => res.json())
            .then(json => {
                getOdpowiedzi(json);
            })
    }, [])

    const getOdpowiedzi = odp => {
        odp = odp.reduce((filtered, odpowiedz) => {
            const index = filtered.findIndex(element => element.id_pytanie === odpowiedz.id_pytanie)
            if(index === -1) {
                filtered.push({ id_pytanie: odpowiedz.id_pytanie, tresc: odpowiedz.tresc_pyt, [odpowiedz.tresc_odp]: odpowiedz.count })
            } else {
                filtered[index][odpowiedz.tresc_odp] = odpowiedz.count;
            }
            return filtered;
        }, [])
        odp = odp.sort((a, b) => a.id_pytanie - b.id_pytanie);
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
                            <TableCell>#</TableCell>
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
                            <TableCell>{odp.tresc}</TableCell>
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
            <Grid container justify="center">
                <Box m={3}>
                    <Button variant="contained" color="primary" component={Link} to="/pracownik/panel/wyniki/">
                        Powrót
                    </Button>
                </Box>                    
            </Grid>
        </div>
    )
}

export default AnkietaWynik
