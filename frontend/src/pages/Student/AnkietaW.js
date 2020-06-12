import React, { useState, useEffect, useContext } from 'react'

import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import QuestionsTable from '../../components/QuestionsTable';
import { AuthContext } from '../../utils/auth';
import { API_URL } from '../../utils/config';

function AnkietaW(props) {
    const { id } = props.match.params;

    const { decodedToken } = useContext(AuthContext);
    const { id_student } = decodedToken;

    const headers = ["Nr", "Pytanie", "Odpowiedź"];
    const [otwarte, setOtwarte] = useState([])
    const [pytania, setPytania] = useState([])
    const [odpowiedzi, setOdpowiedzi] = useState([])

    useEffect(() => {
        fetch(API_URL + '/odpowiedzi/ankieta/' + id)
            .then(res => res.json())
            .then(json => {
                getPytania(json);
            })
        fetch(API_URL + '/odpowiedzi/' + id + '/' + id_student)
            .then(res => res.json())
            .then(json => {
                getOdpowiedzi(json);
            })
    }, [])

    const getPytania = (pyt) => {
        const otw = [];
        pyt = pyt.map(pytanie => { 
            const id = Number(pytanie.id_pytanie);
            if(pytanie.pytanie_otwarte === true) otw.push(id);
            return { id, tresc: pytanie.tresc_pyt }
        })
        setPytania(pyt);
        setOtwarte(otw);
    }

    const getOdpowiedzi = (odp) => {
        odp = odp.map(odpowiedz => { 
            return { id: Number(odpowiedz.id_pytanie), odp: odpowiedz.tresc_odp }
        })
        setOdpowiedzi(odp);
    }

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Wypełnij ankietę</Typography>
            </Box>
            <QuestionsTable headers={headers} data={pytania} openQuestions={otwarte} answers={odpowiedzi} disabled={true} />
            <Button variant="contained" color="primary" component={Link} to={"/student/panel/poprzednie_ankiety/"}>Powrót</Button>
        </div>
    )
}

export default AnkietaW
