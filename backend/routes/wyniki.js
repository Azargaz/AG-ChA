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

	db.query('select id_ankieta, id_pytanie, tresc_odp, count from projekt.odpowiedzi_do_ankiety where id_ankieta=$1', [id_ankieta])
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

const convertAnswersToPoints = (answer) => {
	switch(answer) {
		case 'Nie':
			return 0
		case 'Raczej nie':
			return 1
		case 'Nie mam zdania':
			return 2
		case 'Raczej tak':
			return 3
		case 'Tak':
			return 4
	}
}

router.get('/ranking', (req, res) => {
	db.query('select * from projekt.odpowiedzi_do_ankiety')
		.then((result) => {
			const ranking = {};
			result.rows.forEach(row => {
				if (ranking[row.imie_nazwisko]) {
					ranking[row.imie_nazwisko] = {
						count: Number(ranking[row.imie_nazwisko].count) + Number(row.count),
						points: Number(ranking[row.imie_nazwisko].points) + Number(row.count) * convertAnswersToPoints(row.tresc_odp)
					}
				}
				else {
					ranking[row.imie_nazwisko] = {
						count: Number(row.count),
						points: row.count * convertAnswersToPoints(row.tresc_odp)
					}
				}
			})
			res.status(201).json(ranking);
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
