import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';

import CheckboxList from '../../components/CheckboxList';

function WyborStudentow(props) {
    const { params, setParams } = props;
    const [studenci, setStudenci] = useState([])

    useEffect(() => {
        async function fetchStudenci() {
            let response = await fetch('http://localhost:3001/dodajankiete/studenci/' + params.id_wydzial);
            response.json().then(json => setStudenci(json));
        }

        if(studenci.length <= 0 && params.id_wydzial !== '' && params.id_kierunek !== '' && params.id_przedmiot !== '' && params.id_prowadzacy !== '')
            fetchStudenci();
    }, [params])

    const labelFunction = (data) => {
        return `${data.imie} ${data.nazwisko}`
    }
    
    const handleChange = (values) => {
        setParams({
            ...params,
            studenci: values
        });
    }

    return (
        <Grid container justify="center" alignItems="center" spacing={0}>
            <Grid item xs={10}>
                {studenci.length > 0 && <CheckboxList idName="id_student" data={studenci} labelFunction={labelFunction} onChange={handleChange} />}
            </Grid>
        </Grid>
    )
}

export default WyborStudentow
