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

	db.query('select id_ankieta, id_pytanie, tresc_pyt, tresc_odp, count from projekt.odpowiedzi_do_ankiety where id_ankieta=$1', [id_ankieta])
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
		default:
			return 0
	}
}

router.get('/ranking/:id_wydzial', (req, res) => {
	const { id_wydzial } = req.params;
	db.query('select * from projekt.odpowiedzi_do_ankiety where id_wydzial = $1', [id_wydzial])
		.then((result) => {
			const ranking = {};
			// Zamiana tabeli z widoku na listę prowadzących i ich wyników
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

			// Konwersja wyników na ocenę w skali procentowej (0 - 100%)
			Object.keys(ranking).forEach(key => {
				ranking[key] = (100 * ranking[key].points / ranking[key].count / 4).toFixed(2);;
				console.log(key);
			})
			
			// Posortowanie prowadzących według ich wyników
			const sorted_ranking = Object.keys(ranking).sort((a, b) => { return ranking[b] - ranking[a] });
			const final_ranking = {};
			sorted_ranking.forEach(key => {
				final_ranking[key] = ranking[key];
			});
			res.status(201).json(final_ranking);
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
