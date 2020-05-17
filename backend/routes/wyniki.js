const router = require('express').Router();
const db = require('./polaczenie');

/////select dla wynikow( wszystkie ankiety)
router.get('/', (req, res) => {
	db.query('select * from projekt.wypelnione_ankiety')
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

//select dla odpowiedzi( wszystkie  pytania odpowiedzi dla konkretengo id_ankiety i id_studenta )
router.get('/odpowiedzi/:id_ankieta', (req, res) => {
	const { id_ankieta } = req.params;

	db.query('select * from projekt.odpowiedzi_do_ankiety where id_ankieta=$1', [id_ankieta])
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
