const router = require('express').Router();
const db = require('./polaczenie');

////dodawanie odpowiedzi - insert tresci do odpowiedzi dla konkretnego id
router.post('/:id_ankieta', (req, res) => {
	const { id_pytanie, tresc, id_student } = req.body;
	const { id_ankieta } = req.params;

	db.query('insert into projekt.odpowiedz values($3,$1,$4,$2)', [
		id_pytanie,
		tresc,
		id_ankieta,
		id_student,
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

module.exports = router;
