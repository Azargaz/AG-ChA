import React, { useState, useEffect, useContext } from 'react'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import QuestionsTable from '../../components/QuestionsTable';
import history from '../../utils/history';
import { AuthContext } from '../../utils/auth';

function Ankieta(props) {
    const { id } = props.match.params;
    
    const { decodedToken } = useContext(AuthContext);
    const { id_student } = decodedToken;

    const headers = ["Nr", "Pytanie", "Odpowiedź"];
    const [otwarte, setOtwarte] = useState([])
    const [pytania, setPytania] = useState([])
    const [odpowiedzi, setOdpowiedzi] = useState([])

    useEffect(() => {
        fetch('http://http://3.95.32.80:3001/odpowiedzi/ankieta/' + id)
            .then(res => res.json())
            .then(json => {
                getPytania(json);
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

    const updateOdpowiedz = (id, odp) => {
        const index = odpowiedzi.findIndex((odpowiedz) => odpowiedz.id === Number(id));
        if(index === -1) {
            setOdpowiedzi([
                ...odpowiedzi,
                { id: Number(id), odp }                
            ])
        } 
        else {
            setOdpowiedzi([
                ...odpowiedzi.slice(0, index),
                { id: Number(id), odp },
                ...odpowiedzi.slice(index+1)
            ])
        }
    }

    const handleSubmit = async () => {
        for(let i = 0; i < odpowiedzi.length; i++) {
            const odpowiedz = odpowiedzi[i];
            const t = await fetch('http://http://3.95.32.80:3001/odpowiedzi/' + id, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({
                    tresc: odpowiedz.odp,
                    id_student,
                    id_pytanie: odpowiedz.id
                })
            })

            if(i === odpowiedzi.length-1) {
                await fetch('http://http://3.95.32.80:3001/odpowiedzi/wypelniona/' + id, { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify({
                        id_student
                    })
                })
                history.push("/student/panel/");
            }
        } 
    }

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Wypełnij ankietę</Typography>
            </Box>
            <QuestionsTable headers={headers} data={pytania} openQuestions={otwarte} onUpdateAnswer={updateOdpowiedz} answers={odpowiedzi} disabled={false} />
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={odpowiedzi.length < pytania.length}>Wyślij</Button>
        </div>
    )
}

export default Ankieta
