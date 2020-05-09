import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid';

import SelectList from '../../components/SelectList';

function WyborProwadzacego(props) {
    const { params, setParams } = props;

    const [wydzialy, setWydzialy] = useState([
        {"id_wydzial": "1", "nazwa": "xxxxx"}, 
        {"id_wydzial": "2", "nazwa": "yyyyy"}
    ])

    const [kierunki, setKierunki] = useState([
        {"id_kierunek": "1", "nazwa": "zzzzzz"}, 
        {"id_kierunek": "2", "nazwa": "wwwwww"}
    ])

    const [przedmioty, setPrzedmioty] = useState([
        {"id_przedmiot": "1", "nazwa": "aaaaaa"}, 
        {"id_przedmiot": "2", "nazwa": "bbbbbb"}
    ])

    const [prowadzacy, setProwadzacy] = useState([
        {"id_prowadzacy": "1", "nazwa": "cccccc"}, 
        {"id_prowadzacy": "2", "nazwa": "dddddd"}
    ])

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        setParams({
            ...params,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Grid container justify="center" alignItems="center" spacing={0}>
            <Grid item xs={8}>
                <SelectList 
                    label="Wydział" 
                    idName="id_wydzial" 
                    name="nazwa"
                    value={params['id_wydzial']} 
                    itemList={wydzialy} 
                    loading={false}
                    disabled={false}
                    handleChange={handleChange}
                />
            </Grid>
            <Grid item xs={8}>
                <SelectList 
                    label="Kierunek" 
                    idName="id_kierunek" 
                    name="nazwa"
                    value={params['id_kierunek']} 
                    itemList={kierunki} 
                    loading={false}
                    disabled={false}
                    handleChange={handleChange}
                />
            </Grid>
            <Grid item xs={8}>
                <SelectList 
                    label="Przedmioty" 
                    idName="id_przedmiot" 
                    name="nazwa"
                    value={params['id_przedmiot']} 
                    itemList={przedmioty} 
                    loading={false}
                    disabled={false}
                    handleChange={handleChange}
                />
            </Grid>
            <Grid item xs={8}>
                <SelectList 
                    label="Prowadzący" 
                    idName="id_prowadzacy" 
                    name="nazwa"
                    value={params['id_prowadzacy']} 
                    itemList={prowadzacy} 
                    loading={false}
                    disabled={false}
                    handleChange={handleChange}
                /> 
            </Grid>
        </Grid>
    )
}

export default WyborProwadzacego
