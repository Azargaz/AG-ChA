const router = require('express').Router();
const db = require('./polaczenie');
const functions = require("../functions")
////wybor wydzialu
router.get('/wydzial', (req, res) => {
	db.query('select id_wydzial, nazwa_skrocona from projekt.wydzial')
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
router.get('/kierunek/:wydzial', (req, res) => {
	const { wydzial } = req.params;

	db.query(
		'with cte as (select id_wydzial from projekt.wydzial where id_wydzial = $1 ) select k.id_kierunek, k.pelna_nazwa from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial',
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
router.get('/przedmiot/:wydzial/:kierunek', (req, res) => {
	const { wydzial } = req.params;
	const { kierunek } = req.params;

	db.query(
		'with cte2 as (with cte as (select id_wydzial from projekt.wydzial where id_wydzial = $1 ) select k.id_kierunek from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial where k.id_kierunek = $2) select p.id_przedmiot, p.nazwa from projekt.przedmiot p join cte2 on p.id_kierunek = cte2.id_kierunek ',
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
router.get('/prowadzacy/:wydzial/:kierunek/:przedmiot', (req, res) => {
	const { wydzial } = req.params;
	const { kierunek } = req.params;
	const { przedmiot } = req.params;

	db.query(
		'with cte3 as( with cte2 as (with cte as (select id_wydzial from projekt.wydzial where id_wydzial = $1 ) select k.id_kierunek from projekt.kierunek k join cte on k.id_wydzial = cte.id_wydzial where k.id_kierunek = $2) select id_przedmiot from projekt.przedmiot p join cte2 on p.id_kierunek = cte2.id_kierunek where p.id_przedmiot = $3) select pr.id_prowadzacy, pr.imie_nazwisko from  projekt.prowadzacy pr join cte3 on pr.id_przedmiot = cte3.id_przedmiot ',
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

///wybor Prowadzacego
router.get('/studenci/:wydzial', (req, res) => {
	const { wydzial } = req.params;

	db.query(
		'select s.id_student, s.imie, s.nazwisko from projekt.student s where s.id_wydzial = $1',
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

////dodawanie ankiety
router.post('/', (req, res) => {
	const { id_prowadzacy, data, studenci } = req.body;

	db.query(
		'INSERT INTO projekt.ankieta(id_prowadzacy, data_zamkniecia) VALUES ($1, $2) RETURNING ankieta.id_ankieta',
		[id_prowadzacy, data]
	)
		.then((result) => {
            console.log('INSERT 1 - ok');
			const { id_ankieta } = result.rows[0];            
			
			const insertQuestions = `INSERT INTO projekt.ankieta_pytanie VALUES (1, ${id_ankieta}), (2, ${id_ankieta}), (3, ${id_ankieta}), (4, ${id_ankieta})`;
			const query = 'INSERT INTO projekt.student_ankieta VALUES ' + functions.ankietaMultirowInsert(studenci, id_ankieta) + ';';
			console.log(functions.ankietaMultirowInsert(studenci, id_ankieta));
			db.query(
				query,
				studenci
			)
				.then(() => {
					console.log('INSERT 2 - ok');
					db.query(insertQuestions)
						.then(() => {
							console.log('INSERT 3 - ok');
							res.status(201).json({
								status: 'ok',
							});
						})
				})
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: 'error',
				error: err.message,
			});
		});
});

module.exports = router;