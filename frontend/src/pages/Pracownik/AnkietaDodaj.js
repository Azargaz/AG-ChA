import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import WyborProwadzacego from './WyborProwadzacego';
import WyborStudentow from './WyborStudentow';

function getSteps() {
    return ['Wybierz wydział, kierunek, przedmiot i prowadzącego', 'Dodaj studentów', 'Ustaw datę'];
}

const defaultParams = {
    id_wydzial: '',
    id_kierunek: '',
    id_przedmiot: '',
    id_prowadzacy: '',
    studenci: [],
    data: ''
}

function AnkietaDodaj() {
    const [params, setParams] = useState(defaultParams)

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
        case 0:
            return (<WyborProwadzacego params={params} setParams={setParams} />);
        case 1:
            return (<WyborStudentow params={params} setParams={setParams} />);
        case 2:
            return (<Grid container justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <TextField
                                id="date"
                                label="Data zamknięcia ankiety"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                margin="normal"
                                onChange={(event) => setParams({ ...params, data: event.target.value})}
                            />
                        </Grid>
                    </Grid>
                );
        default:
            return 'Unknown stepIndex';
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    const handleReset = () => {
        setActiveStep(0);
        setParams(defaultParams);
    };

    const checkIfReadyForNext = () => {
        switch(activeStep) {
            case 0:
                return params.id_prowadzacy !== '';
            case 1:
                return params.studenci.length > 0;
            case 2:
                return params.data !== '';
            default:
                return 'Unknown activeStep';
        }
    }

    return (
        <div>
            <Box m={3}>
                <Typography align="center" variant="h4" margin={5}>Dodaj ankietę</Typography>
            </Box>
            <Box m={3}>
                <Typography align="center" variant="body2" margin={3}>{steps[activeStep]}</Typography>
            </Box>
            {activeStep < steps.length && (
                getStepContent(activeStep)
            )}
            <Grid container justify="center">
                {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Wróć
                </Button> */}
                {activeStep < steps.length ? (
                    <Button variant="contained" color="primary" onClick={handleNext} disabled={!checkIfReadyForNext()}>
                        Dalej
                    </Button>
                ) : (
                    <>
                        <Button color="secondary" onClick={handleReset}>Reset</Button>
                        <Button variant="contained" color="primary" onClick={handleReset}>Wyślij</Button>
                    </>
                )}
            </Grid>
        </div>
    )
}

export default AnkietaDodaj