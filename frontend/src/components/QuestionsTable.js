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

/*
Przykład użycia:

const data = [
        { number: "1", question: "Zajęcia były prowadzone zgodnie z sylabusem przedmiotu/modułu (np. kryteria oceniania, wymiar godzin, osiągnięte efekty kształcenia)." },
        { number: "2", question: "Kryteria i zasady obliczania oceny końcowej lub zaliczenia zostały określone na pierwszych zajęciach." },
        { number: "3", question: "Zajęcia były należycie przygotowane przez prowadzącego" },
        { number: "4", question: "Osoba prowadząca zajęcia przekazywała wiadomości w sposób jasny  i zrozumiały" },
        { number: "5", question: "Lorem ipsum" },
        { number: "6", question: "Lorem ipsum" },
        { number: "7", question: "Lorem ipsum" },
        { number: "8", question: "Lorem ipsum" },
        { number: "9", question: "Lorem ipsum" },
    ]

    const open = [3, 4];    
    const headers = ["Nr", "Pytanie", "Odpowiedź"];

<QuestionsTable headers={headers} data={data} openQuestions={open}/>

*/

function QuestionsTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);

    const { headers, data, openQuestions } = props;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
                            <TableCell align="center">
                                {openQuestions.includes(Number(row.number)) ? <OpenQuestion/> : <ClosedQuestion/>}
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
            />
        </Paper>
        </div>
    )
}

export default QuestionsTable;