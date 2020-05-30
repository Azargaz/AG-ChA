const router = require('express').Router();
const db = require('./polaczenie');
const nodemailer = require("nodemailer");

async function sendMail(emails){
	newmail = emails.map((email) => `${email['mail']}`);
	console.log(newmail);
	let testAccount = await nodemailer.createTestAccount();
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
		  user: testAccount.user, // generated ethereal user
		  pass: testAccount.pass, // generated ethereal password
		},
	  });

	let info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: newmail, // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	  });

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

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
	console.log(studenci);
	db.query(
		'INSERT INTO projekt.ankieta(id_prowadzacy, data_zamkniecia) VALUES ($1, $2) RETURNING ankieta.id_ankieta',
		[id_prowadzacy, data]
	)
		.then((result) => {
            console.log('INSERT 1 - ok');
			const { id_ankieta } = result.rows[0];            
			
			const insertQuestions = `INSERT INTO projekt.ankieta_pytanie VALUES (1, ${id_ankieta}), (2, ${id_ankieta}), (3, ${id_ankieta}), (4, ${id_ankieta})`;
			const query = 'INSERT INTO projekt.student_ankieta VALUES ' + ankietaMultirowInsert(studenci, id_ankieta) + ';';
			db.query(
				query,
				studenci
			)
				.then(() => {
					console.log('INSERT 2 - ok');
					db.query(insertQuestions)
						.then(() => {
							console.log('INSERT 3 - ok');
							db.query('select s.mail from projekt.student s where s.id_student IN (' + studentMultirowSelect(studenci) + ');'
							)
								.then((mails) => {
									console.log(mails.rows);
									sendMail(mails.rows);
									res.status(201).json({
										status: 'ok',
									})
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

const ankietaMultirowInsert = (rows, id_ankieta) => {
	rows = rows.map((row, index) => `(${id_ankieta}, $${index+1}, false)`);
	return rows.join();
};

const studentMultirowSelect = (studenci) => {
	ids = studenci.map((id) => `${id}`);
	console.log("ids = " + ids);

	return ids;
};

module.exports = router;