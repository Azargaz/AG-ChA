import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid';

import CheckboxList from '../../components/CheckboxList';

function WyborStudentow(props) {
    const { params, setParams } = props;
    const [studenci, setStudenci] = useState([
        { id: 0, imie: "Jan", nazwisko: "Kowalski" },
        { id: 1, imie: "Jan", nazwisko: "Kowalski" },
        { id: 2, imie: "Jan", nazwisko: "Kowalski" },
    ])

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
                <CheckboxList data={studenci} labelFunction={labelFunction} onChange={handleChange} />
            </Grid>
        </Grid>
    )
}

export default WyborStudentow
