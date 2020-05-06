import React from 'react'

import Grid from '@material-ui/core/Grid';

import Image from '../components/Image';
import LogoAGH from '../img/logo_agh.jpg';
import ButtonList from '../components/ButtonList';

function PanelPracownik() {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid item md={3}>
                <Image src={LogoAGH}/>
                <Grid container justify="center" alignItems="center" spacing={3}>
                    <ButtonList buttons={[
                        { text: "Dodaj ankietę", color: "primary", link: "/" },
                        { text: "Zobacz wyniki ankiet", color: "primary", link: "/" },
                        { text: "Porównaj prowadzących", color: "primary", link: "/" },
                        { text: "Wyświetl ranking prowadzących", color: "primary", link: "/" },
                        { text: "Wyloguj", color: "secondary", link: "/" }
                    ]}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PanelPracownik
