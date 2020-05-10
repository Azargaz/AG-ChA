import React, { useState } from 'react'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import QuestionsTable from '../../components/QuestionsTable';

function Ankieta(props) {
    const { id } = props.match.params;

    const data = [
        { id: "1", question: "Zajęcia były prowadzone zgodnie z sylabusem przedmiotu/modułu (np. kryteria oceniania, wymiar godzin, osiągnięte efekty kształcenia)." },
        { id: "2", question: "Kryteria i zasady obliczania oceny końcowej lub zaliczenia zostały określone na pierwszych zajęciach." },
        { id: "3", question: "Zajęcia były należycie przygotowane przez prowadzącego" },
        { id: "4", question: "Osoba prowadząca zajęcia przekazywała wiadomości w sposób jasny  i zrozumiały" },
        { id: "5", question: "Lorem ipsum" },
        { id: "6", question: "Lorem ipsum" },
        { id: "7", question: "Lorem ipsum" },
        { id: "8", question: "Lorem ipsum" },
        { id: "9", question: "Lorem ipsum" },
    ]

    const open = [3, 4];    
    const headers = ["Nr", "Pytanie", "Odpowiedź"];

    const [odpowiedzi, setOdpowiedzi] = useState([])

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

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Wypełnij ankietę</Typography>
            </Box>
            <QuestionsTable headers={headers} data={data} openQuestions={open} onUpdateAnswer={updateOdpowiedz} answers={odpowiedzi} />
        </div>
    )
}

export default Ankieta
