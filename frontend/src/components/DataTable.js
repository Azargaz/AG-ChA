import React from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function DataTable(props) {
    const { idName, headers, data, button } = props;

    return (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableCell key={header} align={index === 0 ? "left" : "right"}>{header}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row, index) => (                    
                <TableRow key={index}>
                    {Object.keys(row).map((key, index) => (
                        <TableCell key={key} align={index === 0 ? "left" : "right"}>
                            {row[key]}
                        </TableCell>
                    ))}
                    <TableCell align="right">
                        {button(row[idName])}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    )
}

export default DataTable
