const router = require('express').Router();
const db = require('./polaczenie');

const jwt = require('jsonwebtoken')

//// logowanie pracownika
router.post('/pracowniklogin', (req, res) => {
	const { login } = req.body;
	const { haslo } = req.body;

	db.query(
		'select id_pracownik from projekt.pracownik p where p.login = $1 and p.haslo = $2 ',
		[login, haslo]
	)
		.then((result) => {
			if (result.rows.length > 0) {
				result = result.rows[0];
				const token = jwt.sign({id_pracownik: result.id_pracownik, pracownik: true}, process.env.PRIVATE_KEY)
				res.status(201).json(token);
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
router.post('/studentlogin', (req, res) => {
	const { indeks } = req.body;
	const { pesel } = req.body;

	db.query(
		'select id_student from projekt.student s where s.nr_indeksu = $1 and s.pesel = $2 ',
		[indeks, pesel]
	)
		.then((result) => {
			if (result.rows.length > 0) {
				result = result.rows[0];
				const token = jwt.sign({id_student: result.id_student, student: true}, process.env.PRIVATE_KEY)
				res.status(201).json(token);
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
