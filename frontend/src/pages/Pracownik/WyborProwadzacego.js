import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';

import SelectList from '../../components/SelectList';

function WyborProwadzacego(props) {
    const { params, setParams } = props;

    useEffect(() => {
        async function fetchWydzialy() {
            let response = await fetch('http://localhost:3001/dodajankiete/wydzial');
            response.json().then(json => setWydzialy(json));
        }
        async function fetchKierunki() {
            let response = await fetch('http://localhost:3001/dodajankiete/kierunek/' + params.id_wydzial);
            response.json().then(json => setKierunki(json));
        }
        async function fetchPrzedmioty() {
            let response = await fetch(`http://localhost:3001/dodajankiete/przedmiot/${params.id_wydzial}/${params.id_kierunek}`);
            response.json().then(json => setPrzedmioty(json));
        }
        async function fetchProwadzacy() {
            let response = await fetch(`http://localhost:3001/dodajankiete/prowadzacy/${params.id_wydzial}/${params.id_kierunek}/${params.id_przedmiot}`);
            response.json().then(json => setProwadzacy(json));
        }

        if(params.id_wydzial === '')
            fetchWydzialy();
        if(params.id_wydzial !== '' && params.id_kierunek === '')
            fetchKierunki();
        if(params.id_wydzial !== '' && params.id_kierunek !== '' && params.id_przedmiot === '')
            fetchPrzedmioty();
        if(params.id_wydzial !== '' && params.id_kierunek !== '' && params.id_przedmiot !== '' && params.id_prowadzacy === '')
            fetchProwadzacy();
    }, [params])

    const [wydzialy, setWydzialy] = useState([])
    const [kierunki, setKierunki] = useState([])
    const [przedmioty, setPrzedmioty] = useState([])
    const [prowadzacy, setProwadzacy] = useState([])

    const handleChange = (event) => {
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
                    name="nazwa_skrocona"
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
                    name="pelna_nazwa"
                    value={params['id_kierunek']} 
                    itemList={kierunki} 
                    loading={false}
                    disabled={params['id_wydzial'] === ''}
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
                    disabled={params['id_kierunek'] === ''}
                    handleChange={handleChange}
                />
            </Grid>
            <Grid item xs={8}>
                <SelectList 
                    label="Prowadzący" 
                    idName="id_prowadzacy" 
                    name="imie_nazwisko"
                    value={params['id_prowadzacy']} 
                    itemList={prowadzacy} 
                    loading={false}
                    disabled={params['id_przedmiot'] === ''}
                    handleChange={handleChange}
                /> 
            </Grid>
        </Grid>
    )
}

export default WyborProwadzacego
