const router = require('express').Router();
const db = require('./polaczenie');

//// logowanie pracownika
router.get('/pracowniklogin', (req, res) => {
	const { login } = req.body;
	const { haslo } = req.body;

	db.query(
		'select id_pracownik from projekt.pracownik p where p.login = $1 and p.haslo = $2 ',
		[login, haslo]
	)
		.then((result) => {
			if (result.rows.length > 0) {
				res.status(201).json(result.rows[0]);
			} else {
				res.status(500).json({
					status: 'error',
					error: 'Nieprawidłowe dane logowania.',
				});
			}
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({
				status: 'error',
				error: err.message,
			});
		});
});

//// logowanie studenta
router.get('/studentlogin', (req, res) => {
	const { indeks } = req.body;
	const { pesel } = req.body;

	db.query(
		'select id_student from projekt.student s where s.nr_indeksu = $1 and s.pesel = $2 ',
		[indeks, pesel]
	)
		.then((result) => {
			if (result.rows.length > 0) {
				res.status(201).json(result.rows[0]);
			} else {
				res.status(500).json({
					status: 'error',
					error: 'Nieprawidłowe dane logowania.',
				});
			}
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
