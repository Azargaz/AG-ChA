const router = require('express').Router();
const db = require('./polaczenie');

////wybor wydzialu
router.get('/wydzial', (req, res) => {
	db.query('select nazwa_skrocona from projekt.wydzial')
		.then((result) => {
			res.status(201).json(result.rows);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: 'error',
				error: err.message,
			});
		});
});

///wybor kierunku
router.get('/kierunek/', (req, res) => {
	const { wydzial } = req.body;

	db.query(
		'with cte as (select id_wydzial from projekt.wydzial where nazwa_skrocona = $1 ) select k.pelna_nazwa from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial',
		[wydzial]
	)
		.then((result) => {
			res.status(201).json(result.rows);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: 'error',
				error: err.message,
			});
		});
});

///wybor Przedmiotu
router.get('/przedmiot', (req, res) => {
	const { wydzial } = req.body;
	const { kierunek } = req.body;

	db.query(
		'with cte2 as (with cte as (select id_wydzial from projekt.wydzial where nazwa_skrocona = $1 ) select k.id_kierunek from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial where k.pelna_nazwa = $2) select p.nazwa from projekt.przemiot join cte2 on p.id_kierunek = cte2.id_kierunek ',
		[wydzial, kierunek]
	)
		.then((result) => {
			res.status(201).json(result.rows);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: 'error',
				error: err.message,
			});
		});
});

///wybor Prowadzacego
router.get('/prowadzacy', (req, res) => {
	const { wydzial } = req.body;
	const { kierunek } = req.body;
	const { przedmiot } = req.body;

	db.query(
		'with cte3 as( with cte2 as (with cte as (select id_wydzial from projekt.wydzial where nazwa_skrocona = $1 ) select k.id_kierunek from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial where k.pelna_nazwa = $2) select id_przedmiot from projekt.przemiot join cte2 on p.id_kierunek = cte2.id_kierunek where p.nazwa = $3) select pr.tytul,pr.imie,pr.nazwisko from  projekt.prowadzacy pr join cte3 on pr.id_przedmiot = cte3.id_przedmiot ',
		[wydzial, kierunek, przedmiot]
	)
		.then((result) => {
			res.status(201).json(result.rows);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: 'error',
				error: err.message,
			});
		});
});

////dodawanie ankiety
router.post('/', (req, res) => {
	const { id_prowadzacy } = req.body;
    const { data_zamkniecia } = req.body;
	const { lista_studentow } = req.body;

	db.query(
		'INSERT INTO projekt.ankieta(id_prowadzacy, data_zamkniecia) VALUES ($1, $2) RETURNING ankieta.id_ankieta',
		[id_prowadzacy, data_zamkniecia]
	)
		.then((result) => {
            console.log('INSERT 1 - ok');
            const { id_ankieta } = result.rows[0];            
			const query = 'INSERT INTO projekt.student_ankieta VALUES ' + ankietaMultirowInsert(lista_studentow, id_ankieta) + ';';
			db.query(
				query,
				lista_studentow
			)
				.then((result) => {
                    console.log('INSERT 2 - ok');
					res.status(201).json({
						status: 'ok',
					});
				})
				.catch((err) => {
					console.error(err);
					res.status(500).json({
						status: 'error',
						error: err.message,
					});
				});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: 'error',
				error: err.message,
			});
		});
});

const ankietaMultirowInsert = (rows, id_ankieta) => {
	rows = rows.map((row, index) => `(${id_ankieta}, $${index+1}, false)`);
	return rows.join();
};

module.exports = router;