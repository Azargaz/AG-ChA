import React from 'react'

import Grid from '@material-ui/core/Grid';

import Image from '../components/Image';
import LogoAGH from '../img/logo_agh.jpg';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import QuestionsTable from '../components/QuestionsTable';

function Home() {
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

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={10}>
                <Image src={LogoAGH}/>
                <Box m={3}>
                    <Typography align="center" variant="h4">
                        Strona główna
                    </Typography>
                </Box>
                <QuestionsTable headers={headers} data={data} openQuestions={open}/>
            </Grid>
        </Grid>
    )
}

export default Home
