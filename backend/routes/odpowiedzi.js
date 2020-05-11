const router = require('express').Router();
const db = require('./polaczenie');

////dodawanie odpowiedzi - insert tresci do odpowiedzi dla konkretnego id
router.post('/:id_ankieta', (req, res) => {
	const { id_pytanie, tresc, id_student } = req.body;
	const { id_ankieta } = req.params;

	db.query('insert into projekt.odpowiedz values($1,$2,$3,$4)', [
		id_ankieta,
		id_pytanie,
		id_student,
		tresc
	])
		.then((result) => {
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
});

// zaznacz ankiete jako wypelnioną
router.post('/wypelniona/:id_ankieta', (req, res) => {
	const { id_student } = req.body;
	const { id_ankieta } = req.params;

	db.query('UPDATE projekt.student_ankieta SET wypelniona=true WHERE id_ankieta=$1 AND id_student=$2;', [
		id_ankieta,
		id_student
	])
		.then((result) => {
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
});

// pobranie pytań ankiety
router.get('/ankieta/:id_ankieta', (req, res) => {
	const { id_ankieta } = req.params;

	db.query('SELECT * FROM projekt.pytanie p JOIN projekt.ankieta_pytanie ap ON p.id_pytanie=ap.id_pytanie WHERE ap.id_ankieta=$1', [id_ankieta])
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

module.exports = router;
