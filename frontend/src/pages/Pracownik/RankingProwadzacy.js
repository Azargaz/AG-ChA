import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import SelectList from '../../components/SelectList';

const useStyles = makeStyles({
    card: {
        margin: '1em 0',
    },
});

function RankingProwadzacy() {
    const classes = useStyles();
    const [wydzialy, setWydzialy] = useState([]);
    const [id_wydzial, setId_wydzial] = useState('');
    const [ranking, setRanking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/dodajankiete/wydzial')
            .then(res => res.json())
            .then(json => {
                setWydzialy(json);
                setLoading(false);
            })
    }, [])

    const handleChange = (event) => {
        setId_wydzial(event.target.value);
    }

    const handleSubmit = () => {
        if(id_wydzial === '') return;
        
        fetch('http://localhost:3001/wyniki/ranking/' + id_wydzial)
            .then(res => res.json())
            .then(json => {
                setRanking(json);
            })
    }

    const rankingDisplay = rows => (
        <>
            <Typography align="center" variant="h5" margin={5}>Prowadzący na wydziale {wydzialy.filter(wydzial => wydzial.id_wydzial === id_wydzial)[0].nazwa_skrocona}</Typography>
            {Object.keys(rows).map((key) =>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom>
                            {key}
                        </Typography>
                        <LinearProgress variant="determinate" value={ranking[key]} />
                        <Typography variant="body2" component="p">
                            {ranking[key]}%
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    )

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Ranking prowadzących</Typography>
                {!loading && 
                <Box my={3} mx={25}>
                    <SelectList 
                        label="Wydział" 
                        idName="id_wydzial" 
                        name="nazwa_skrocona"
                        value={id_wydzial} 
                        itemList={wydzialy} 
                        loading={false}
                        disabled={false}
                        handleChange={handleChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={id_wydzial === ''}>Wyświetl</Button>
                </Box>}
                {ranking !== null && 
                rankingDisplay(ranking)}
            </Box>
        </div>
    )
}

export default RankingProwadzacy
