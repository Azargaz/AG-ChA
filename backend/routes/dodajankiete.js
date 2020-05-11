
const router = require('express').Router()

const db = require('./polaczenie')




////wybor wydzialu
router.get('/dodajankiete/wydzial', (req, res) => {


    db.query('select nazwa_skrocona from projekt.wydzial')
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})


///wybor kierunku
router.get('/dodajankiete/kierunek/', (req, res) => {


	 const { wydzial } = req.body.wydzial_skrot;///to sobie zmienisz tak jak masz w html js co nie?////

    db.query('with cte as (select id_wydzial from projekt.wydzial where nazwa_skrocona = $1 ) select k.pelna_nazwa from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial ', [wydzial])
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})



///wybor Przedmiotu
router.get('/dodajankiete/przedmiot', (req, res) => {

	const { wydzial } = req.body.wydzial_skrot;
	const { kierunek } = req.body.kierunek_nazwa;

    db.query('with cte2 as (with cte as (select id_wydzial from projekt.wydzial where nazwa_skrocona = $1 ) select k.id_kierunek from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial where k.pelna_nazwa = $2) select p.nazwa from projekt.przemiot join cte2 on p.id_kierunek = cte2.id_kierunek ',[wydzial,kierunek])
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})



///wybor Prowadzacego
router.get('/dodajankiete/prowadzacy', (req, res) => {

	const { wydzial } = req.body.wydzial_skrot;
	const { kierunek } = req.body.kierunek_nazwa;
	const { przedmiot } = req.body.przedmiot_nazwa;



    db.query('with cte3 as( with cte2 as (with cte as (select id_wydzial from projekt.wydzial where nazwa_skrocona = $1 ) select k.id_kierunek from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial where k.pelna_nazwa = $2) select id_przedmiot from projekt.przemiot join cte2 on p.id_kierunek = cte2.id_kierunek where p.nazwa = $3) select pr.tytul,pr.imie,pr.nazwisko from  projekt.prowadzacy pr join cte3 on pr.id_przedmiot = cte3.id_przedmiot ',[wydzial,kierunek,przedmiot])
        .then(result => {
            res.status(201).json(
                result.rows
            )
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })
})

////dodawanie ankiety

router.post('/dodajankiete', auth, (req, res) => {

    const { prowadzacy } = req.body.prowadzacy_id;

    const { data_zamkniecia} = req.body.data_zam;

     db.query('INSERT INTO projekt.ankieta VALUES (nextval(ankieta_id_ankieta_seq), $1, $2)', [prowadzacy, data_zamkniecia])
        .then(result => {
            res.status(201).json({
                status: "ok"
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                status: "error",
                error: err.message
            });
        })

    const { lista_studentow } = req.body.studenci;

/////tutaj potrzebny insert do student_ankieta (rozpakowanie listy)



})






module.exports = router;












