const router = require('express').Router();
const db = require('./polaczenie');

/////select ankiety do wypelnienia
router.get('/dowypelnienia/:id_student', (req, res) => {
	const { id_student } = req.params;
	
	db.query(
		'SELECT sa.id_ankieta,pr.nazwa,p.tytul,p.imie_nazwisko FROM projekt.ankieta a JOIN projekt.student_ankieta sa on sa.id_ankieta = a.id_ankieta JOIN projekt.prowadzacy p on a.id_prowadzacy = p.id_prowadzacy JOIN projekt.przedmiot pr on pr.id_przedmiot = p.id_przedmiot where sa.id_student = $1 and a.data_zamkniecia > NOW() order by pr.nazwa',
		[id_student]
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

///// select ankiety wypelnione
router.get('/wypelnione', (req, res) => {
	const { id_student } = req.body;

	db.query(
		'SELECT sa.id_ankieta,pr.nazwa,p.tytul,p.imie_nazwisko FROM projekt.ankieta a JOIN projekt.student_ankieta sa on sa.id_ankieta = a.id_ankieta JOIN projekt.prowadzacy p on a.id_prowadzacy = p.id_prowadzacy  JOIN projekt.przedmiot  pr on pr.id_przedmiot = p.id_przedmiot where sa.id_student = $1 and a.data_zamkniecia < NOW() order by pr.nazwa',
		[id_student]
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

//////////

module.exports = router;
