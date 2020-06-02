import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    card: {
        margin: '1em 0',
    },
});

function RankingProwadzacy() {
    const classes = useStyles();
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/wyniki/ranking')
            .then(res => res.json())
            .then(json => {
                setRanking(json);
                setLoading(false);
            })
    }, [])

    const calculateScore = (points, count) => Number(100 * points / count / 4).toFixed(2);

    const rankingDisplay = rows => (
        <>
            {Object.keys(rows).map((key) =>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom>
                            {key}
                        </Typography>
                        <LinearProgress variant="determinate" value={calculateScore(ranking[key].points, ranking[key].count)} />
                        <Typography variant="body2" component="p">
                            {calculateScore(ranking[key].points, ranking[key].count)}%
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
                {!loading && rankingDisplay(ranking)}
            </Box>
        </div>
    )
}

export default RankingProwadzacy
