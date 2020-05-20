import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ClosedQuestion from './ClosedQuestion';
import OpenQuestion from './OpenQuestion';

function QuestionsTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);

    const { headers, data, openQuestions, onUpdateAnswer, answers, disabled } = props;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const getAnswer = (id) => {
        const index = answers.findIndex(answer => answer.id === Number(id));
        return index === -1 ? '' : answers[index].odp;
    }

    return (
        <div>
        <Paper>
            <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={header} align={index === headers.length-1 ? "center" : "left"}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (                    
                        <TableRow key={index}>
                            {Object.keys(row).map((key, index) => (
                                <TableCell key={key} align="left">
                                    {row[key]}
                                </TableCell>
                            ))}
                            <TableCell align="center" style={{"whiteSpace": 'nowrap'}}>
                                {openQuestions.includes(Number(row["id"])) ? (
                                    <OpenQuestion id={row["id"]} onUpdateAnswer={onUpdateAnswer} answer={getAnswer(row["id"])} disabled={disabled} /> 
                                ) : (
                                    <ClosedQuestion id={row["id"]} onUpdateAnswer={onUpdateAnswer} answer={getAnswer(row["id"])} disabled={disabled} />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 98.8 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[1, 3, 10]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage="Pytania na strone: "
            />
        </Paper>
        </div>
    )
}

export default QuestionsTable;